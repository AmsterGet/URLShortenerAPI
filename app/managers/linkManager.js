const models = require("../models/index");
const utils = require("../common/utils/index");
const Json2csvParser = require("json2csv").Parser;

const linkManager = {
  mapTagsToNotes: (tags) => {
    tags.forEach((tag, index) => {
      tags[index] = {
        tagName: tag,
      };
    });
    return tags;
  },

  mapNotesToTags: (notes) => {
    console.log(notes);
    notes.forEach((note, index) => {
      notes[index] = note.tagName;
    });
    return notes;
  },

  createLinks: (newLinksDataArray) => {
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

  convertLinksToCsv: (links) => {
    const fields = [
      "originalUrl",
      "shortUrl",
      "postDate",
      "transitions",
      "description",
      "tags",
    ];

    const csvLinks = [];
    links.forEach((item) => {
      const tags = linkManager.mapNotesToTags(item.tags).toString();
      const currentLinkData = {
        originalUrl: item.originalUrl,
        shortUrl: item.shortUrl,
        postDate: item.postDate,
        transitions: item.transitions,
        description: item.description,
        tags,
      };

      csvLinks.push(currentLinkData);
    });
    const json2csvParser = new Json2csvParser({ fields, delimiter: ";" });
    return json2csvParser.parse(csvLinks);
  },
};

module.exports = linkManager;
