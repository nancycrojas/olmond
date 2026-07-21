/* eslint-disable react/prop-types */
import { Flex, Grid, Text } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../../lib/constants.js";

export function Brand({ color = "inherit" }) {
  return (
    <Flex align="center" gap={3} color={color}>
      <Grid
        gridTemplateColumns="repeat(3, 6px)"
        alignItems="end"
        gap="3px"
        w="24px"
        h="27px"
        aria-hidden="true"
      >
        {[14, 21, 27].map((height) => (
          <Text
            key={height}
            as="span"
            display="block"
            h={`${height}px`}
            borderRadius="full"
            bgImage={BRAND_GRADIENT}
          />
        ))}
      </Grid>
      <Text
        fontFamily="heading"
        fontWeight="800"
        letterSpacing=".16em"
        fontSize="sm"
        lineHeight="1"
      >
        OLMOND
        <Text
          as="span"
          display="block"
          mt={1}
          fontSize="8px"
          fontWeight="600"
          letterSpacing=".34em"
          opacity={0.72}
        >
          CONSULTING
        </Text>
      </Text>
    </Flex>
  );
}
