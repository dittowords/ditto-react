import DittoProvider, { Ditto } from 'ditto-react'
import source from './ditto/text.json';

const renderFrame = (frame: any) =>  {
  return Object.keys(frame.otherText)
    .map(textId => 
      <p key={textId}>{frame.otherText[textId]}</p>
    )
}

const App = () => {
  return (
    <>
      {/* Usage Option #1: projectId passed as a prop to individual Ditto components */}
      <DittoProvider source={source}>
        <Ditto 
          projectId="project_606652b903907b0113e329a6"
          textId="text_606652bae02e5dfefcb4398a"
        />
        <Ditto 
          projectId="project_606652b903907b0113e329a6"
          frameId="frame_606652bae02e5dfefcb43987"
        >
          {renderFrame}
        </Ditto>
      </DittoProvider>
      {/* Usage Option #2: projectId passed to DittoProvider and inherited by Ditto components */}
      <DittoProvider projectId="project_606652b903907b0113e329a6" source={source}>
        <Ditto textId="text_606652bae02e5dfefcb4398a" />
        <Ditto frameId="frame_606652bae02e5dfefcb43987">
          {renderFrame}
        </Ditto>
      </DittoProvider>
      {/* Usage Option #3: projectId passed to DittoProvider but overwritten by prop passed to Ditto components */}
      <DittoProvider projectId="some_other_project" source={source}>
        <Ditto 
          projectId="project_606652b903907b0113e329a6"
          textId="text_606652bae02e5dfefcb4398a"
        />
        <Ditto 
          projectId="project_606652b903907b0113e329a6"
          frameId="frame_606652bae02e5dfefcb43987"
        >
          {renderFrame}
        </Ditto>
      </DittoProvider>
    </>
  )
}

export default App;
