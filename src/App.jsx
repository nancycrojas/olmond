import { Route, Routes } from "react-router-dom";

import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundLayout } from "@/layouts/NotFoundLayout";
import { NotFound } from "@/pages/NotFound";

import { AcademyLayout } from "./layouts/AcademyLayout";
import { DiagnosisLayout } from "./layouts/DiagnosisLayout";
import { WorkshopLayout } from "./layouts/WorkshopLayout";
import { Academy } from "./pages/Academy";
import { Diagnosis } from "./pages/Diagnosis";
//import { AcademyLogin } from "./pages/AcademyLogin";
//import { CourseDetail } from "./pages/CourseDetail";
//import { Courses } from "./pages/Courses";
//import { Lesson } from "./pages/Lesson";
import { Workshop } from "./pages/Workshop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<WorkshopLayout />}>
          <Route
            path="/propuesta-distribuidora-lagostena"
            element={<Workshop />}
          />
        </Route>

        <Route element={<DiagnosisLayout />}>
          <Route path="/diagnostico" element={<Diagnosis />} />
        </Route>

        <Route element={<AcademyLayout />}>
          <Route path="/academy" element={<Academy />} />
          {/* <Route path="/academy/courses" element={<Courses />} />
          <Route path="/academy/course/:courseId" element={<CourseDetail />} />
          <Route
            path="/academy/course/:courseId/lesson/:lessonId"
            element={<Lesson />}
          />
          <Route path="/academy/login" element={<AcademyLogin />} /> */}
        </Route>

        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
