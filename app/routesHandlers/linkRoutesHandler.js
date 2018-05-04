const { Link } = require("../models/index");

const linkRoutesHandler = {
  shortLinkRedirect: (req, res, next) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };

    Link.findOneAndUpdate(queryDetails, { $inc: { transitions: 1 } })
      .then((link) => {
        res.redirect(link.originalUrl);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send();
      });
  },

  getLinkInfo: (req, res) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };
    Link.findOne(queryDetails)
      .then((link) => {
        if (!link) {
          return res.status(404).send("Link was not found!");
        }
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  },

  findLinksByTagName: (req, res) => {
    console.log(req.params);
    const { tagName } = req.params;
    const queryDetails = {
      "tags.tagName": tagName,
    };
    Link.find(queryDetails)
      .then((links) => {
        res.send(links);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  },
};

module.exports = linkRoutesHandler;
