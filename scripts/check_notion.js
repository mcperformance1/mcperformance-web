require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;

async function check() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 1
    });
    fs.writeFileSync('scripts/out.json', JSON.stringify(response.results[0]?.properties, null, 2), 'utf8');
    console.log("Done");
  } catch (error) {
    fs.writeFileSync('scripts/err.txt', error.toString(), 'utf8');
  }
}

check();
