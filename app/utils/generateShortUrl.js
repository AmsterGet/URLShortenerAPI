function generateShortUrl(originalUrl) {
  return originalUrl.slice(1, 6);
}

module.exports.generateShortUrl = generateShortUrl;
