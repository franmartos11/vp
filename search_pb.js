const fs = require('fs');
const data = fs.readFileSync("C:\\Users\\FM\\.gemini\\antigravity\\conversations\\84380b0f-60a0-48f5-a9f1-bd3f4f0ae8d6.pb");
const text = data.toString('utf8');
const index = text.toLowerCase().indexOf('aponte');
if(index !== -1) {
  fs.writeFileSync('found_aponte.txt', text.substring(Math.max(0, index - 500), index + 1500));
} else {
  fs.writeFileSync('found_aponte.txt', 'Not found');
}
