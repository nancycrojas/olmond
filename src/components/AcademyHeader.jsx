import { Box, Button, Flex, HStack, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

import image from "../assets/logo_academy.jpg";

const INITIAL_TIME = {
  days: 1,
  hours: 21,
  minutes: 38,
  seconds: 0,
};

export const AcademyHeader = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }

        if (minutes < 0) {
          minutes = 59;
          hours--;
        }

        if (hours < 0) {
          hours = 23;
          days--;
        }

        // Si llega a 0, reiniciar
        if (days < 0) {
          return INITIAL_TIME;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <HStack spacing={2}>
            <Text fontSize="sm" fontWeight="bold">
              ⏰ OFERTA TERMINA EN:
            </Text>
          </HStack>

          <HStack spacing={2}>
            <TimeBox value={timeLeft.days} label="DÍAS" />
            <Text fontWeight="bold">:</Text>
            <TimeBox value={timeLeft.hours} label="HRS" />
            <Text fontWeight="bold">:</Text>
            <TimeBox value={timeLeft.minutes} label="MIN" />
            <Text fontWeight="bold">:</Text>
            <TimeBox value={timeLeft.seconds} label="SEG" />
          </HStack>
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

// eslint-disable-next-line react/prop-types
const TimeBox = ({ value, label }) => {
  return (
    <Flex direction="column" align="center">
      <Box
        bg="white"
        color="black"
        px={3}
        py={2}
        borderRadius="md"
        minW="50px"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold">
          {String(value).padStart(2, "0")}
        </Text>
      </Box>
      <Text fontSize="xs" mt={1}>
        {label}
      </Text>
    </Flex>
  );
};
