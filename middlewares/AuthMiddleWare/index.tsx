exports.validateLoginData = (req, res, next) => {
    const { email, phone } = req.body;

    console.log('Body from frontend', req.body)

    // Check if email is present and in the correct format
    if (email !== undefined) {
        if (typeof email === 'string' && /\S+@\S+\.\S+/.test(email)) {
            req.validEmail = email;
            console.log('Checking Email in Middleware', req.validEmail);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
    }

    console.log(phone)
    // Check if phone is present and in the correct format
    if (phone !== undefined) {
        const isValidPhoneFormat = /^\+\d+$/.test(phone);
        if (typeof phone === 'string' && isValidPhoneFormat) {
            req.validPhone = phone;
            console.log('Checking Phone in Middleware', req.validPhone);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid phone format' });
        }
    }

    next();
};
