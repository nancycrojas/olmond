import { Route, Routes } from "react-router-dom";

import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundLayout } from "@/layouts/NotFoundLayout";
import { NotFound } from "@/pages/NotFound";

import { AcademyLayout } from "./layouts/AcademyLayout";
import { Academy } from "./pages/Academy";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AcademyLayout />}>
          <Route path="/academy" element={<Academy />} />
        </Route>

        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
