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

## Phần 2: "Người Gác Cổng" WAF (Nginx + ModSecurity + OWASP CRS vs OWASP Juice Shop)

1. Khởi động WAF và Juice Shop bằng Docker:
```bash
npm run waf:up
```
- Web mục tiêu (Juice Shop trực tiếp): `http://localhost:3001`
- "Người gác cổng" WAF (Nginx + ModSec + CRS): `http://localhost:8088`

2. Chạy thử nghiệm tấn công (SQLi, XSS, Path Traversal, RCE):
```bash
npm run waf:test
```
(hoặc `node test-waf.js`)

3. Dừng hệ thống WAF:
```bash
npm run waf:down
```
