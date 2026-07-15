import { Box, Flex, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
  LuCalendarDays,
  LuCircleDollarSign,
  LuClock,
  LuMonitorPlay,
} from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";

const HIGHLIGHTS = [
  { icon: LuMonitorPlay, label: "Modalidad virtual" },
  { icon: LuCalendarDays, label: "6 encuentros en vivo" },
  { icon: LuClock, label: "Duración estimada: 2 horas por encuentro" },
  { icon: LuCircleDollarSign, label: "Inversión total: USD 1.200" },
];

export const HighlightRow = () => {
  return (
    <Box as="section" position="relative" zIndex={20} mt={-16} px={6}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 4 }}
        spacing={4}
        maxW="7xl"
        mx="auto"
        bg="white"
        p={{ base: 4, lg: 6 }}
        borderRadius="3xl"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="0 30px 60px -30px rgba(15, 23, 42, 0.25)"
      >
        {HIGHLIGHTS.map((item) => (
          <HStack
            key={item.label}
            spacing={4}
            p={4}
            borderRadius="2xl"
            transition="background 0.2s"
            _hover={{ bg: "gray.50" }}
          >
            <Flex
              h={35}
              w={35}
              flexShrink={0}
              align="center"
              justify="center"
              borderRadius="xl"
              bgGradient={GRADIENT_BRAND}
              color="white"
              boxShadow="md"
            >
              <Icon as={item.icon} boxSize={5} />
            </Flex>
            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
              {item.label}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
