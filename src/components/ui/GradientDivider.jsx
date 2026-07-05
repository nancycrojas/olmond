/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../../lib/constants.js";

export function GradientDivider({ w = "72px", ...props }) {
  return (
    <Box
      h="4px"
      w={w}
      bgImage={BRAND_GRADIENT}
      borderRadius="full"
      my={6}
      {...props}
    />
  );
}
