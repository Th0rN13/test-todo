import fs from 'fs';

const dbFile = process.cwd() + '\\src\\db\\data.json';

function loadJSON () {
  try {
    const fileData = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      console.log('Error in data file');
    } else {
      console.log('Other error:', JSON.stringify(err, null, 2));
    }
    return [];
  }
}

export const data = loadJSON();