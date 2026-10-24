# Bai tap Thực Hành

## Phần 1: Đánh Giá Hiệu Năng Index (MongoDB)

1. Sinh 10.000 bản ghi:
```bash
npm run seed
```

2. Chạy so sánh tốc độ (Baseline vs Không Index vs Có Index):
```bash
npm start
```

---

## Phần 2: "Người Gác Cổng" WAF (Nginx + ModSecurity + OWASP CRS vs Juice Shop)

1. Khởi động WAF và Juice Shop bằng Docker:
```bash
docker compose up -d
```
- Web trực tiếp: `http://localhost:3000`
- WAF bảo vệ: `http://localhost:8080`

2. Chạy thử nghiệm tấn công:
```bash
node test-waf.js
```

3. Dừng hệ thống:
```bash
docker compose down
```
