require('dotenv').config();
const mongoose = require('mongoose');
const Information = require('./models/Information');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  try {
    await Information.collection.dropIndex('diaChiThuongTru.phuongXa_1');
  } catch (e) {}

  // 1. Baseline
  const t1 = Date.now();
  const allDocs = await Information.find().lean();
  const results = [];
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].diaChiThuongTru.phuongXa === 'Cầu Giấy') {
      results.push(allDocs[i]);
    }
  }
  const timeBaseline = Date.now() - t1;

  // 2. Query khong index
  const t2 = Date.now();
  await Information.find({ 'diaChiThuongTru.phuongXa': 'Cầu Giấy' }).lean();
  const timeNoIndex = Date.now() - t2;

  // 3. Tao index va query co index
  await Information.collection.createIndex({ 'diaChiThuongTru.phuongXa': 1 });
  const t3 = Date.now();
  await Information.find({ 'diaChiThuongTru.phuongXa': 'Cầu Giấy' }).lean();
  const timeWithIndex = Date.now() - t3;

  console.log(`Baseline (vong lap for) : ${timeBaseline} ms`);
  console.log(`Query khong co index    : ${timeNoIndex} ms`);
  console.log(`Query co index          : ${timeWithIndex} ms`);

  process.exit(0);
}

run();
