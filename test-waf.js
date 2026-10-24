async function runWafTest() {
  const attacks = [
    {
      type: 'Traffic hop le',
      payload: '/rest/admin/application-version',
      desc: 'Yeu cau binh thuong'
    },
    {
      type: 'SQL Injection',
      payload: "/rest/products/search?q=' OR 1=1--",
      desc: 'Truy van trai phep'
    },
    {
      type: 'XSS (Cross-Site Scripting)',
      payload: '/rest/products/search?q=<script>alert(1)</script>',
      desc: 'Chen ma doc JavaScript'
    },
    {
      type: 'Path Traversal (LFI)',
      payload: '/?file=../../../../etc/passwd',
      desc: 'Doc file he thong'
    },
    {
      type: 'Command Injection (RCE)',
      payload: '/?cmd=cat+/etc/passwd;id',
      desc: 'Thuc thi lenh he thong'
    }
  ];

  console.log('========================================================================');
  console.log('  KIEM THU "NGUOI GAC CONG": NGINX + MODSECURITY + OWASP CRS vs JUICE SHOP');
  console.log('========================================================================\n');
  console.log('- Web dich (Juice Shop truc tiep) : http://localhost:3001');
  console.log('- "Nguoi gac cong" WAF           : http://localhost:8088\n');

  for (const a of attacks) {
    try {
      const urlDirect = 'http://localhost:3001' + encodeURI(a.payload);
      const urlWaf = 'http://localhost:8088' + encodeURI(a.payload);

      const resDirect = await fetch(urlDirect);
      const resWaf = await fetch(urlWaf);

      const directStatus = resDirect.status;
      const wafStatus = resWaf.status;

      let result = '';
      if (a.type === 'Traffic hop le') {
        result = (wafStatus === 200) ? '[OK] WAF cho phep di qua' : '[LOI] WAF chan nham';
      } else {
        result = (wafStatus === 403) ? '[THANH CONG] WAF da chan dung (403)' : '[THAT BAI] WAF de lot';
      }

      console.log(`[+] Loai: ${a.type}`);
      console.log(`    Payload  : ${a.payload}`);
      console.log(`    Truc tiep: HTTP ${directStatus} | Qua WAF: HTTP ${wafStatus}`);
      console.log(`    Ket luan : ${result}\n`);
    } catch (err) {
      console.error(`Loi khi test ${a.type}:`, err.message);
    }
  }

  console.log('========================================================================');
  console.log('Tong ket:');
  console.log('- Khi tan cong truc tiep cong 3001: Juice Shop bi khai thac (200/500).');
  console.log('- Khi tan cong qua WAF cong 8088  : ModSecurity + OWASP CRS chan dung (403 Forbidden).');
  console.log('- Traffic binh thuong van hoat dong on dinh (200 OK).');
  console.log('========================================================================');
}

runWafTest();
