import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";

export const theme = extendTheme({
  colors: {
    primary: {
      default: "#256a60",
      "50": "#f6fee4",
      "100": "#edfecc",
      "200": "#ddfd9a",
      "300": "#cdfd68",
      "400": "#bcfc36",
      "500": "#256a60",
      "600": "#7cc026",
      "700": "#5b8b1d",
      "800": "#3a5613",
      "900": "#1c230a",
    },

    secondary: {
      default: "#1a3a35",
      "50": "#f9e9e8",
      "100": "#f3c8c7",
      "200": "#eb9b95",
      "300": "#e36e64",
      "400": "#db4132",
      "500": "#E13D3C",
      "600": "#af302f",
      "700": "#802423",
      "800": "#1a3a35",
      "900": "#230c0c",
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});
