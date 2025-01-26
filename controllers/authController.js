const connection = require('../models/database');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        console.log(req.body)
        const { username, password } = req.body
        const [ existingUser ] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            // If a user with the same username exists, return an error
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error during registration' });
    }
};

exports.login = async (req, res) => {
    try{
        console.log(req.body)
        const { username, password } = req.body
        // Check if the username exists in the database
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            // If no user is found with the provided username
            return res.status(404).json({ message: 'User not found' });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // If passwords do not match
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        var payload = {
            user : {
                name : user.username
            }
        }
        jwt.sign(payload, 'jwtsecret', { expiresIn: 100 }, (err, token) => {
            if (err) throw err;
            res.json({token, payload})
        });
        // res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during login' });
    }
};