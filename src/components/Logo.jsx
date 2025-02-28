import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export const Logo = () => {
  return (
    <Flex as={Link} to="/" alignItems="center">
      <Image src={logo} alt={logo} h={10} />
    </Flex>
  );
};
