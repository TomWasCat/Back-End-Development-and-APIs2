const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 根路由
app.get('/', (req, res) => {
  res.send('Timestamp Microservice API is running. Try /api/1451001600000');
});

// 核心路由：/api/:date?
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // 无参数时返回当前时间
    date = new Date();
  } else {
    // 检查是否为纯数字（Unix 时间戳）
    const isUnix = /^\d+$/.test(dateParam);
    if (isUnix) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // 检查日期是否有效
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // 返回结果
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
