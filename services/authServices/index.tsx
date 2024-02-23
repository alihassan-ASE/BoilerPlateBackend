const client = require('../../dbConnection/index.tsx');
const JWT_TOKEN = require('../../utils/token/index.tsx');

// exports.loginUser = (loginCredentials) => {
//     if (loginCredentials) {
//         console.log('Login Credentials =>', loginCredentials);
//         return true;
//     }
// };

exports.loginUser = async (userData) => {
    try {

        if (userData && client.database === 'reactnative') {
            console.log('In RegisterUser => ', userData);

            const data = await client.query(
                'SELECT * FROM users WHERE email = $1 OR phone = $2',
                [userData.email, userData.phone]
            );
            console.log('Data from DB => ', data.rows);

            if (data.rows.length > 0) {
                console.log('User Already Exist => ', data.rows[0]);
                const usersData = data.rows[0].email || data.rows[0].phone;
                const token = await JWT_TOKEN(usersData);
                return { success: false, message: 'User Already Exist', token: token };
            } else {
                // Insert data into the 'users' table
                const insertRes = await client.query(
                    'INSERT INTO users (email, phone) VALUES ($1, $2)',
                    [userData.email, userData.phone]
                );

                console.log('User data inserted successfully', insertRes);
                const usersData = data.rows[0].email || data.rows[0].phone;
                const token = await JWT_TOKEN(usersData);
                return { success: true, message: 'User registered successfully', token: token };
            }
        }
        // // Create table if not exists
        // const createTable = await client.query(`
        //     CREATE TABLE IF NOT EXISTS users (
        //         email VARCHAR(255),
        //         phone VARCHAR(255)
        //     );
        // `);
        // console.log('Table created or already exists', createTable);
        // return { success: true, message: 'Table created Successfully' };
    } catch (error) {
    console.error('Error in registration:', error.message);
    return { success: false, message: 'Registration failed', error: error.message };
}
};