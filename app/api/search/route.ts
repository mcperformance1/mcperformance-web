import { NextResponse } from 'next/server';
import { fetchAllItems } from '../../../lib/notion';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  
  const items = await fetchAllItems(); // In a real large app we'd use robust caching like unstable_cache here
  
  if (!q) {
    return NextResponse.json([]);
  }

  const results = items.filter(i => 
    i.name.toLowerCase().includes(q) || 
    i.brand.toLowerCase().includes(q)
  );

  return NextResponse.json(results.slice(0, 5)); // En fazla 5 sonuç dönder canlı arama için
}
