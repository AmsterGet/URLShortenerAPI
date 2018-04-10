const { Link } = require("../../models/index");

const linkRoutesHandler = {
  shortLinkRedirect: (req, res) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };

    Link.findOneAndUpdate(queryDetails, { $inc: { transitions: 1 } })
      .then((link) => {
        if (!link.originalUrl) {
          return new Error();
        }
        res.redirect(link.originalUrl);
      })
      .catch((error) => {
        console.error(error);
        res.send("The link is not found!");
      });
  },

  getLinkInfo: (req, res) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };
    Link.find(queryDetails)
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  },

  findLinksByTagName: (req, res) => {
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
