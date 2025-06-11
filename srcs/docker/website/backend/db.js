const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('pong.db', (err) => {
	if (err)
		return console.err(err.message);
	console.log('Correctly connected to the pong SQLite database.');
});

db.run(
	`CREATE TABLE IF NOT EXISTS players (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL
		alias TEXT NOT NULL
		// nb_game INTEGER
	)
`);

