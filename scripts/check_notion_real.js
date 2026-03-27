require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function check() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const token = process.env.NOTION_SECRET;
  
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
    });
    
    if (!res.ok) {
        fs.writeFileSync('scripts/notion_output.json', JSON.stringify({error: await res.text()}));
        return;
    }
    const data = await res.json();
    fs.writeFileSync('scripts/notion_output.json', JSON.stringify(data.results[0] ? data.results[0].properties : {empty: true}, null, 2), "utf8");
  } catch(e) {
      fs.writeFileSync('scripts/notion_output.json', JSON.stringify({error: e.toString()}));
  }
}
check();
