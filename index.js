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

app.get('/api/user', (req, res) => {
    const sql = 'SELECT * FROM biodata'; 

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }
        res.json(results);
    });
});

app.post('/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;
    const sqlQuery = "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)";

    db.query(sqlQuery, [nama, alamat, agama], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Gagal menambahkan data",
                error: err
            });
        } else {
            res.status(201).json({
                message: "Data mahasiswa berhasil ditambahkan",
                insertedId: result.insertId
            });
        }
    });
});


