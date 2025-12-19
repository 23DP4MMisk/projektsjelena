const db = require('./db');

// 1. Pārbaudām tabulas
db.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('Kļūda izpildot vaicājumu:', err);
        db.end();
        return;
    }
    
    console.log('\n=== DATUBĀZES TABULAS ===');
    console.log(results);
    
    // 2. Pārbaudām datus tabulā 'users'
    db.query('SELECT * FROM users', (err, users) => {
        if (err) {
            console.error('Kļūda izvēloties lietotājus:', err);
        } else {
            console.log('\n=== LIETOTĀJI ===');
            console.log(users);
        }
        
        // 3. Pārbaudām datus tabulā 'gramata'
        db.query('SELECT * FROM gramata', (err, gramatas) => {
            if (err) {
                console.error('Kļūda izvēloties grāmatas:', err);
            } else {
                console.log('\n=== GRĀMATAS ===');
                console.log(gramatas);
            }
            
            // Aizveram savienojumu
            db.end();
            console.log('\nSavienojums ar datubāzi aizvērts');
        });
    });
});
