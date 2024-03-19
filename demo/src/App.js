import './App.css';

import DnDFlow from 'react-dnd-diagrams';
import ShapesData, { Categories, parentNodes } from './ShapesData'

function App() {
  return (
    <div className="App">
      <DnDFlow
        categories={Categories}
        parentNodes={parentNodes}
        shapesData={ShapesData}
        DrawingContent={null}
        saveDiagram={(data) => { console.log(data) }}
      />
    </div>
  );
}

export default App;
