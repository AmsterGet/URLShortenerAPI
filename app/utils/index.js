
function generateShortUrl(originalUrl) {
  return originalUrl.slice(1, 6);
}

function verifyUser(user) {
  // some MongoDB's session's checks
}

module.exports = {
  generateShortUrl,
  verifyUser,
};
