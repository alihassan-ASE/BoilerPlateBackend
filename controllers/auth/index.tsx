const { loginUser, send_OTP, verify_OTP } = require('../../services/authServices/index.tsx');

exports.login = async (req, res) => {
    try {
        if (req.body) {
            const response = await loginUser(req.body);
            if(response){
                res.status(200).send(response);  
            }
            // else {
            //     res.status(204).send({message: "No Content return in Response"});  
            // }
        } else {
            throw new Error('Invalid request body');
        }
    } catch (error) {
        res.status(500).send({ error: error.message });  
    }
};

exports.send_opt = async (req, res) => {
    try {
        if (req.body) {
            const response = await send_OTP(req.body);
            if(response){
                res.status(200).send(response);  
            }
            // else {
            //     res.status(204).send({message: "No Content return in Response"});  
            // }
        } else {
            throw new Error('Invalid request body');
        }
    } catch (error) {
        res.status(500).send({ error: error.message }); 
    }
}
exports.verify_otp = async (req, res) => {
    try {
        if (req.body) {
            const response = await verify_OTP(req.body);
            if(response){
                res.status(200).send(response);  
            }
            // else {
            //     res.status(204).send({message: "No Content return in Response"});  
            // }
        } else {
            throw new Error('Invalid request body');
        }
    } catch (error) {
        res.status(500).send({ error: error.message }); 
    }
}

