const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        // รับ token จาก headers
        const token = req.headers["auth-token"];
        if (!token) {
            return res.status(401).send('No auth-token');  // ถ้าไม่มี token ส่ง error
        }

        // ตรวจสอบ token
        const decoded = jwt.verify(token, 'jwtsecret');
        console.log(decoded);  // อาจจะแสดงข้อมูลจาก token ที่ถูกตรวจสอบ

        // สามารถเพิ่มข้อมูลที่ได้จาก token ลงใน req เพื่อใช้ใน route ต่อไป
        req.user = decoded;

        // เรียก next() เพื่อให้ request ไปยัง middleware หรือ route handler ถัดไป
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");  // ถ้าเกิดข้อผิดพลาดให้ส่ง error 500
    }
};
