const mysql = require('mysql2');

const config = {
    host: 'localhost',
    port: 3306,
    database: 'backend',
    user: 'root',
    password: '020727'
}
    const connection = mysql.createConnection(config);

    module.exports = connection;
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
