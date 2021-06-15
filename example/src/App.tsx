import DittoProvider, { Ditto } from 'ditto-react-2'
import source from './ditto/text.json';

const App = () => {
  return (
    <DittoProvider source={source}>
      <Ditto 
        projectId="project_606652b903907b0113e329a6"
        textId="text_606652bae02e5dfefcb4398a"
      />
      <Ditto 
        projectId="project_606652b903907b0113e329a6"
        frameId="frame_606652bce02e5dfefcb439b0"
      >
        {
          (frame) =>  Object
            .keys(frame.otherText)
            .map(textId => 
              <p key={textId}>{frame.otherText[textId]}</p>
            )
        }
      </Ditto>
    </DittoProvider>
  )
}

export default App;
