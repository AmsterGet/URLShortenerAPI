module.exports = function (app) {
  app.get("/", (req, res) => {
    const { shortUrl } = req.params;
    res.redirect(`/info/${shortUrl}`);
  });
  // for authorization
  app.put("/", (req, res) => {

  });
};
