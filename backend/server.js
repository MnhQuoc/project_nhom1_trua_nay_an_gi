// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ Route xác minh email
server.get('/verify/:id', (req, res) => {
  const id = req.params.id;
  const db = router.db;

  // So sánh id dưới dạng chuỗi để tránh lỗi khi id là số trong db.json
  const user = db.get('users').find(u => String(u.id) === id).value();

  if (!user) {
    return res.status(404).send('Người dùng không tồn tại');
  }

  if (user.verified) {
    return res.send('Tài khoản đã xác minh thành công');
  }

  db.get('users')
    .find(u => String(u.id) === id)
    .assign({ verified: true })
    .write();

  res.send('Xác minh tài khoản thành công!');
});

// Các route mặc định
server.use(router);

// Start server
server.listen(3001, () => {
  console.log('🚀 JSON Server đang chạy tại http://localhost:3001');
});
