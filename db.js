const mysql = require('mariadb');

const config = {
    host: 'localhost',
    port: 3306,
    database: 'backend',
    user: 'root',
    password: '020727',
    connectionLimit: 10
}
    const pool = mysql.createPool(config);

    module.exports = pool;
/*
    connection.connect((err) => {
        if (err) {
            console.log("Error connecting to MySQL database", err);
        }
        else{
            console.log("Connected to MySQL database successfully");
        }
    })
    connection.end();*/

    //npm install mysql2