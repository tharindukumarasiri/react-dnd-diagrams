# React DnD Diagrams

A customizable React drag and drop NPM package for building interactive diagrams. This is the most powerful and developer friendly visual diagram builder for your app.

|                                                          Overview                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------: |
| ![ScreenRecording2024-03-23at11 55 21AM-ezgif com-video-to-gif-converter](https://github.com/tharindukumarasiri/react-dnd-diagrams/assets/39773857/58b9233d-cd1a-48d5-aa80-5b52973b0089) |


## Live Demo

Check out the live demo here: https://github.com/tharindukumarasiri.github.io/react-dnd-diagrams ([Source Code](https://github.com/tharindukumarasiri/react-dnd-diagrams/tree/main/demo/src))

## Installation

The easiest way to use React DnD Diagram is to install it from NPM and include it in your own React build process.

```
npm install react-dnd-diagrams --save
```

## Usage

Require the DnDFlow component and render it with JSX:

```javascript
import React from 'react';
import { render } from 'react-dom';

import DnDFlow from 'react-dnd-diagrams';

const Categories = {
    'SHAPES': 'Shapes',
    'STRUCTURES': 'Other'
}

const parentNodes = ['Table', 'LineChart']

const ShapesData = {
    Square: {
        image: <rect x="0.5" y="0.5" width="25" height="25" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 26 26",
        category: [Categories.SHAPES],
        keepAspectRatio: false,
    },
    Table: {
        image:
        <>
            <g>
                <path d="M245.9,5.2v89.7H4.7V5.2H245.9 M246.9,4.2H3.7v91.7h243.1V4.2L246.9,4.2z" />
            </g>
            <g>
                <line class="st0" x1="59.5" y1="4.8" x2="59.5" y2="95" />
            </g>
            <g>
                <line class="st0" x1="158" y1="4.8" x2="158" y2="95" />
            </g>
            <line class="st0" x1="4.6" y1="21.2" x2="246.4" y2="21.2" />
        </>,
        viewBox: "0 0 251 101",
        size: { width: 100, height: 100 },
        keepAspectRatio: false,
        hideTextInput: true,
        hideShape: true,
        category: [Categories.STRUCTURES]
    },
}

const App = (props) => {

  return (
    <div>
      <DnDFlow
        categories={Categories}
        parentNodes={parentNodes}
        shapesData={ShapesData}
        DrawingContent={null}
        saveDiagram={(data) => { console.log(data) }}
      />
    </div>
  );
};

render(<App />, document.getElementById('app'));
```

See the [example source](https://github.com/tharindukumarasiri/react-dnd-diagrams/blob/main/demo/src/App.js) for a reference implementation.

### Properties

| roperty        | type                | description                                             |
| -------------- | ------------------- | ------------------------------------------------------- |
| **DrawingContent** | `Object data`       | Takes the design JSON and loads it in the canvas        |
| **saveDiagram** | `Function callback` | Returns the design JSON in a callback function          |
| **categories** | `Object {[key]: id :[value]: category name}` | Categories of of shapes in sidebar |
| **shapesData** | `Object {[key]: name :[value]: shape props}` | Sahpe data including the SVG |
| **parentNodes** | `Array` | Node names that has the ability to group(act as parent nodes) |

### Shape Properties
All shapes are used from **SVG** format, please remove the `<svg>` tag and add the `viewBox` values as given in the example above.

- `image` {`<HTMLElement>`} svg of the shape without the <svg></svg> tag and other elements outside of the <svg> tag
- `viewBox` {`String`} viewBox of the svg
- `category` {`Array`} list of category ids, to include inside of the categories
- `size` {`Object { width: number, height: number }`} Size of the shape when initially dropped (optional)
- `keepAspectRatio` {`Boolean`} (`default: true`) ability to keep the aspect ratio when resizing (optional)
- `hideTextInput` {`Boolean`} (`default: false`) hide the text input inside of the shape
- `hideShape` {`Boolean`} (`default: false`) hide svg shape

## Tools and options

### Image upload
![ScreenRecording2024-03-23at4 53 44PM-ezgif com-video-to-gif-converter](https://github.com/tharindukumarasiri/react-dnd-diagrams/assets/39773857/eb6f1827-69e7-4553-88aa-7c2d8eda49f6)

### Layers
![ScreenRecording2024-03-23at5 02 40PM-ezgif com-video-to-gif-converter](https://github.com/tharindukumarasiri/react-dnd-diagrams/assets/39773857/de86acb0-fafd-4222-b51c-d6fd2c0cc0c8)



*This library is in early stages more features and customization comming soon.

All bug reports and PRs are appreciated

### License

Copyright (c) 2024 [MIT] Licensed.
