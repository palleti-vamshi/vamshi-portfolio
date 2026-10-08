import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ResumeModal from './components/Modal/ResumeModal';

import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import ProblemSolving from './sections/ProblemSolving/ProblemSolving';
import Focus from './sections/Focus/Focus';
import ProjectsPreview from './sections/ProjectsPreview/ProjectsPreview';
import SkillsPreview from './sections/SkillsPreview/SkillsPreview';
import Coding from './sections/Coding/Coding';
import AISection from './sections/AISection/AISection';
import Contact from './sections/Contact/Contact';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
  };

  return (
    <>
      {/* Sticky Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onOpenResume={handleOpenResume} />
        <About />
        <ProblemSolving />
        <Focus />
        <ProjectsPreview />
        <SkillsPreview />
        <Coding />
        <AISection />
      </main>

      {/* Contact & System Diagnostics Footer */}
      <Contact onOpenResume={handleOpenResume} />

      {/* Verified Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </>
  );
}
