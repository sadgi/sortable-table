const animation = {
  default: "400ms ease-in",
  fast: "300ms ease-in"
};

const breakpoints = [
  // mobile
  "320px",
  // tablet
  "768px",
  // computer
  "992px",
  // desktop
  "1200px",
  // widescreen
  "1920px"
];

const borderRadius = {
  xs: "1px",
  sm: "2px",
  md: "3px",
};


const borderSize = {
  xs: "0.5px",
  sm: "1px",
  md: "2px",
};

const colors = {
  gray: "#555",
  image: "#4C4E52",
  background: "#efefef",
  text: "#444444",
  border: "#cccccc",
  lightGray: "#bbb",
  disabled: "#c0c0c0",
  black: "#111212",
  superGray: "#e5e5e5"
};

const spacing = {
  none: "0px",
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  xxl: "28px",
};

const fonts = {
  body: "Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif",
  heading: "Poppins, Helvetiva Neue, Helvetica, Aria, sans-serif",
  monospace: "Menlo, monospace"
};

const theme = {
  animation,
  breakpoints,
  mediaQueries: {
    mobile: `@media screen and (max-width: ${breakpoints[0]})`,
    tablet: `@media screen and (max-width: ${breakpoints[1]})`,
    computer: `@media screen and (max-width: ${breakpoints[2]})`,
    desktop: `@media screen and (max-width: ${breakpoints[3]})`,
    widescreen: `@media screen and (max-width: ${breakpoints[4]})`
  },
  colors,
  spacing,
  borderSize,
  borderRadius,
  fonts,
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
};

export default theme;
