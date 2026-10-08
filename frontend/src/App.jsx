import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ResumeModal from './components/Modal/ResumeModal';
import FloatingAIChat from './components/Chat/FloatingAIChat';

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Sticky Navigation */}
      <Navbar onOpenResume={handleOpenResume} onOpenChat={handleOpenChat} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onOpenResume={handleOpenResume} onOpenChat={handleOpenChat} />
        <About />
        <ProblemSolving />
        <Focus />
        <ProjectsPreview />
        <SkillsPreview />
        <Coding />
        <AISection onOpenChat={handleOpenChat} />
      </main>

      {/* Contact & System Diagnostics Footer */}
      <Contact onOpenResume={handleOpenResume} />

      {/* Verified Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />

      {/* Distinctive Floating Vamshi AI Character & Modal Popover */}
      <FloatingAIChat
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
        onClose={handleCloseChat}
      />
    </>
  );
}
