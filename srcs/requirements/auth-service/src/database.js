import Database from 'better-sqlite3';

const db = new Database('/app/database/users.db');

db.exec(`
	PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	login TEXT UNIQUE,
	password TEXT,
	mail TEXT UNIQUE,
	profile_picture TEXT,
	provider TEXT DEFAULT 'local',
	is_2fa_activated BOOLEAN DEFAULT false,
	GDPR_activated BOOLEAN DEFAULT false
	);

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

CREATE TABLE IF NOT EXISTS matches (
    matchid INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    alias1 TEXT NOT NULL,
    alias2 TEXT NOT NULL,
    user_player INTEGER DEFAULT 0 CHECK(user_player IN (0, 1, 2)),
    has_ai INTEGER DEFAULT 0 CHECK(has_ai IN (0, 1)),
    ai_level INTEGER DEFAULT 1,
    paddle_size INTEGER DEFAULT 20,
    ball_speed INTEGER DEFAULT 5,
    score_limit INTEGER DEFAULT 5,
    score1 INTEGER DEFAULT 0,
    score2 INTEGER DEFAULT 0,
    is_finished INTEGER DEFAULT 0 CHECK(is_finished IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME,
    tournament_id INTEGER,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournamentid) ON DELETE SET NULL
);

CREATE INDEX idx_matches_userid ON matches(userid);
CREATE INDEX idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX idx_matches_is_finished ON matches(is_finished);
CREATE INDEX idx_matches_created_at ON matches(created_at);

CREATE TABLE IF NOT EXISTS tournaments (
    tournamentid INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL, -- Required for tournament creator
    player1_alias TEXT NOT NULL,
    player2_alias TEXT NOT NULL,
    player3_alias TEXT NOT NULL,
    player4_alias TEXT NOT NULL,
    user_player INTEGER CHECK(user_player IN (1, 2, 3, 4)) DEFAULT 1,
    paddle_size INTEGER DEFAULT 20,
    ball_speed INTEGER DEFAULT 5,
    score_limit INTEGER DEFAULT 5,
    semifinal1_matchid INTEGER,
    semifinal2_matchid INTEGER,
    final_matchid INTEGER,
    is_finished INTEGER DEFAULT 0 CHECK(is_finished IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME,
    FOREIGN KEY (semifinal1_matchid) REFERENCES matches(matchid) ON DELETE SET NULL,
    FOREIGN KEY (semifinal2_matchid) REFERENCES matches(matchid) ON DELETE SET NULL,
    FOREIGN KEY (final_matchid) REFERENCES matches(matchid) ON DELETE SET NULL
);
CREATE INDEX idx_tournaments_userid ON tournaments(userid);
CREATE INDEX idx_tournaments_is_finished ON tournaments(is_finished);
CREATE INDEX idx_tournaments_created_at ON tournaments(created_at);
CREATE INDEX idx_tournaments_sf1_matchid ON tournaments(semifinal1_matchid);
CREATE INDEX idx_tournaments_sf2_matchid ON tournaments(semifinal2_matchid);
CREATE INDEX idx_tournaments_final_matchid ON tournaments(final_matchid);
`);

export default db;
