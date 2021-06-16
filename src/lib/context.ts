import { createContext } from 'react';

interface DittoText {
  text: string;
  tags?: string[];
}

export interface DittoSource {
  projectId?: string;
  projects: {
    [projectId: string]: {
      project_name: string;
      frames: {
        [frameId: string]: {
          frameName: string;
          blocks: {
            [blockId: string]: {
              [textId: string]: DittoText;
            }
          }
          otherText?: {
            [textId: string]: DittoText;
          }
        }
      }
    }
  } 
}

export const DittoContext = createContext({} as DittoSource)
