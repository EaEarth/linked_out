// next.config.js
const path = require('path');
module.exports = {
  images: {
    domains: ['localhost', '127.0.0.1', 'static.toiimg.com'],
  },
  poweredByHeader: false,
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
