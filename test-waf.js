async function runWafTest() {
  const attacks = [
    {
      type: 'Traffic hop le',
      payload: '/rest/admin/application-version'
    },
    {
      type: 'SQL Injection',
      payload: "/rest/products/search?q=' OR 1=1--"
    },
    {
      type: 'XSS (Cross-Site Scripting)',
      payload: '/rest/products/search?q=<script>alert(1)</script>'
    },
    {
      type: 'Path Traversal (LFI)',
      payload: '/?file=../../../../etc/passwd'
    },
    {
      type: 'Command Injection (RCE)',
      payload: '/?cmd=cat+/etc/passwd;id'
    }
  ];

  console.log('Web truc tiep (port 3000) vs Nguoi gac cong WAF (port 8080)\n');

  for (const a of attacks) {
    try {
      const urlDirect = 'http://localhost:3000' + encodeURI(a.payload);
      const urlWaf = 'http://localhost:8080' + encodeURI(a.payload);

      const resDirect = await fetch(urlDirect);
      const resWaf = await fetch(urlWaf);

      console.log(`[+] ${a.type}`);
      console.log(`    Payload  : ${a.payload}`);
      console.log(`    Truc tiep: HTTP ${resDirect.status} | Qua WAF: HTTP ${resWaf.status}\n`);
    } catch (err) {
      console.error(`Loi khi test ${a.type}:`, err.message);
    }
  }
}

runWafTest();
