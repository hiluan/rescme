// // Light theme
// export const lightTheme = {
//   backgroundColor: "white",
//   textColor: "black",
//   btnMain: "red",
//   btnNavActive: "black",
//   // ... add more colors
// };

// // Dark theme
// export const darkTheme = {
//   backgroundColor: "black",
//   textColor: "white",
//   btnMain: "red",
//   btnNavActive: "white",
//   // ... add more colors
// };

const darkTheme = {
  background: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    150: "#cfcfcf",
    200: "#c2c2c2",
    250: "#b5b5b5",
    300: "#a3a3a3",
    350: "#929292",
    400: "#858585",
    450: "#787878",
    500: "#666666",
    550: "#5c5c5c",
    600: "#525252",
    650: "#484848",
    700: "#3d3d3d",
    750: "#333333",
    800: "#292929",
    850: "#1f1f1f",
    900: "#141414",
    950: "#0a0a0a",
    990: "#020202",
    1000: "#000000",
  },

  gray: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    150: "#cfcfcf",
    200: "#c2c2c2",
    250: "#b5b5b5",
    300: "#a3a3a3",
    350: "#929292",
    400: "#858585",
    450: "#787878",
    500: "#666666",
    550: "#5c5c5c",
    600: "#525252",
    650: "#484848",
    700: "#3d3d3d",
    750: "#333333",
    800: "#292929",
    850: "#1f1f1f",
    900: "#141414",
    950: "#0a0a0a",
    990: "#020202",
    1000: "#000000",
  },

  primary: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#434957",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },

  greenAccent: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },

  redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },

  blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },

  purpleAccent: {
    100: "#a5a3e8",
    200: "#817fe2",
    300: "#5d5bd9",
    400: "#4844d3",
    500: "#4F46E5",
    600: "#3f3cc1",
    700: "#2e299c",
    800: "#1e176b",
    900: "#0f0a35",
  },

  pinkAccent: {
    100: "#f0d8f5",
    200: "#e1b1eb",
    300: "#d28ae1",
    400: "#C963D7",
    500: "#D715E9",
    600: "#ad12bf",
    700: "#831096",
    800: "#5a0772",
    900: "#2f024d",
  },
};

// function that reverses the color palette
function reverseTokens(darkTheme) {
  const reversedTokens = {};
  Object.entries(darkTheme).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

const lightTheme = reverseTokens(darkTheme);

export { darkTheme, lightTheme };
