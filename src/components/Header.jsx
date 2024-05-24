import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack justify="space-between" gap={8} p={4}>
      <Link to="/" as={RouterLink} color="white" _hover="">
        <Heading size="md">
          Olmond <br></br>Consulting
        </Heading>
      </Link>
      <HStack
        gap={8}
        justifyContent="flex-end"
        mr={4}
        w="100%"
        display={{ base: "none", lg: "flex" }}
      >
        <Link
          href="#about"
          fontWeight="semibold"
          fontSize="xl"
          color="white"
          _hover=""
        >
          Quienes somos
        </Link>
        <Link
          href="#services"
          fontWeight="semibold"
          fontSize="xl"
          color="white"
          _hover=""
        >
          Servicios
        </Link>
      </HStack>
      <Stack display={{ base: "none", lg: "flex" }}>
        <Link href="#contact" _hover="">
          <Button
            variant="outline"
            size="lg"
            color="white"
            bgGradient="linear(to-r, #014643, #014643)"
            _hover={{ bgGradient: "linear(to-r, #014643,#014643)" }}
            rightIcon={<FaLongArrowAltRight />}
          >
            Habla con nosotros
          </Button>
        </Link>
      </Stack>

      <IconButton
        onClick={onOpen}
        icon={<HamburgerIcon size={20} />}
        display={{ base: "flex", lg: "none" }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.200">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack gap={8} w="100%">
              <Link href="#about" fontWeight="semibold" fontSize="xl" _hover="">
                Quienes somos
              </Link>
              <Link
                href="#services"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
              >
                Servicios
              </Link>
              <Link href="#contact" _hover="">
                <Button
                  variant="outline"
                  size="lg"
                  color="white"
                  bgGradient="linear(to-r, #014643, #014643)"
                  _hover={{ bgGradient: "linear(to-r, #014643,#014643)" }}
                  rightIcon={<FaLongArrowAltRight />}
                >
                  Habla con nosotros
                </Button>
              </Link>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};
