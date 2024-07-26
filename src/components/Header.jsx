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
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import logo from "../assets/logo.png";
import LangSelect from "./LangSelect";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { t } = useTranslation();

  return (
    <HStack justify="space-between" p={4}>
      <Link to="/" as={RouterLink}>
        <Image
          src={logo}
          alt="logo"
          boxSize={{ base: "45%", md: "25%", lg: "55%" }}
        />
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
          {t("home.whoWeAre")}
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
            {t("home.services")}
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/rpa">
              RPA
            </MenuItem>
            <MenuItem as={RouterLink} to="/chat-bot">
              ChatBot
            </MenuItem>
            <MenuItem as={RouterLink} to="/data-analytics">
              Data Analytics
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <LangSelect display={{ base: "none", lg: "flex" }} />

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
          <DrawerHeader>{t("menu")}</DrawerHeader>
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
                {t("home.whoWeAre")}
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
                to="/data-analytics"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                Data Analytics
              </Link>
              <LangSelect display={{ base: "flex", lg: "none" }} />
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};
