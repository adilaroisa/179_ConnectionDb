const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari body request
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Kipasanginmuter9!',
    database: 'mahasiswa'
});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to MySql:' + err.stack);
        return;
    }
    console.log('Connected Success');
});




