# Vive Floating Box

A React component that creates floating elements that subtly follow mouse movement, creating an engaging interactive experience.

## Installation

```bash
npm install vive-floating-box
```

## Usage

```jsx
import React from 'react';
import { FloatingBox } from 'react-floating-box';

function App() {
  return (
    <div>   // adjust location here
        <FloatingBox>   // props here
                        // like <FloatingBox onlyActiveHover={ture}>
                        // if you use many FloatingBoxs, it would be better
                        // or control this by your own condition
                        // like <FloatingBox isOn={your_condition}>
            <div></div> // your content
        </FloatingBox>
    <div>
  );
}
```

## Css Usage

this component's css style 

```css
.box_move {
  position: relative;
  z-index: 999;
  will-change: transform;
  width: fit-content;
  height: fit-content;
}
.box_size {
  transition: transform 0.35s cubic-bezier(0.7, -0.5, 0.4, 1.5);
}
.box_size:hover {
  transform: scale(1.13);
}
```

make your own style with classNames

## Props

| Prop            | Type      | Default | Description                                                   |
| :-------------- | :-------- | :------ | :------------------------------------------------------------ |
| children        | ReactNode | -       | Content to be rendered inside the floating box                |
| moveRate        | number    | 0.02    | How much the element moves in response to mouse movement      |
| isOn            | boolean   | true    | Whether the floating effect is active                         |
| onlyActiveHover | boolean   | false   | Only activate when hovering over the element for optimization |
| useHoverScaleUp | boolean   | true    | Enable scale up effect on hover                               |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
