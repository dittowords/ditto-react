import React from 'react';
import { useDittoSingleText } from '../hooks/useDittoSingleText';

export interface DittoTextProps {
  projectId: string;
  textId: string;
}

export const DittoText = (props: DittoTextProps) => {
  const { projectId, textId } = props;
  const text = useDittoSingleText({ projectId, textId });

  return (
    <React.Fragment>
      {text}
    </React.Fragment>
  )
}
