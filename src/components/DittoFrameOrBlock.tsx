import React from 'react';
import { useDitto } from '../hooks/useDitto';
import { fragmentError } from '../lib/utils';

export interface DittoFrameOrBlockProps {
  projectId: string;
  frameId: string;
  blockId?: string;
  filters?: {
    tags: string[];
  }
  // TODO: type data 
  children: (data: any) => React.ReactNode;
}

export const DittoFrameOrBlock = (props: DittoFrameOrBlockProps) => {
  const { children, ...otherProps } = props;
  const data = useDitto(otherProps);

  const childIsFunction = typeof children === 'function';

  if (!data)
    return <React.Fragment />;

  if (!childIsFunction) 
    return fragmentError(`Please provide either a textId or function child to your Ditto component.`);

  return props.children(data);
};
