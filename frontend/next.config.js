// next.config.js
const path = require('path');
const url = require('url');
module.exports = {
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'static.toiimg.com',
      new url.URL(process.env.API_ENDPOINT_SSR).host
    ],
  },
  poweredByHeader: false,
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
