import Database from 'better-sqlite3';

const db = new Database('/app/database/users.db');

db.exec(`
	PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	login TEXT UNIQUE,
	password TEXT,
	mail TEXT UNIQUE,
	profile_picture TEXT);

	CREATE TABLE IF NOT EXISTS friendships (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_a_id INTEGER NOT NULL,
	user_b_id INTEGER NOT NULL,
	CHECK (user_a_id < user_b_id),
	UNIQUE (user_a_id, user_b_id),
	FOREIGN KEY (user_a_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (user_b_id) REFERENCES users(id) ON DELETE CASCADE
	);

CREATE INDEX IF NOT EXISTS idx_friendships_user_a ON friendships(user_a_id);
CREATE INDEX IF NOT EXISTS idx_friendships_user_b ON friendships(user_b_id);

	CREATE TABLE IF NOT EXISTS friend_requests (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	from_user_id INTEGER NOT NULL,
	to_user_id INTEGER NOT NULL,
	status TEXT NOT NULL DEFAULT 'pending',
	updated_at TEXT,
	UNIQUE (from_user_id, to_user_id),
	FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (to_user_id)   REFERENCES users(id) ON DELETE CASCADE
	);

CREATE INDEX IF NOT EXISTS idx_requests_from ON friend_requests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_requests_to   ON friend_requests(to_user_id);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL, -- UUID or random string, also embedded in JWT
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valid_until TEXT NOT NULL,
  user_agent TEXT, -- optional: store browser info
  ip_address TEXT, -- optional: store IP for security
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

`);

export default db;
