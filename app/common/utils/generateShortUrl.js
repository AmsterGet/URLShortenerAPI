const crypto = require("crypto");

function generateShortUrl() {
  const randString = crypto.randomBytes(40).toString("hex");
  const randStringLength = randString.length;
  const shortUrl = [];
  for (let index = 0; index < 6; index++) {
    const randomIndex = Math.round(Math.random() * randStringLength);
    console.log(randomIndex);
    let randomItem = randString[randomIndex];
    if (randomIndex % 2 === 0) {
      randomItem = randomItem.toUpperCase();
    }
    shortUrl.push(randomItem);
  }
  return shortUrl.join("");
}

module.exports = generateShortUrl;
