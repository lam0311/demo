require('dotenv').config();
const mongoose = require('mongoose');
const Information = require('./models/Information');

const ho = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ'];
const dem = ['Văn', 'Thị', 'Đức', 'Minh', 'Ngọc', 'Quang', 'Hồng', 'Thanh', 'Tuấn'];
const ten = ['An', 'Bình', 'Cường', 'Dũng', 'Hải', 'Nam', 'Linh', 'Phong', 'Quân', 'Sơn', 'Tùng'];

const phuong = [
  'Cầu Giấy', 'Dịch Vọng', 'Dịch Vọng Hậu', 'Quan Hoa', 'Nghĩa Đô', 'Nghĩa Tân',
  'Mai Dịch', 'Yên Hòa', 'Trung Hòa', 'Hàng Bông', 'Tràng Tiền', 'Bến Nghé',
  'Bến Thành', 'Hải Châu', 'Hòa Cường', 'Lê Mao', 'Vĩnh Ninh', 'Thạch Thang',
  'Phước Mỹ', 'An Hải Bắc'
];
const tinh = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Huế'];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Information.deleteMany({});

  const data = [];
  for (let i = 1; i <= 10000; i++) {
    data.push({
      id: i,
      hoTen: `${random(ho)} ${random(dem)} ${random(ten)}`,
      diaChiThuongTru: {
        diaChiChiTiet: `Số ${i} ngõ ${Math.floor(Math.random() * 50) + 1}`,
        phuongXa: random(phuong),
        tinhThanhPho: random(tinh)
      }
    });
  }

  await Information.insertMany(data);
  process.exit(0);
}

seed();
