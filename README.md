# React support for @reasonink/clack

This package provides two React components that enable keyboard shortcuts in
React.

## Installation

Install with `npm install @reasonink/clack-react` or, if using yarn
`yarn add @reasonink/clack-react`.

Older versions of npm require the `--save` flag in order to add the
package to `dependencies` in your `package.json`.

## Usage

In the following example we create a component `MyComponent` that wraps
`MyOtherComponent` with three keyboard shortcuts. Whenever `MyOtherComponent`
or any of its children are focused the three shortcuts will be enabled.

```tsx
import { Keyboard, KeyCombo } from "@reasonink/clack-react";

function MyComponent(props: {}) {
    return <Keyboard>
        <KeyCombo c="ctrl + b" onPress={() => /* handle */ } />
        <KeyCombo c="ctrl + i" onPress={() => /* handle */ } />
        <KeyCombo c="ctrl + u" onPress={() => /* handle */ } />
        <MyOtherComponent />
    </Keyboard>;
}
```

## Components

Two components are provided. `Keyboard` is a wrapper for one or more
`KeyCombo` elements and a single other element that is the target of the
keyboard shortcuts.

### Keyboard

Renders a `<div class="keyboard">` containing the single non-`KeyCombo` child.
Does not support any additional props.

### KeyCombo

Specifies a keyboard shortcut. The following props are supported:

<dl>
    <dt>c</dt>
    <dd>A string specifying the key combo.</dd>
    <dt>onPress(e: KeyboardEvent)</dt>
    <dd>A function that is invoked when the key combo is pressed by the user.</dd>
    <dt>global</dt>
    <dd>A boolean specifying whether or not the key combo is global (default:
    false). A global shortcut is active even if the child of
    <code>&lt;Keyboard&gt;</code> is not focused.</dd>
    <dt>preventDefault</dt>
    <dd>A boolean indicating whether <code>e.preventDefault()</code> is
    invoked automatically (default: true).</dd>
</dl>

## License

This library is made available under the MIT license. See the LICENSE file for
details.
