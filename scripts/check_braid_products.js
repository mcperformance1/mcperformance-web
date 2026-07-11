require('dotenv').config({ path: '.env.local' });

function getPropString(prop) {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map(t => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map(t => t.plain_text).join("") || "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "multi_select") return prop.multi_select?.map(s => s.name).join(", ") || "";
  if (prop.type === "number") return prop.number?.toString() || "";
  if (prop.type === "url") return prop.url || "";
  if (prop.type === "files") {
    const file = prop.files?.[0];
    if (!file) return "";
    return file.file?.url || file.external?.url || "";
  }
  return "";
}

async function check() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const token = process.env.NOTION_SECRET;
  
  if (!databaseId || !token) {
    console.error("Missing Notion Database ID or Token in .env.local");
    return;
  }
  
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
      console.error("Failed to query Notion:", await res.text());
      return;
    }
    
    const data = await res.json();
    console.log(`Fetched ${data.results.length} total database items. Listing latest Braid/wheels related entries:`);
    
    const parsedItems = data.results.map(page => {
      const props = page.properties;
      return {
        id: page.id,
        name: getPropString(props['Name']) || getPropString(props['Ad']) || "İsimsiz",
        brand: getPropString(props['Marka']),
        category: getPropString(props['Kategori']),
        type: getPropString(props['Tür']),
        type1: getPropString(props['Tür 1']) || getPropString(props['Tür1']),
      };
    });

    // Braid Wheels'i veya son eklenenleri filtreleyelim
    const filtered = parsedItems.filter(item => 
      item.name.toLowerCase().includes("braid") || 
      item.brand.toLowerCase().includes("braid") || 
      item.type.toLowerCase().includes("braid") ||
      item.category.toLowerCase().includes("braid")
    );

    console.log(JSON.stringify(filtered, null, 2));
    
  } catch(e) {
    console.error("Error occurred:", e);
  }
}
check();
