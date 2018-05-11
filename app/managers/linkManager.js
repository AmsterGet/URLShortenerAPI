const models = require("../models/index");
const utils = require("../common/utils/index");

const linkManager = {
  mapTagsToNotes: function mapTagsToNotes(tags) {
    tags.forEach((tag, index) => {
      tags[index] = {
        tagName: tag,
      };
    });
    return tags;
  },

  createLinks: function createNewLink(newLinksDataArray) {
    const newLinksPropertiesArray = [];

    newLinksDataArray.forEach((item) => {
      const shortUrl = utils.generateShortUrl();
      const tags = linkManager.mapTagsToNotes(item.tags.split(", "));

      newLinksPropertiesArray.push({
        originalUrl: item.originalUrl,
        shortUrl,
        postDate: new Date(),
        transitions: 0,
        description: item.description,
        tags,
        user: item.user,
      });
    });

    return models.Link.create(newLinksPropertiesArray);
  },
};

module.exports = linkManager;
