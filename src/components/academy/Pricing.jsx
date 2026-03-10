import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowRight, FaCheckCircle, FaClock } from "react-icons/fa";

const INITIAL_TIME = {
  days: 1,
  hours: 21,
  minutes: 38,
  seconds: 0,
};

export const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const whatsappNumber = "5491133872411";
  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero acceder al Pack por solo $29.000 ARS",
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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

  return (
    <Box bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="4xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          <Badge
            bgGradient="linear(to-r, #4318FF, #EC4899)"
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            textTransform="none"
          >
            🎯 Tu Inversión
          </Badge>

          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="black"
              color="gray.900"
              lineHeight="shorter"
            >
              Pasá de &ldquo;probar IA&rdquo; a{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #4318FF, #EC4899)"
                bgClip="text"
              >
                trabajar con IA
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="3xl"
            >
              En vez de sumar herramientas, vas a sumar un sistema para: ahorrar
              tiempo, mejorar entregables y automatizar lo repetitivo.
            </Text>
          </VStack>

          <Box
            bg="white"
            borderRadius="3xl"
            boxShadow="2xl"
            p={{ base: 8, md: 12 }}
            w="full"
            maxW="600px"
            position="relative"
            overflow="hidden"
            border="2px"
            borderColor="purple.200"
          >
            <Box
              position="absolute"
              top={0}
              right={0}
              bgGradient="linear(to-br, #4318FF, #EC4899)"
              color="white"
              px={8}
              py={3}
              fontWeight="black"
              fontSize="lg"
              transform="rotate(45deg) translate(30%, -50%)"
              transformOrigin="center"
              w="200px"
              textAlign="center"
            >
              96% OFF
            </Box>

            <VStack spacing={6}>
              <VStack spacing={2}>
                <Text fontSize="md" color="gray.600">
                  Valor total de todo lo que recibirás:
                </Text>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="gray.400"
                  textDecoration="line-through"
                >
                  $708.000 ARS
                </Text>
              </VStack>

              <VStack spacing={2}>
                <Text fontSize="md" color="gray.700" fontWeight="medium">
                  Tu inversión hoy:
                </Text>
                <HStack spacing={2} align="baseline">
                  <Text
                    fontSize={{ base: "5xl", md: "6xl" }}
                    fontWeight="black"
                    bgGradient="linear(to-r, #4318FF, #EC4899)"
                    bgClip="text"
                  >
                    29.000
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.900">
                    ARS
                  </Text>
                </HStack>
              </VStack>

              <HStack spacing={2} color="green.600">
                <Icon as={FaCheckCircle} />
                <Text fontSize="lg" fontWeight="semibold">
                  Ahorras $679.000 ARS (96% de descuento)
                </Text>
              </HStack>

              <Button
                as="a"
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                bgGradient="linear(to-r, #4318FF, #8B5CF6, #EC4899)"
                color="white"
                w="full"
                py={{ base: 6, md: 8 }}
                px={{ base: 4, md: 6 }}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                fontWeight="black"
                borderRadius="xl"
                rightIcon={<FaArrowRight />}
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "0 20px 40px rgba(67, 24, 255, 0.4)",
                }}
                transition="all 0.3s"
                textTransform="uppercase"
                height="auto"
                whiteSpace="normal"
                textAlign="center"
                lineHeight="1.3"
              >
                <Box as="span" display={{ base: "inline", md: "none" }}>
                  SÍ! QUIERO EL PACK POR $29.000 ARS
                </Box>
                <Box as="span" display={{ base: "none", md: "inline" }}>
                  SÍ! QUIERO ACCEDER AL PACK POR SOLO $29.000 ARS
                </Box>
              </Button>

              <HStack
                spacing={{ base: 2, md: 6 }}
                pt={4}
                flexWrap="wrap"
                justify="center"
              >
                <HStack spacing={2}>
                  <Icon as={FaCheckCircle} color="green.500" />
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Pago 100% seguro
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  {/* <Icon as={FaBolt} color="yellow.500" /> */}
                  {/* <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Acceso inmediato
                  </Text> */}
                </HStack>
              </HStack>
            </VStack>
          </Box>

          <Box
            bgGradient="linear(to-r, #4318FF, #8B5CF6, #EC4899)"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            w="full"
            maxW="600px"
            color="white"
          >
            <VStack spacing={5}>
              <HStack spacing={2}>
                <Icon as={FaClock} boxSize={5} />
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  ⚠️ ATENCIÓN: Solo quedan
                </Text>
              </HStack>

              <HStack spacing={{ base: 2, md: 3 }}>
                <TimeBox value={timeLeft.days} label="días" />
                <Text fontSize="2xl" fontWeight="bold">
                  :
                </Text>
                <TimeBox value={timeLeft.hours} label="hrs" />
                <Text fontSize="2xl" fontWeight="bold">
                  :
                </Text>
                <TimeBox value={timeLeft.minutes} label="min" />
                <Text fontSize="2xl" fontWeight="bold">
                  :
                </Text>
                <TimeBox value={timeLeft.seconds} label="seg" />
              </HStack>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="medium"
                textAlign="center"
              >
                Cuando se acabe la oferta, el precio volverá a{" "}
                <Text as="span" fontWeight="black">
                  $708.000 ARS
                </Text>
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const TimeBox = ({ value, label }) => {
  return (
    <VStack spacing={1}>
      <Box
        bg="whiteAlpha.300"
        backdropFilter="blur(10px)"
        px={{ base: 3, md: 4 }}
        py={{ base: 2, md: 3 }}
        borderRadius="lg"
        minW={{ base: "50px", md: "70px" }}
        textAlign="center"
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black">
          {String(value).padStart(2, "0")}
        </Text>
      </Box>
      <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
        {label}
      </Text>
    </VStack>
  );
};
