const models = require("../models");

// will transfer into link_routes file and will lead to "/:shortUrl/info" form
module.exports = function (app) {
  app.get("/info/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      res.redirect("/");
    }
    const details = {
      shortUrl,
    };
    models.Link.find(details)
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
      });
  });

};
