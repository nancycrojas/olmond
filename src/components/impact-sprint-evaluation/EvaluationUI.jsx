/* eslint-disable react/prop-types */
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";

export function OptionCard({
  value,
  selectedValue,
  title,
  description,
  children,
}) {
  const isSelected = value === selectedValue;

  return (
    <Flex
      as="label"
      align="center"
      gap={4}
      w="full"
      minH="92px"
      px={{ base: 5, md: 6 }}
      py={4}
      cursor="pointer"
      border="1px solid"
      borderColor={isSelected ? "#6679FF" : "#DCE3EA"}
      borderRadius="14px"
      bg={isSelected ? "#F3F5FF" : "#F7FAFC"}
      boxShadow={isSelected ? "0 0 0 4px rgba(102,121,255,0.08)" : "none"}
      transition="all 0.2s ease"
      _hover={{
        borderColor: isSelected ? "#6679FF" : "#BFC8D4",
      }}
    >
      {children}

      <Box>
        <Text
          fontSize={{ base: "md", md: "17px" }}
          fontWeight="700"
          color="#202330"
        >
          {title}
        </Text>

        <Text mt={1} fontSize="sm" lineHeight="1.5" color="gray.500">
          {description}
        </Text>
      </Box>
    </Flex>
  );
}

export function QuestionHeader({ eyebrow, title, description }) {
  return (
    <Box>
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="purple.600"
      >
        {eyebrow}
      </Text>

      <Heading
        as="h3"
        mt={4}
        fontSize={{
          base: "30px",
          md: "40px",
        }}
        lineHeight="1.08"
        letterSpacing="-0.045em"
        fontWeight="500"
        color="#171923"
      >
        {title}
      </Heading>

      <Text
        mt={3}
        maxW="860px"
        fontSize={{ base: "md", md: "18px" }}
        lineHeight="1.7"
        color="gray.600"
      >
        {description}
      </Text>
    </Box>
  );
}

export function ConditionCard({ valid, children }) {
  return (
    <HStack
      minH="58px"
      px={4}
      py={3}
      spacing={2.5}
      bg="#F7FAFC"
      border="1px solid"
      borderColor="#DCE3EA"
      borderRadius="12px"
    >
      <Text
        flexShrink={0}
        fontSize="lg"
        fontWeight="700"
        color={valid ? "green.500" : "orange.500"}
      >
        {valid ? "✓" : "–"}
      </Text>

      <Text fontSize="sm" fontWeight="600" color="gray.600">
        {children}
      </Text>
    </HStack>
  );
}
