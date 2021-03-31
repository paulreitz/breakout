const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', (__req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('*', (__req, res) => {
    res.send({status: 404, message: 'File Not Found'});
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});