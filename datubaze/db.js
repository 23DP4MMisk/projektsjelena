const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3307,
    database: 'online_biblioteka'
});

connection.connect((eer) =>{
    if (eer){
        console.error('Pieslegšanas kļūda:', err);
    } else{
        console.log('Veiksmīga pieslēgšanās MySQL');
    }
    
});

module.exports = connection;