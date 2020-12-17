# CTO UI
CTO UI is an application architecture framework that CrypTool uses to create and maintain its plugins on CrypTool Online. CTO UI makes it painless to create interactive plugins by providing the foundation. CTO UI makes it easy to create interactive plugins by providing the foundation for plugin creation. CTO UI takes care of the data flow, rendering and updating of the user interface. In fact, with CTO UI you should be able to create an entire plugin with a single file.

> CTO UI is built on the same principles as React, but optimized for CTO. If you are familiar with React, then you should be familiar with CTO UI.

## Features
CTO UI is an innovative, exceptionally simple way to build user interfaces across the CrypTool platform with the power of JavaScript/TypeScript. Build user interfaces using just one set of tools and APIs. With a declarative JS syntax that’s easy to read and natural to write, CTO UI works seamlessly with the new Jekyll version of CTO and keeps the UI and algorithm perfectly in sync.

- **:dizzy: Interactive** CTO UI manages the state of your components and efficiently renders each of them when a change occurs. CTO UI will also take care of managing your algorithm's lifecycle as well by handling behaviours such as encoding and decoding.
- **:recycle: Component based:** Not only does CTO UI give you access to a predefined and optimized component set, you can also create your own components. Like React, CTO UI embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. Instead of artificially separating technologies by putting markup and logic in separate files, CTO UI separates concerns with loosely coupled units called “components” that contain both. 
- **:fire: Modern:** Written in TypeScript, providing support for JSX, CCS-in-JS and modules, CTO UI has all the features of an ultra modern JavaScript framework.
- **:package: Lightweight:** CTO UI has no dependencies, and only uses the JSX environment of React 17 without importing all the modulations of Tree Shaking optimizations. In fact, we even had to rewrite the React rendering system to optimize the size. And without special optimizations, a complete plugin including the algorithm and CTO UI should weigh less than 20Kb!

