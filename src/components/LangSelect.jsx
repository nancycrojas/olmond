/* eslint-disable react/prop-types */
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const langs = ["en", "es"];

export default function LangSelect({
  display,
  // onLanguageChange
}) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // if (onLanguageChange) {
    //   onLanguageChange();
    // }
  };

  return (
    <HStack alignItems="center" display={display}>
      <Menu>
        <MenuButton
          rounded="full"
          as={Button}
          leftIcon={<MdLanguage size={22} />}
          px={6}
        >
          {t(i18n.resolvedLanguage)}
        </MenuButton>
        <MenuList>
          {langs.map((lang) => (
            <MenuItem key={lang} onClick={() => changeLanguage(lang)}>
              {t(lang)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
}
