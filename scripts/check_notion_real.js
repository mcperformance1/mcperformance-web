require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

function getPropString(prop) {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map(t => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map(t => t.plain_text).join("") || "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "multi_select") return prop.multi_select?.map(s => s.name).join(", ") || "";
  return "";
}

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
    const types = data.results.map(r => {
        return getPropString(r.properties['Tür']) || getPropString(r.properties['Type']) || "";
    });
    
    const uniqueTypes = [...new Set(types)];
    fs.writeFileSync('scripts/notion_output.json', JSON.stringify({ uniqueTypes, total: data.results.length }, null, 2), "utf8");
    console.log("Unique types:", uniqueTypes);
  } catch(e) {
      fs.writeFileSync('scripts/notion_output.json', JSON.stringify({error: e.toString()}));
  }
}
check();
