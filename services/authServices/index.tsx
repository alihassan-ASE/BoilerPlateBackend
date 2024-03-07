const client = require('../../dbConnection/index.tsx');
const JWT_TOKEN = require('../../utils/token/index.tsx');
const accountSid = "AC35901272e1827373e27927885c1a4e28";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA115c5b3a8aef9f1705d358deb94d04eb";
const twilio = require("twilio")(accountSid, authToken);

exports.send_OTP = async (userData) => {
    try {
        if (userData && client.database === 'reactnative') {
            // Send OTP via SMS
            const verification = await twilio.verify.services(verifySid)
                .verifications.create({ to: userData.phone, channel: "sms" });

            console.log("In SEND OTP => ",verification.status);
            return { success: true, message: `OTP Sent to ${userData.phone}`, status: verification.status }
        }
    } catch (error) {
        return { success: false, message: 'Failed to Sent OTP', error: error.message };
    }
}

exports.verify_OTP = async (data) => {
    try {
        if (data.otp && client.database === 'reactnative') {
            const verificationCheck = await twilio.verify.services(verifySid)
                .verificationChecks.create({ to: data.phone, code: data.otp });

            console.log("In Verify OTP => ", verificationCheck.status);
            if (verificationCheck.status === 'approved') {
                return { success: true, message: `Verification Success`, status: verificationCheck.status }
            }
            else {
                return { success: false, message: `Invalid or Wrong OTP`, status: verificationCheck.status }

            }
        }
    } catch (error) {
        return { success: false, message: 'Verification Failed', error: error.message };
    }
}

exports.loginUser = async (userData) => {
    try {
        if (userData && client.database === 'reactnative') {
            console.log('In RegisterUser => ', userData);

            const data = await client.query(
                'SELECT * FROM users WHERE email = $1 OR phone = $2',
                [userData.email, userData.phone]
            );

            if (data.rows.length > 0) {
                console.log('User Already Exist => ', data.rows[0]);
                const usersData = data.rows[0].email || data.rows[0].phone;
                const token = await JWT_TOKEN(usersData);
                return { success: true, message: 'Login Success', token: token };
            } else {
                // Insert data into the 'users' table
                const insertRes = await client.query(
                    'INSERT INTO users (email, phone) VALUES ($1, $2)',
                    [userData.email, userData.phone]
                );

                console.log('User data inserted successfully', insertRes);
                const usersData = data.rows[0].email || data.rows[0].phone;
                const token = await JWT_TOKEN(usersData);
                return { success: true, message: 'User registered and logged in successfully', token: token };
            }

        }
    } catch (error) {
        return { success: false, message: 'Login failed', error: error.message };
    }
};

// // Create table if not exists
// const createTable = await client.query(`
//     CREATE TABLE IF NOT EXISTS users (
//         email VARCHAR(255),
//         phone VARCHAR(255)
//     );
// `);
// console.log('Table created or already exists', createTable);
// return { success: true, message: 'Table created Successfully' };