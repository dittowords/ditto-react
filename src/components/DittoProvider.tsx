import React from 'react';
import { DittoSource, DittoContext } from '../lib/context';

interface DittoProviderProps {
  projectId?: string;
  source: DittoSource;
  children: React.ReactNode;
}

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source, projectId } = props;

  return (
    /* 
     * projectId is only included as a property on the `source`
     * in this way to maintain backwards compatibility. When it
     * comes time to introduce breaking changes, it should be
     * given its own property on the context value.
     */
    <DittoContext.Provider value={{
      ...source,   
      ...(projectId ?  { projectId } : {})
    }}>
      {children}
    </DittoContext.Provider>
  )
}
