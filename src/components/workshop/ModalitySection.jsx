import { Flex, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { LuCalendarDays, LuClock, LuMonitorPlay } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const MODALITY_ITEMS = [
  { icon: LuMonitorPlay, title: "Modalidad virtual" },
  { icon: LuCalendarDays, title: "6 encuentros en vivo" },
  { icon: LuClock, title: "Duración estimada: 2 horas por encuentro" },
];

export const ModalitySection = () => {
  return (
    <SectionShell
      eyebrow="Modalidad"
      title="Formato pensado para equipos en actividad"
      muted
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {MODALITY_ITEMS.map((item) => (
          <VStack
            key={item.title}
            align="flex-start"
            spacing={5}
            bg="white"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
          >
            <Flex
              h={12}
              w={12}
              align="center"
              justify="center"
              borderRadius="xl"
              bgGradient={GRADIENT_BRAND}
              color="white"
              boxShadow="md"
            >
              <Icon as={item.icon} boxSize={5} />
            </Flex>
            <Text fontSize="lg" fontWeight="semibold" color="gray.900">
              {item.title}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
