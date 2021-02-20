import React, {
  useEffect,
  useState,
  createContext,
  useContext
} from 'react';

export const DittoContext = createContext({});

const useDittoSingleText = (textId) => {
  const copy = useContext(DittoContext);

  for (var frameId in copy.frames) {
    // Look in Blocks
    for (var blockId in copy.frames[frameId].blocks) {
      if (textId in copy.frames[frameId].blocks[blockId]) {
        return copy.frames[frameId].blocks[blockId][textId].text;
      }
    }
    // Look in otherText
    if (
      copy.frames[frameId].otherText &&
      textId in copy.frames[frameId].otherText
    ) {
      return copy.frames[frameId].otherText[textId].text;
    }
  }
  return "[Text not found in this Ditto project for the provided ID]";
}

const useDitto = (frameId, blockId, textId, filters) => {
  const copy = useContext(DittoContext);

  // textId only
  if (textId) {
    return useDittoSingleText(textId);
  }

  // frameId only
  if (frameId && !blockId) {
    const frame = copy.frames[frameId];
    return frame;
  }
  if (frameId && blockId) {
    const raw_block = copy.frames[frameId].blocks[blockId];
    const block = Object.keys(raw_block).filter(textId => {
      if (!filters) return true;
      //filter so only text items that have all of the tags in filters
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

  return {};
}

export const Ditto = ({
  children = null,
  frameId = null,
  blockId = null,
  textId = null,
  filters = null
}) => {
  if (!children && textId) return useDitto(frameId, blockId, textId, filters)
  return children(useDitto(frameId, blockId, textId, filters))
}

const DittoProvider = ({
  children,
  source
}) => {
  return (
    <DittoContext.Provider value={source}>
      {children}
    </DittoContext.Provider>
  )
}

export default DittoProvider;
