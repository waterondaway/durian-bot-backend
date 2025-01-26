const connection = require('../models/database');


exports.getUsers = async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM users');

    // await connection.query('SELECT * FROM users', (err, results) => {
    //   if (err) {
    //     res.status(500).send({ message: 'Error fetching data' });
    //   } else {
    //     res.status(200).json(results);
    //   }
    // });
    res.json(rows)
  };

// Example of inserting data into the users table
exports.createUser = (req, res) => {
    const { username, password } = req.body;  // Assuming data comes from the request body
  
    // Insert query
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Error inserting data', error: err });
      } else {
        res.status(201).send({ message: 'User created successfully', userId: results.insertId });
      }
    });
  };