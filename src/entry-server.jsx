import { ChakraProvider } from "@chakra-ui/react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";

import App from "./App";
import { theme } from "./theme";
import i18n from "./translation/config.js";
export async function render(url) { await i18n.changeLanguage("es"); return renderToString(<ChakraProvider theme={theme}><StaticRouter location={url}><App /></StaticRouter></ChakraProvider>); }
