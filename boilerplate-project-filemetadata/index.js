const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// ✅ 添加 CORS 支持（放在所有路由之前）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 配置 multer（使用内存存储）
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 根路由：显示上传表单
app.get('/', (req, res) => {
  res.send(`
    <form action="/api/fileanalyse" enctype="multipart/form-data" method="POST">
      <input type="file" name="upfile" />
      <input type="submit" />
    </form>
  `);
});

// 核心路由：处理文件上传
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
