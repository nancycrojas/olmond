import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaAward,
  FaBriefcase,
  FaGraduationCap,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

import image from "../../assets/patricio-rouan.png";

export const InstructorSection = () => {
  return (
    <Container maxW="6xl" py={{ base: 12, md: 16 }}>
      <VStack spacing={{ base: 8, md: 10 }}>
        <Badge
          bgGradient="linear(to-r, #667eea, #EC4899)"
          color="white"
          px={4}
          py={2}
          borderRadius="full"
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="bold"
          textTransform="none"
        >
          👨‍🏫 Tu Profesor
        </Badge>

        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="black"
          color="gray.900"
          textAlign="center"
        >
          Conocé a{" "}
          <Box
            as="span"
            bgGradient="linear(to-r, #667eea, #EC4899)"
            bgClip="text"
          >
            Patricio Rouan
          </Box>
        </Heading>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 12 }}
          alignItems="center"
          w="full"
        >
          {/* Imagen */}
          <Box position="relative">
            <Box
              bgGradient="linear(to-br, #667eea, #EC4899)"
              borderRadius="3xl"
              p={1}
              maxW={{ base: "280px", md: "350px" }}
              mx="auto"
            >
              <Box
                bgGradient="linear(to-br, #667eea, #EC4899)"
                borderRadius="3xl"
                overflow="hidden"
                position="relative"
              >
                <Box
                  h={{ base: "300px", md: "400px" }}
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={image}
                    boxSize={{ base: "300px", md: "400px" }}
                    objectFit="cover"
                    borderRadius="2xl"
                  />
                </Box>

                <HStack
                  position="absolute"
                  bottom={4}
                  left={4}
                  bg="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  boxShadow="lg"
                  spacing={2}
                >
                  <Box
                    bgGradient="linear(to-br, #667eea, #764ba2)"
                    p={2}
                    borderRadius="full"
                  >
                    <Icon as={FaUserGraduate} color="white" boxSize={4} />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="sm" fontWeight="bold" color="gray.900">
                      +2000
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Alumnos
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </Box>

          {/* Credenciales */}
          <VStack spacing={4} align="start">
            <CredentialItem
              icon={FaAward}
              text="Asesor Principal en SAIA (Sociedad Argentina de Inteligencia Artificial)"
            />
            <CredentialItem
              icon={FaBriefcase}
              text="Consultor en IA y automatización con +20 empresas impulsadas"
            />
            <CredentialItem
              icon={FaGraduationCap}
              text="Profesor de IA aplicada en UTN, UBA y UNSAM"
            />
            <CredentialItem
              icon={FaUsers}
              text="+2000 profesionales formados en IA"
            />

            <Box pt={4} pl={4}>
              <VStack spacing={2} align="start">
                <HStack spacing={2}>
                  <Box w="6px" h="6px" bg="purple.500" borderRadius="full" />
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                    Profesor en Subsecretaría de desarrollo de San Martín
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Box w="6px" h="6px" bg="purple.500" borderRadius="full" />
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                    Tutor de posgrado sobre management con IA en UCEMA
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Box w="6px" h="6px" bg="purple.500" borderRadius="full" />
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                    +15 años emprendiendo con pasión por la tecnología
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
const CredentialItem = ({ icon, text }) => {
  return (
    <HStack
      spacing={3}
      bg="white"
      p={4}
      borderRadius="xl"
      border="2px"
      borderColor="purple.100"
      _hover={{
        borderColor: "purple.300",
        transform: "translateX(8px)",
      }}
      transition="all 0.3s"
      w="full"
    >
      <Box bgGradient="linear(to-br, #667eea, #764ba2)" p={3} borderRadius="lg">
        <Icon as={icon} color="white" boxSize={5} />
      </Box>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="gray.700"
        fontWeight="medium"
        flex={1}
      >
        {text}
      </Text>
    </HStack>
  );
};
