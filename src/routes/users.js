import { data } from 'db/db';

export function get(req, res) {
  res.writeHead(200, {
    'x-total-count': data.users.length
  });
  if (req.query.id) {
    const result = data.users.filter(({id}) => id == req.query.id);
    res.end(JSON.stringify(result));
  } else {
    const perPage = req.query._limit || 10;
    const startUser = ((req.query._page || 1) - 1) * perPage;
    const endUser = Math.min(startUser + 5, data.users.length);
    const result = data.users.slice(startUser, endUser);
    res.end(JSON.stringify(result));
  }
}
