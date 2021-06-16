import { Fragment } from 'react';

//Utility functions for ditto-react (Ditto and DittoProvider)
//

//returns block filtered by parameters provided in filters
export const filterBlock = (blockObj, filters) => {
  return Object.keys(blockObj)
    .filter(textId => {  
      if (!filters?.tags) 
        return true;

      return (
        filters.tags.every(tag => (
          blockObj[textId].tags &&
          blockObj[textId].tags.includes(tag)
        ))
      ) 
    })
    .reduce((obj, id) =>
      ({ ...obj, [id]: blockObj[id].text }), {});
}

export const filterFrame = (_frameObj, filters) => {
  const frameObj = JSON.parse(JSON.stringify(_frameObj));

  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(frameObj.blocks[blockId], filters);
    }
  }

  return { ...frameObj, otherText: filterBlock(frameObj.otherText, filters) };
}

export const error = (message: string, returnValue: any = message) => {
  console.error(message);
  return returnValue;
};

export const nullError = (message: string) => error(message, null);
export const fragmentError = (message: string) => error(message, <Fragment />);
