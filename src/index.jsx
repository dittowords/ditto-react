import React, { createContext, useContext } from 'react'

const { filterBlock, filterFrame } = require('./utils.js');

export const DittoContext = createContext({})

const error = (message, returnValue = message) => {
  console.error(message);
  return returnValue;
};

const nullError = (message) => error(message, null);
const fragmentError = (message) => error(message, <React.Fragment />);

const useDittoSingleText = ({ projectId, textId }) => {
  const copy = useContext(DittoContext);

  if (!projectId) 
    return error('No Project ID provided.');
  
  const project = copy.projects[projectId];

  for (const frameId in project.frames) {
    const frame = project.frames[frameId];

    for (const blockId in frame.blocks) {
      const block = frame.blocks[blockId];

      if (textId in block) 
        return block[textId].text
    }

    if (frame.otherText && textId in frame.otherText) 
      return frame.otherText[textId].text
  }

  return error(`[Text not found in Ditto project with ID: [${textId}]]`);
}

const useDitto = ({ projectId, frameId, blockId, filters }) => {
  const copy = useContext(DittoContext);

  if (!copy.projects) 
    return nullError('Source JSON for DittoProvider does not have projects.');

  if (!projectId) 
    return nullError('No Project ID provided.');

  const project = copy.projects[projectId];

  if (!frameId) {
    return nullError('No Frame ID provided.');
  }
  if (!(frameId in project.frames)) 
    return nullError(`Frame of ID [${frameId}] not found in this Ditto project.`);

  const frame = project.frames[frameId];

  if (!blockId) 
    return filterFrame(frame, filters);

  if (!(blockId in frame.blocks)) 
    return nullError(`Block of ID [${blockId}] not found in frame of ID [${frameId}] in this Ditto project.`);
  
  const block = frame.blocks[blockId];
  
  return filterBlock(block, filters);
}

const DittoDefault = (props) => {
  const { children, ...otherProps } = props;
  const data = useDitto(otherProps);

  const childIsFunction = typeof children === 'function';

  if (!data)
    return <React.Fragment />;

  if (!childIsFunction) 
    return fragmentError(`Please provide either a textId or function child to your Ditto component.`);

  return props.children(data);
};

const DittoText = (props) => {
  const { projectId, textId } = props;
  const text = useDittoSingleText({ projectId, textId });

  return (
    <React.Fragment>
      {text}
    </React.Fragment>
  )
}

function getDittoType(props) {
  const { textId } = props;

  if (textId) {
    return 'text';
  }

  return 'default';
}

export const Ditto = (props) => {
  if (!props.projectId) 
    return fragmentError('No Project ID provided to Ditto component.');

  const type = getDittoType(props);

  switch (type) {
    case 'text':
      return <DittoText {...props} />;
    default:
      return <DittoDefault {...props} />;
  }
}

const DittoProvider = ({ children, source }) => {
  return (
    <DittoContext.Provider value={source}>
      {children}
    </DittoContext.Provider>
  )
}

export default DittoProvider

