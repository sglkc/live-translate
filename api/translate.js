import translate from '@vitalets/google-translate-api';

export default async function handler(req, res) {
  const {
    text,
    from = 'auto',
    json = false,
    to = 'en'
  } = req.body || req.query;

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');

  if (req.method === 'OPTIONS') return res.status(200).json({ body: "OK" });
  if (!text) return res.status(400).json({
    error: "You have to add 'text' to your query/request"
  });

  const result = await translate(text, { from, to });

  if (json) return res.status(200).json(result);
  return res.status(200).send(result.text);
}
