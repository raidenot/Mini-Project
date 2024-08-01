const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: ''
});

connection.connect((err) => {
if (err) {
console.error('Error connecting to MySQL:', err);
return;
}

console.log('Connected to MySQL database');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))