const fs = require('fs');
const data = fs.readFileSync("C:\\Users\\FM\\.gemini\\antigravity\\conversations\\84380b0f-60a0-48f5-a9f1-bd3f4f0ae8d6.pb");
let strings = "";
for (let i = 0; i < data.length; i++) {
  const c = String.fromCharCode(data[i]);
  if (c >= ' ' && c <= '~') strings += c;
  else strings += '\n';
}
fs.writeFileSync("pb_strings.txt", strings.split('\n').filter(s => s.length > 10).join('\n'));
