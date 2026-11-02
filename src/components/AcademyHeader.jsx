import { Box, Button, Flex, HStack, Image, Link, Text } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

import image from "../assets/logo_academy.jpg";

export const AcademyHeader = () => {
  const whatsappNumber = "5491133872411"; // Reemplaza con tu número (incluye código de país sin +)
  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero información sobre Olmond Academy",
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const instagramURL = "https://instagram.com/olmond.academy";

  return (
    <Box position="sticky" top={0} zIndex={1000}>
      <Box bgGradient="linear(to-r, #4318FF, #8B5CF6, #EC4899)" py={3} px={4}>
        <Flex
          maxW="7xl"
          mx="auto"
          align="center"
          justify="center"
          color="white"
          gap={4}
          flexWrap="wrap"
        >
          <Text fontSize="sm" fontWeight="bold" textAlign="center">
            Formación práctica en IA para profesionales y equipos
          </Text>
        </Flex>
      </Box>

      {/* Header principal */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200" py={4} px={4}>
        <Flex
          maxW="7xl"
          mx="auto"
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap={4}
        >
          <HStack spacing={3}>
            <Box p={2}>
              <Image
                src={image}
                alt="Olmond Academy"
                boxSize={"50px"}
                objectFit="cover"
                borderRadius="2xl"
              />
            </Box>

            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Olmond Academy
            </Text>
          </HStack>

          <HStack spacing={4}>
            <Link
              href={instagramURL}
              isExternal
              _hover={{ textDecoration: "none" }}
              display={{ base: "none", sm: "flex" }}
            >
              <HStack
                spacing={2}
                color="gray.600"
                _hover={{
                  color: "purple.500",
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s"
              >
                <FaInstagram size={18} />
                <Text fontSize="sm" fontWeight="medium">
                  olmond.academy
                </Text>
              </HStack>
            </Link>

            <Button
              as="a"
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              color="white"
              size={{ base: "sm", md: "md" }}
              borderRadius="full"
              px={{ base: 6, md: 8 }}
              fontWeight="bold"
              _hover={{
                bgGradient: "linear(to-r, #764ba2, #667eea)",
                transform: "scale(1.05)",
              }}
              transition="all 0.3s"
            >
              Comprar Ahora
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
