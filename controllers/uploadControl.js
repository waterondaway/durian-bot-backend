const pool = require("../models/db");
exports.uploadSingleImage = async (req, res) => {
    try{
        const { farmer_id, latitude, longitude } = req.body;
        console.log(farmer_id, latitude, longitude);
        const [ result ] = await pool.query('INSERT INTO images_farmer(farmer_id, filename, latitude, longitude) VALUES (?, ?, ?, ?)', [farmer_id, req.file.filename, latitude, longitude])
        res.status(200).json({
            message: 'File uploaded successfully!',
            filename: req.file.filename,
            index: result.insertId
          });
    }catch (err){
        console.error(err);
        res.status(500).send(err);
    }
}