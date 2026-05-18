import type { VercelRequest, VercelResponse } from '@vercel/node';

const WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL']!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const ip = req.headers['x-forwarded-for'] as string || 'unknown';

  const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
  const geo = await geoRes.json();

  const { referrer, language, device, screenResolution, timezone, browser } = req.body;

  const payload = {
    content: null,
    embeds: [{
      title: '👀 New portfolio visit',
      color: 0x5865F2,
      fields: [
        { name: '🕐 Time', value: new Date().toLocaleString('pl-PL'), inline: true },
        { name: '🌍 Country', value: geo.country || 'unknown', inline: true },
        { name: '🏙️ City', value: geo.city || 'unknown', inline: true },
        { name: '🌐 Language', value: language || 'unknown', inline: true },
        { name: '📱 Device', value: device || 'unknown', inline: true },
        { name: '🖥️ Browser', value: browser || 'unknown', inline: true },
        { name: '📐 Screen', value: screenResolution || 'unknown', inline: true },
        { name: '🕰️ Timezone', value: timezone || 'unknown', inline: true },
        { name: '📍 Referrer', value: referrer || 'Direct', inline: true },
        { name: '🌐 IP', value: ip, inline: true },
      ],
      timestamp: new Date().toISOString()
    }]
  };

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  res.status(200).json({ ok: true });
}