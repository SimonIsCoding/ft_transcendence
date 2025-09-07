import db from '../src/database.js';
import crypto from 'crypto';

// Generate a strong random session token (64 chars hex = 32 bytes)
export function createSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Hash a token with SHA-256 for DB storage
export function hashToken(token)
{
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Verify a session exists and update last_seen_at
export function verifyAndUpdateSession(userId, rawSessionToken) {
  const hashedToken = hashToken(rawSessionToken);

  // Look up session and ensure valid_until is in the future
  const session = db.prepare(`
    SELECT * FROM sessions
    WHERE user_id = ? AND session_token = ? AND valid_until > CURRENT_TIMESTAMP
  `).get(userId, hashedToken);

  if (!session) {
    throw new Error('Session not found or expired');
  }

  db.prepare(`
    UPDATE sessions SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(session.id);

  return session;
}

// Delete a specific session
export function deleteSession(userId, rawSessionToken) {
  const hashedToken = hashToken(rawSessionToken);

  const result = db.prepare(`
    DELETE FROM sessions
    WHERE user_id = ? AND session_token = ?
  `).run(userId, hashedToken);

  return result.changes > 0; // true if a row was deleted
}

// Delete all sessions for a user (force logout everywhere)
export function deleteAllSessions(userId) {
  const result = db.prepare(`
    DELETE FROM sessions WHERE user_id = ?
  `).run(userId);

  return result.changes; // number of sessions deleted
}

export function deleteExpiredSessions() {
  const result = db.prepare(`
    DELETE FROM sessions
    WHERE valid_until <= CURRENT_TIMESTAMP
  `).run();

  return result.changes; // number of deleted sessions
}