import { data } from 'db/db';

export function get(req, res) {
  const userId = req.query.userId;
  const result = data.todos.filter((user) => user.userId == userId);
  res.end(JSON.stringify(result));
}
