import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AcademyFooter } from "@/components/AcademyFooter";
import { AcademyHeader } from "@/components/AcademyHeader";

export const AcademyLayout = () => {
  return (
    <Box bg="white" minH="100vh" display="flex" flexDirection="column">
      <AcademyHeader />
      <Box flex="1">
        <Outlet />
      </Box>
      <AcademyFooter />
    </Box>
  );
};
