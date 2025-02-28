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

import LangSelect from "./LangSelect";
import { Logo } from "./Logo";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { t } = useTranslation();

  // const handleDrawerClose = () => {
  //   onClose();
  // };

  return (
    <HStack justify="space-between" py={4}>
      <Logo />
      <HStack
        gap={8}
        justifyContent="flex-end"
        mr={4}
        w="70%"
        display={{ base: "none", lg: "flex" }}
      >
        <Link
          to="/about-us"
          as={RouterLink}
          fontWeight="semibold"
          fontSize="lg"
          color="white"
          _hover=""
        >
          {t("home.whoWeAre")}
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight="semibold"
            fontSize="lg"
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
            <MenuItem as={RouterLink} to="/ai-agents">
              {t("services.services.aiAgents.title")}
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
                to="/ai-agents"
                fontWeight="semibold"
                fontSize="xl"
                _hover=""
                onClick={onClose}
              >
                {t("services.services.aiAgents.title")}
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
              <LangSelect
                display={{ base: "flex", lg: "none" }}
                // onLanguageChange={handleDrawerClose}
              />
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};
