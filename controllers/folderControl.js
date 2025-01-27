const pool = require("../models/db");
exports.getAllFolders = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM folder_farmer");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
};

exports.getImageFolderID = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM images_farmer WHERE farmer_id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving data' });
        }
        return res.status(200).json(result);
    });
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
};
