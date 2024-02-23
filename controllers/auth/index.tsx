const { loginUser } = require('../../services/authServices/index.tsx');

exports.login = async (req, res) => {
    try {
        if (req.body) {
            const response = await loginUser(req.body);
            if(response){
                console.log('Getting Response from loginUser', response);
                res.status(200).send(response);  
            }
            // else {
            //     res.status(204).send({message: "No Content return in Response"});  
            // }
        } else {
            throw new Error('Invalid request body');
        }
    } catch (error) {
        console.error('Error in Login Controller => ', error.message);
        res.status(500).send({ error: error.message });  
    }
};

// exports.registration = async (req, res) => {
//     try {
//         if (req.body) {
//             const response = await registerUser(req.body);
//             console.log('Getting Response from registerUser', response);
//             res.status(200).send(response); 
//         } else {
//             throw new Error('Invalid request body');
//         }
//     } catch (error) {
//         console.error('Error in Registration Controller => ', error.message);
//         res.status(500).send({ error: error.message });  
//     }
// };
