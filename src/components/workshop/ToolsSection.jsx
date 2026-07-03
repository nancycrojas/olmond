import {
  Box,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuBot } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const TOOLS = ["ChatGPT", "Claude", "NotebookLM"];

export const ToolsSection = () => {
  return (
    <SectionShell
      eyebrow="Herramientas"
      title="A lo largo de la capacitación se utilizarán distintas herramientas de Inteligencia Artificial Generativa, entre ellas:"
      intro={
        <Text>
          Cada una será presentada según sus fortalezas y casos de uso,
          permitiendo que los participantes comprendan cuándo resulta
          conveniente utilizar una u otra.
        </Text>
      }
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {TOOLS.map((tool) => (
          <VStack
            key={tool}
            spacing={0}
            bg="white"
            p={8}
            borderRadius="3xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            textAlign="center"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-8px)", boxShadow: "xl" }}
          >
            <Flex
              h={16}
              w={16}
              mb={6}
              align="center"
              justify="center"
              borderRadius="2xl"
              bgGradient={GRADIENT_BRAND}
              color="white"
              boxShadow="md"
            >
              <Icon as={LuBot} boxSize={7} />
            </Flex>
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="tight"
              color="gray.900"
            >
              {tool}
            </Heading>
            <Box mt={4} h="1px" w={12} bgGradient={GRADIENT_BRAND} />
          </VStack>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
