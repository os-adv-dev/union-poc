# designsystem-boilerplate

The objective of this repository is to create a starting point for any project that requires Frontend development.

## Key features

- Generates utility classes based from values in `globals.json`
- Font family CSS are automated
- Font icons from SVG are automated
- CSS auto-prefixer
- Styles can be shared easily across multiple components
- Streamline process from Design to Development, using JSON from Figma

## Installation

1. Create a <strong>Fork</strong> from this repository, name it after your project `lsg-customer-name`
2. Using SSH, create clone on your local machine
3. On the terminal execute `npm install` or `npm i`
4. In `globals.json` modify the values based on customer branding
5. `npm run build-globals` to build the sass variables
6. `npm run build` to generate CSS

## Configuration

- `globals.json` is the source of truth for your repository. Configure this file based on customer's branding and set up.
  - `customer` idenfitication of the customer
    - `name` used in generating file names such as CSS or JS.
    - `themeModule` Theme Module name created in Service Studio. This will be used to create the right URL paths.
  - `font` configuration for the customer's font face. Used to generate font face CSS
    - `name` name of the <strong>font</strong>
    - `headingsName` if customer uses different font face for the headings
    - `fontFaces` and `headingFontFaces` defines the name of each font file in `resources\fonts` folder for each `font-weight`
  - `iconFont` <strong>(optional)</strong> configuration to generate custom font icons from SVG
    - `name` font-face name to be generated
    - `classPrefix` prefix used to define font icon family
  - `colors`, `spacing` and `typography` <strong>(optional)</strong> configure to override styles property from OutSystemsUI, matching names will be overriddenw while new items not existing in OutSystemsUI will create new CSS variable with its respective utility classes.

### Generate SASS variablse

Make sure to save all your changes. Then, in your terminal run this code:

```shell
npm run build-globals
```

## How to customize the code?

All customization related to customer's branding should be inside a <strong>SASS partial</strong> under `01-Customer` folder.

### Customizing an OutSystemsUI component

To customize the `button` simply open `_button.scss` under `01-Customer/02-widgets/`

```SCSS
.btn {
  //Your customization should go here
}
```

### Adding a Custom Component

- Create a new <strong>SASS partial</strong>, `_your-custom-component.scss` under `01-Customer/04-pattern/07-custom`
- Open `index.scss` and add your file on the right section

```SCSS
/*! 6. Patterns */
/*! 6.9.1. Patterns - Custom - Your Custom Component */
@import "01-Customer/04-patterns/07-custom/your-custom-component";
```

### Generate CSS

Make sure to save all your changes. Then, in your terminal run this code:

```shell
npm run build
```

This will generate files that you can import to <strong>Service Studio</strong>.

Under `dist-server` folder you should see these files:

- `prod.customerName.css`
- `prod.customerName.js`

## What tools should you use?

We highly recommend the usage of the following tools:

- [Visual Studio Code](https://code.visualstudio.com/)
- With these extensions:
  - [Requestly](https://requestly.io/downloads/chrome/)
  - or [dev-helper](https://chrome.google.com/webstore/detail/dev-helper/kbbgddcndpjnadfacanamniaomcohlcc)

## Changelog
