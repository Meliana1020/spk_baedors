const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // 1. Ambil token dari header 'Authorization'
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verifikasi token menggunakan JWT_SECRET kamu
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Simpan data user ke request agar bisa dipakai di route selanjutnya
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = protect;