const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Username not found" });
    } else {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      } else {
        var payload = {
          user: {
            name: user.username,
          },
        };
        jwt.sign(payload, "jwtsecret", { expiresIn: "10h" }, (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token, payload });
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [ existingUser ] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
};

exports.farmerRegister = async (req, res) => {
  const { farmer_name, farmer_id, affiliation, telephone  } = req.body;
  console.log(farmer_name, farmer_id, affiliation, telephone)
  const [ existingFarmer ] = await pool.query('SELECT * FROM folder_farmer WHERE farmer_id = ?', [farmer_id])
  if(existingFarmer.length > 0) {
    return res.status(200).json({ message: 'Farmer already exists' });
  }
  try {
    const [result] = await pool.query("INSERT INTO folder_farmer(farmer_name, farmer_id) VALUES (?,?)", [farmer_name, farmer_id])
    res.status(201).json({
        message: 'Farmer registered successfully',
        userId: result.insertId
    });
  } catch(err) {
    res.status(500).send(err)
  }
}