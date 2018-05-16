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
      shortUrl: { $regex: `${shortUrl}`, $options: "i" },
    };
    Link.find(queryDetails)
      .then((links) => {
        let linksToSend;
        if (!links.length) {
          return res.status(404).send("Such link was not found!");
        }
        if (links.length === 1) {
          linksToSend = links.pop();
        } else {
          linksToSend = links;
        }
        console.log("--------------------LINKS--------------------");
        console.log(linksToSend);
        res.send(linksToSend);
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
