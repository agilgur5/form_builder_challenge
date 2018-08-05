# form_builder_challenge

Form Builder with preview and export

## Table of Contents

1. [View the Live Demo!](https://agilgur5.github.io/form_builder_challenge/)
1. [Installation](#installation)
1. [Development](#development)
1. [Assumptions Made](#assumptions-made)
1. [Rationale for Approach](#rationale-for-approach)
1. [Misc Notes](#misc-notes)


## Installation

```
npm install
```


## Development

- `npm run build:watch` will run development mode with `webpack`'s watcher
- `npm run deploy` will clean the build folder and output a production bundle

To view the bundled React app, just open `index.html` in your browser (`file://` protocol)


## Assumptions Made

- Was told I could have creative and technical liberty
  - So made several UX improvements
    - Changed column allocation so that the Condition's input has more space than the Conditon's type
    - Added a dashed line showing the level of indendation / depth in the tree so it's easier on the eyes
    - "Delete" button should be on bottom left not bottom right
      - "Delete" will pop up a confirmation modal if there are Sub-Inputs
    - "Add" is on bottom right
    - "Preview" tab doesn't re-render if you click it when you're already in it
    - Changing from the "Preview" tab to another tab will pop up a confirmation
  - Used a UI kit, icons, colors, and transitions (these are both UI and UX improvements)
  - Made it as responsive as possible in as little time as possible
    - At a certain indentation / depth, you will have to scroll to the right on all screens, which is subpar, but not sure how to improve that
  - Hosted it on GitHub's CDN, no need to run a server for static assets
  - Did **not** use a Bootstrap Modal for confirmations as I did not take the time to do so
- There was no behavior defined for what should happen to Sub-Inputs when a parent's Type changes
  - It could've been delete all Sub-Inputs, reset all Sub-Inputs, or just reset the Condition field
  - I chose the final one as it has the least potentially unintended consequences (only what definitely has to change changes)
- Out-of-bounds input is **not** handled. This was not a requirement and would take time to handle with good UX
  - Field feedback (one part of handling out-of-bounds input) would require some assumptions / decisions too, but there aren't "right" or "wrong" scenarios in this case, so it wouldn't be very helpful either
- Tests were **not** required so I did not take the time to write some as that would take a not insignificant amount of time
  - I manually tested multiple times, but manual testing is not necessarily exhaustive
    - There are perhaps bugs on certain edge cases but I fixed any I noticed and made some assumptions around edge cases above


## Rationale for Approach

- Used [my own boilerplate](https://github.com/agilgur5/front-end-base) as a starting point
  - Using React, Webpack, Babel, etc as those are the libraries and tools I use (by far) most often and they can most definitely handle this type of problem / application well
  - Doesn't yet have HMR or `webpack-dev-server` for `webpack@4` and `babel@7`
    - This means there is no server, but one isn't needed to just host for static assets (see Development and Assumptions above)
    - Or yet have other optimizations for PWAs, DLLs, consistent hashing, etc
- Had been thinking of using `immer` or `mobx` to simplify mutating these deep nested trees, but there wasn't actually that much code to keep it immutable and it wasn't altogether that complex, so I just used plain JavaScript
  - Plus keeping mutations separated as actions as a best practice would mean the final code would end up similar either way
  - And of course, immutability is more for performance (of `shouldComponentUpdate` and `PureComponent`) and just a general best practice
- For the "Preview" tab, I left state as local to each of the fields / components as it isn't needed elsewhere and is much simpler that way
  - The value entered into the fields is only needed to know whether to render the direct Sub-Inputs or not, the filter for which can be done in the same component
    - So no need to pass state as props at all down the tree
  - Mutating a single value is also very easy and makes for simpler logic
- "Preview" tab can just be unmounted when it's not displayed in order to clear its state as required
  - Unmounting is by far the easiest solution to clear the state
- Used `shortid` to create unique `key`s for all array returns as the index is most certainly not a stable ID in this case
  - Potentially a different way to create unique IDs that could fit all edge cases without importing a package, but this is much easier and less time-consuming
- Saved JSON to `localStorage` after every change in the "Create" tab because the other option, on the `window`'s `unload` event, is potentially unreliable
  - This is obviously more expensive, but I didn't have any noticeable lag while testing
- Outside of the UI / UX improvements I made, `bootstrap`/`react-bootstrap` was useful for getting the wireframe UI down without much CSS or JS (e.g. for positioning and tabs)
  - I'm also just very familiar with the components having used them at past jobs


## Misc Notes

- Preview inputs default to an empty string because `null`, `undefined`, and the null terminator character (and other invisible characters) can't be the default
  - This means that for Text type conditions, a condition of equals blank would by default be true in the preview and instantly render that Sub-Input
    - More of a development / testing concern as you wouldn't have equals blank in regular usage
