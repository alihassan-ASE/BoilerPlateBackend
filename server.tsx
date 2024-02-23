const express = require('express');
const client = require('./dbConnection/index.tsx');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3100;
dotenv.config();

const authRoutes = require('./routes/authRoutes/index.tsx');

app.use(express.json());
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
