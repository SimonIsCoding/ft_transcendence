const express = require('express');
const app = express();
const PORT = 3000;
const pong_database = require('./db.js');

app.use(express.static('public'));

app.use('/website', express.static('public'));
app.use('/dist', express.static('dist'));

app.get('/players', (req, res) => {
	res.json(player);
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
