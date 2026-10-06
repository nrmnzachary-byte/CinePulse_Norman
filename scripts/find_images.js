import { SHOWCASE_MOVIES } from '../src/config.js';

async function testAll() {
  const badList = [];
  for (const m of SHOWCASE_MOVIES) {
    const pUrl = 'https://image.tmdb.org/t/p/w500' + m.poster_path;
    const res = await fetch(pUrl, { method: 'HEAD' }).catch(() => ({ ok: false }));
    if (!res.ok) {
      badList.push(m);
    }
  }
  console.log('Bad count:', badList.length);
  for (const m of badList) {
    console.log(`- ${m.title} (ID: ${m.id})`);
  }
}

testAll();
