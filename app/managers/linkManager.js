const linkManager = {
  mapTagsToNotes: function mapTagsToNotes(tags) {
    tags.forEach((tag, index) => {
      tags[index] = {
        tagName: tag,
      };
    });
    return tags;
  },
};

module.exports = linkManager;
