import React, {
  useEffect,
  useState,
  createContext,
  useContext
} from 'react';

const {
  filterBlock,
  filterFrame
} = require('./utils.js')

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

  console.error(`[Text not found in Ditto project with ID: [${textId}]]`);
  return `[Text not found in Ditto project with ID: [${textId}]]`;
}

const useDitto = (frameId, blockId, textId, filters) => {
  const copy = useContext(DittoContext);

  if (!textId && !blockId && !frameId) {
    console.error("No ID(s) provided.");
    return {};
  }
  if (!copy.frames) {
    console.error("Source JSON for DittoProvider does not have frames.");
    return {};
  }

  // textId only
  if (textId) {
    return useDittoSingleText(textId);
  }

  if (blockId && !frameId) {
    console.error("Block ID provided without frame ID.");
    return {};
  }
  // Error: frameId not found in project
  if (!(frameId in copy.frames)) {
    console.error(`Frame of ID [${frameId}] not found in this Ditto project.`);
    return {};
  }

  // frameId only
  if (frameId && !blockId) {
    const frame = copy.frames[frameId];
    if (filters) {
      return filterFrame(frame, filters);
    }
    return frame;
  }

  //frameId and blockId
  if (frameId && blockId) {
    if (!(blockId in copy.frames[frameId].blocks)) {
      console.error(`Block of ID [${blockId}] not found in frame of ID [${frameId}] in this Ditto project.`);
      return {};
    }
    const block = copy.frames[frameId].blocks[blockId];
    if (filters) {
      return filterBlock(block, filters);
    }
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
  if (!children) return useDitto(frameId, blockId, textId, filters)
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
