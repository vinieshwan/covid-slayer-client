const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(`${__dirname}/build`));

app.use(
	'/v1',
	createProxyMiddleware({
		target: process.env.TARGET,
		changeOrigin: true,
		secure: process.env.NODE_ENV === 'production'
	})
);

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
	console.log(`server running now.. ${port}`);
});
