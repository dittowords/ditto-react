import React, { createContext, useContext } from 'react'

import { filterBlock, filterFrame } from './utils';

interface Text {
  text: string;
  tags: string[];
}

interface DittoContext {
  projects: {
    [projectId: string]: {
      project_name: string;
      frames: {
        [frameId: string]: {
          frameName: string;
          blocks: {
            [blockId: string]: {
              [textId: string]: Text;
            }
          }
          otherText?: {
            [textId: string]: Text;
          }
        }
      }
    }
  } 
}

export const DittoContext = createContext({} as DittoContext)

const error = (message: string, returnValue: any = message) => {
  console.error(message);
  return returnValue;
};

const nullError = (message) => error(message, null);
const fragmentError = (message) => error(message, <React.Fragment />);

const useDittoSingleText = ({ projectId, textId }) => {
  const copy = useContext(DittoContext);

  if (!projectId) 
    return nullError('No Project ID provided.');
  
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

interface useDittoProps {
  projectId: string;
  frameId: string;
  blockId?: string;
  filters?: {
    tags: string[];
  }
}

const useDitto = (props: useDittoProps) => {
  const { projectId, frameId, blockId, filters } = props;
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

interface DittoDefaultProps {
  projectId: string;
  frameId: string;
  blockId?: string;
  filters?: {
    tags: string[];
  }
  // TODO: type data 
  children: (data: any) => React.ReactNode;
}

const DittoDefault = (props: DittoDefaultProps) => {
  const { children, ...otherProps } = props;
  const data = useDitto(otherProps);

  const childIsFunction = typeof children === 'function';

  if (!data)
    return <React.Fragment />;

  if (!childIsFunction) 
    return fragmentError(`Please provide either a textId or function child to your Ditto component.`);

  return props.children(data);
};

interface DittoTextProps {
  projectId: string;
  textId: string;
}

const DittoText = (props: DittoTextProps) => {
  const { projectId, textId } = props;
  const text = useDittoSingleText({ projectId, textId });

  return (
    <React.Fragment>
      {text}
    </React.Fragment>
  )
}

type DittoProps = DittoDefaultProps | DittoTextProps;

function getDittoType(props: DittoProps) {
  if ('textId' in props) {
    return 'text';
  }

  return 'default';
}

export const Ditto = (props: DittoProps) => {
  if (!props.projectId) 
    return fragmentError('No Project ID provided to Ditto component.');

  const type = getDittoType(props);

  switch (type) {
    case 'text':
      return <DittoText {...(props as DittoTextProps)} />;
    default:
      return <DittoDefault {...(props as DittoDefaultProps)} />;
  }
}

const DittoProvider = ({ children, source }) => {
  return (
    <DittoContext.Provider value={source}>
      {children}
    </DittoContext.Provider>
  )
}

export default DittoProvider;
