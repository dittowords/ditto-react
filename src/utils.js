//Utility functions for ditto-react (Ditto and DittoProvider)

//returns block filtered by parameters provided in filters
const filterBlock = (blockObj, filters) => {
  const block = Object.keys(blockObj).filter(textId => {
    return filters.tags.every(tag => (
      raw_block[textId].tags &&
      raw_block[textId].tags.includes(tag)
    ));
  }).reduce((obj, id) => {
    obj[id] = raw_block[id].text;
    return obj;
  }, {});
  return block;
}

const filterFrame = (frameObj, filters) => {
  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(frameObj.blocks[blockId], filters);
    }
  }
  frameObj.otherText = filterBlock(frameObj.otherText, filters);
}

module.exports = {
  filterBlock,
  filterFrame
};
