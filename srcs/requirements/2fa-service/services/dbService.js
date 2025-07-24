const Database = require('better-sqlite3');

// Initialize database
const db = new Database('./2fa-tokens.db');

// Create tokens table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS tokens (
    email TEXT PRIMARY KEY,
    token TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`).run();

// Create index for faster lookups
db.prepare(`
  CREATE INDEX IF NOT EXISTS idx_tokens_expires_at ON tokens(expires_at)
`).run();

// Cleanup expired tokens function
function cleanupExpiredTokens() {
  const now = Math.floor(Date.now() / 1000);
  db.prepare('DELETE FROM tokens WHERE expires_at <= ?').run(now);
}

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 3600000);
cleanupExpiredTokens();

module.exports = db;