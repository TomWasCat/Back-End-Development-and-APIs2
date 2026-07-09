const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// ----- 配置 CORS（允许跨域请求）-----
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ----- 配置 multer（允许上传任何文件）-----
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 限制 10MB
});

// ----- 根路由：显示上传表单 -----
app.get('/', (req, res) => {
  res.send(`
    <form action="/api/fileanalyse" enctype="multipart/form-data" method="POST">
      <input type="file" name="upfile" />
      <input type="submit" />
    </form>
  `);
});

// ----- 核心路由：处理文件上传 -----
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // 必须返回 name, type, size 三个字段
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
