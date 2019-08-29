const white = "#FFFFFF";
const black = "#000000";

const red = "#c1272d";

const pink = "#f6323d";

const blue = "#004286";
const concrete = "#F2F2F2";
const grey = "#f7f7f7";
const darkGrey = "#a5a8af";

const lightGrey = "#CBCBCB";
const aztec = "#112026";
const darkestGrey = "#112026";
const whiteSmoke = "#f6f6f6";
const azure = "#007aff";
const purple = "#9000C4";

const appbutton = {
  primary: purple,
  secondary: "#53d83a",
  black: "#112026",
  danger: "rgb(255,0,0)"
};

const transparent = "rgba(0,0,0,0)";

const primary = white;
const secondary = black;
const tertiary = red;
const quaternary = blue;
const placeholder = darkGrey;

const background = {
  primary,
  secondary: darkestGrey,
  tertiary,
  quaternary,
  darkGrey,
  aztec,
  grey,
  white
  //   buttonbackground: appbutton
};
const drawer = darkestGrey;

const text = {
  azure: "#313131",
  primary: white,
  secondary,
  tertiary: red,
  quaternary: blue,
  darkestGrey,
  black,
  aztec,
  purple,
  concrete,
  grey: "#929292",
};

const navbar = {
  background: primary,
  text: darkestGrey,
  white
};

const border = darkestGrey;
const textfieldBorder = "#29363c";
const separator = lightGrey;
// const separator = red;

const error = red;
const success = text.quaternary;
const normal = text.primary;

const windowTint = "rgba(0, 0, 0, 0.4)";

const statusBar = {
  black: darkestGrey,
  white
};
const tabNavigator = {
  active: "#454f63",
  inactive: "#454f63",
  indicator: "#9000C4"
};
export default {
  azure,
  white,
  black,
  grey,
  pink,
  darkGrey,
  lightGrey,
  transparent,
  whiteSmoke,

  red,
  primary,
  secondary,
  tertiary,
  quaternary,

  background,
  navbar,
  text,

  border,
  textfieldBorder,
  separator,
  windowTint,

  error,
  success,
  normal,
  blue,
  facebook: "#39579a",
  placeholder,
  statusBar,
  drawer,
  tabNavigator,
  appbutton,
  purple
};
