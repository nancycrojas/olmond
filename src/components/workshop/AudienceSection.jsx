import { Flex, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { LiaHandshakeSolid } from "react-icons/lia";
import { LuBuilding2, LuShoppingCart, LuTruck, LuUsers } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const AREAS = [
  { icon: LuBuilding2, name: "Administración" },
  { icon: LuShoppingCart, name: "Compras" },
  { icon: LiaHandshakeSolid, name: "Comercial" },
  { icon: LuTruck, name: "Logística y Depósito" },
  { icon: LuUsers, name: "Capital Humano" },
];

export const AudienceSection = () => {
  return (
    <SectionShell
      eyebrow="Destinatarios"
      title="La capacitación está orientada a colaboradores de las áreas de:"
      intro={
        <Text fontWeight="medium" color="gray.900">
          No se requieren conocimientos técnicos previos.
        </Text>
      }
    >
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 5 }} spacing={4}>
        {AREAS.map((area) => (
          <VStack
            key={area.name}
            spacing={3}
            bg="white"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            textAlign="center"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              borderColor: "brand.500",
              boxShadow: "xl",
            }}
          >
            <Flex
              h={14}
              w={14}
              align="center"
              justify="center"
              borderRadius="2xl"
              bgGradient={GRADIENT_BRAND}
              color="white"
              boxShadow="md"
            >
              <Icon as={area.icon} boxSize={6} />
            </Flex>
            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
              {area.name}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
