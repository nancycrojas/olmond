import { Route, Routes } from "react-router-dom";

import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundLayout } from "@/layouts/NotFoundLayout";
import { NotFound } from "@/pages/NotFound";

import { workshopProposals } from "./data/workshopProposals";
// import { ChatOlmond } from "./components/chat/ChatOlmond";
import { AcademyLayout } from "./layouts/AcademyLayout";
import { DiagnosisLayout } from "./layouts/DiagnosisLayout";
import { WorkshopLayout } from "./layouts/WorkshopLayout";
import { Academy } from "./pages/Academy";
import { Diagnosis } from "./pages/Diagnosis";
import { SocialReview } from "./pages/SocialReview";
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
          <Route
            path="/"
            element={
              <>
                <Home />
                {/* <ChatOlmond /> */}
              </>
            }
          />
        </Route>

        <Route element={<WorkshopLayout />}>
          {workshopProposals.map((proposal) => (
            <Route
              key={proposal.id}
              path={proposal.path}
              element={<Workshop proposal={proposal} />}
            />
          ))}
        </Route>

        <Route element={<DiagnosisLayout />}>
          <Route path="/diagnostico" element={<Diagnosis />} />
        </Route>

        <Route path="/revision-contenido" element={<SocialReview />} />

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
