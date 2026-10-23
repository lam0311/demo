const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  hoTen: { type: String, required: true },
  diaChiThuongTru: {
    diaChiChiTiet: String,
    phuongXa: String,
    tinhThanhPho: String
  }
}, { collection: 'information' });

module.exports = mongoose.model('Information', informationSchema);
