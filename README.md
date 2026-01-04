# Vive Floating Box

![Honeycam 2026-01-04 16-44-07](https://github.com/user-attachments/assets/839d5d9c-39f6-4b93-848e-2bc60f995a92)

[![npm version](https://img.shields.io/npm/v/vive-floating-box)](https://www.npmjs.com/package/vive-floating-box)
[![git link](https://img.shields.io/badge/git_link-blue)](https://github.com/Ivex0002/vive-floating-box)
[![test project](https://img.shields.io/badge/test_project-blue)](https://github.com/Ivex0002/vive-floating-box_test-project)

A React component that creates floating elements that subtly follow mouse movement, creating an engaging interactive experience.

## Installation

```bash
npm install vive-floating-box
```

## Usage

```tsx
import React from 'react';
import { FloatingBox } from 'vive-floating-box';

function App() {
  return (
    <div>   // adjust location here
        <FloatingBox
          isOn={true} // custom on/off option
          moveRate={0.02} // move rate per mouse position
          onlyActiveHover={false} // on/off option preset : hover
          useHoverScaleUp={true} // scale up when hover
        >
          <button onClick={() => setCount((count) => count + 1)}> // your contents
            count is {count}
          </button>
        </FloatingBox>
    <div>
  );
}
```

## ~~Css Usage~~

~~this component's css style~~

<del>
<pre>
<code class="language-css">
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
</code>
</pre>
</del>

### 1.1 update : NO CSS FILE anymore

this component no longer relies on external CSS files.
All visual behavior is now handled through inline styles.

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
