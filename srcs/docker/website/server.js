const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/website', express.static('public'));
app.use('/dist', express.static('dist'));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
