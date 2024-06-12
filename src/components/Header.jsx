import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import logo from "../assets/logo.png";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <HStack justify="space-between" gap={8} p={4}>
      <Link to="/" as={RouterLink}>
        <Image src={logo} alt="logo" boxSize={{ base: "40%", md: "55%" }} />
      </Link>
      <HStack
        gap={8}
        justifyContent="flex-end"
        mr={4}
        w="100%"
        display={{ base: "none", lg: "flex" }}
      >
        <Link
          to="/about-us"
          as={RouterLink}
          fontWeight="semibold"
          fontSize="xl"
          color="white"
          _hover=""
        >
          Quienes somos
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight="semibold"
            fontSize="xl"
            color="white"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            rightIcon={<ChevronDownIcon />}
          >
            Servicios
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/rpa">
              RPA
            </MenuItem>
            <MenuItem as={RouterLink} to="/chat-bot">
              ChatBot
            </MenuItem>
            <MenuItem as={RouterLink} to="/data-analyst">
              Data Analyst
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Stack display={{ base: "none", lg: "flex" }}>
        <Link href="https://wa.me/541133872411" isExternal _hover="">
          <Button
            variant="outline"
            size="lg"
            color="white"
            bgGradient="linear(to-r, #1a3a35, #256a60)"
            _hover={{ bgGradient: "linear(to-r, #1a3a35, #256a60)" }}
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
        ref={btnRef}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.200">
          <DrawerCloseButton />
          <DrawerHeader>Menú</DrawerHeader>
          <DrawerBody>
            <Stack gap={8} w="100%">
              <Link
                as={RouterLink}
                to="/about-us"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                Quienes somos
              </Link>
              <Link
                as={RouterLink}
                to="/rpa"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                RPA
              </Link>
              <Link
                as={RouterLink}
                to="/chat-bot"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                ChatBot
              </Link>
              <Link
                as={RouterLink}
                to="/data-analyst"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                Data Analyst
              </Link>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};
