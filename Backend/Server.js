require('dotenv').config();
const express = require('express');  //npm install express
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken
const bcrypt = require('bcrypt'); //npm install bcrypt
const cors = require('cors'); //npm install cors

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const SECRET_KEY = "mysecretkey";
////////bcrypt /////////////
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

let users = [];

const initializeUsers = async () => {
    const hashedPassword = await hashPassword("123456");
    users = [{ id: 1, username: "alaa", password: hashedPassword }];
};

initializeUsers();
///////////////End bcrypt///////////////

app.get("/user", (req, res) => {
    res.json(users);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Received login request with username: ${username} and password: ${password}`);

    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("Username not found");
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        console.log("Password does not match");
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });  // JSON WEB TOKEN
    res.json({ token });
    console.log(token);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
