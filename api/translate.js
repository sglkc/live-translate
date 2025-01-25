import { translate } from 'google-translate-api-x';

/**
 * @param {Request} req
 * @returns {Response}
 */
export default async function handler(req) {
  const params = new URLSearchParams(req.url);
  const body = await req.json();
  const values = Object.assign({}, params, body);
  const { text, from = 'auto', json = false, to = 'en' } = values;

  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Credentials', true);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTION');

  const res = (body, status) => new Response(JSON.stringify(body), { status, headers })

  if (req.method === 'OPTIONS') return res({ body: 'ok' }, 200)

  if (!text) return res({
    error: "You have to add 'text' to your query/request"
  }, 400);

  const result = await translate(text, { from, to });

  if (json) return res(result, 200);

  return res(result.text, 200);
}
