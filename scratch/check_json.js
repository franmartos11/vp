const fs = require('fs');
try {
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  console.log('en.json is valid');
  console.log('Keys in en.json:', Object.keys(en));
  console.log('MakersStory keys:', Object.keys(en.MakersStory));
  console.log('AllServicesGrid keys:', Object.keys(en.AllServicesGrid));
} catch (e) {
  console.error('Error parsing en.json:', e);
}

try {
  const es = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
  console.log('es.json is valid');
} catch (e) {
  console.error('Error parsing es.json:', e);
}
