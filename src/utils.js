//Utility functions for ditto-react (Ditto and DittoProvider)

//returns block filtered by parameters provided in filters
const filterBlock = (blockObj, filters) => {
  const block = Object.keys(blockObj).filter(textId => {
    if (!filters || !filters.tags) return true;
    return filters.tags.every(tag => (
      blockObj[textId].tags &&
      blockObj[textId].tags.includes(tag)
    ));
  }).reduce((obj, id) => {
    obj[id] = blockObj[id].text;
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
  return frameObj;
}

module.exports = {
  filterBlock,
  filterFrame
};
