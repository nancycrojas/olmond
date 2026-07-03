import {
  HStack,
  //Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
// import { LuCircleCheck } from "react-icons/lu";

import { SectionShell } from "./SectionShell";

const RESULTS = [
  "incorporar IA en su trabajo cotidiano",
  "crear asistentes especializados para sus funciones",
  "reducir tiempos dedicados a tareas repetitivas",
  "mejorar la calidad de documentos y comunicaciones",
  "aprovechar mejor la información disponible en la organización",
  "identificar oportunidades de mejora y automatización de procesos",
  "adoptar la Inteligencia Artificial de manera segura y responsable",
];

export const ExpectedResultsSection = () => {
  return (
    <SectionShell
      eyebrow="Resultados esperados"
      title="Al finalizar el workshop, Distribuidora Mayorista Lagostena contará con colaboradores capaces de:"
      muted
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {RESULTS.map((result, index) => (
          <HStack
            key={index}
            align="flex-start"
            spacing={4}
            bg="white"
            p={5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-2px)",
              borderColor: "brand.500",
              boxShadow: "xl",
            }}
          >
            {/* <Icon
              as={LuCircleCheck}
              boxSize={6}
              flexShrink={0}
              color="brand.500"
            /> */}
            <Text
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="tall"
              color="gray.900"
            >
              {result}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
