export function post(req, res) {
  const page = req.body.page;
  req.session.page = page;
  res.end(JSON.stringify({ok: true, page: page}));
}