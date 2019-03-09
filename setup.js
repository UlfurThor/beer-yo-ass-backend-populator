/* eslint-disable no-console */
/* eslint-disable camelcase */
require('dotenv').config();

const fs = require('fs');
const util = require('util');

const { query } = require('./db');

const readFileAsync = util.promisify(fs.readFile);

async function main() {
  const file = await readFileAsync('./data.json');

  const json = JSON.parse(file);
  console.log(json);

  const q = 'INSERT into beers (beer_id, beer_alcohol, beer_link, beer_name, beer_price, beer_taste, beer_volume) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  for (let j = 0; j < json.length; j += 1) {
    const beer_id = json[j].product_number;
    const beer_alcohol = json[j].alcohol;
    const beer_link = json[j].link_to_vinbudin;
    const beer_name = json[j].title;
    const beer_price = json[j].price;
    const beer_taste = json[j].taste;
    const beer_volume = json[j].volume;
    // console.log([beer_id, beer_alcohol, beer_link,
    // beer_name, beer_price, beer_taste, beer_volume]);
    // eslint-disable-next-line no-await-in-loop
    await query(q, [
      beer_id,
      beer_alcohol,
      beer_link,
      beer_name,
      beer_price,
      beer_taste,
      beer_volume,
    ]);
  }

  /*
  console.info(`${dbPre}Create db at ${connectionString}`);
  await query('DROP TABLE IF EXISTS todos');
  console.info(`${dbPre}Table dropped`);

  try {
    const createTable = await readFileAsync('./schema.sql');
    await query(createTable.toString('utf8'));
    console.info(`${dbPre}Table created`);
  } catch (e) {
    console.error(`${dbPre} --- ERROR CREATING TABLE:`, e.message);
    return;
  }

  try {
    const insert = await readFileAsync('./insert.sql');
    await query(insert.toString('utf8'));
    console.info(`${dbPre}Data added`);
  } catch (e) {
    console.error(`${dbPre} --- ERROR ADDING DATA:`, e.message);
  }
  */
}

main().catch((err) => {
  console.error(err);
});
