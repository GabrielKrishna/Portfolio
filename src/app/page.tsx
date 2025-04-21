"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaFile, FaGithub, FaLinkedin, FaJava, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiReact, SiNextdotjs, SiSpring, SiPython, SiPostgresql, SiSupabase } from "react-icons/si";
import { HiOutlineArrowNarrowRight, HiX, HiMenu } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  techs: string[];
  github: string;
  link: string;
  image?: string;
  featured?: boolean;
};

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs para cada seção
  const sections = {
    home: useRef<HTMLDivElement>(null),
    experiencia: useRef<HTMLDivElement>(null),
    projetos: useRef<HTMLDivElement>(null),
    contato: useRef<HTMLDivElement>(null),
  };

  // Dados
  const experiences: Experience[] = [
    {
      title: "Data Engineer",
      company: "GoVendas",
      period: "set 2024 - presente",
      description: "Criação de dashboards para visualização de dados, job para automatização de consultas e pré-processamento de dados.",
    },
    {
      title: "Desenvolvedor Web",
      company: "Universidade Federal de Jataí",
      period: "ago 2024 - dez 2024",
      description:
        "Desenvolvimento de uma aplicação web Full-Stack com objetivo de automatizar o processo de criação de calendários acadêmicos dentro da Universidade Federal de Jataí.",
    },
    {
      title: "Desenvolvedor de Software",
      company: "GoVendas",
      period: "set 2023 - fev 2024",
      description:
        "Desenvolvimento de uma aplicação desktop voltada para a transformação de dados vindos de banco de dados, encaminhados para um processamento com inteligência artificial.",
    },
  ];

  const projects: Project[] = [
    {
      id: "ecommerce",
      title: "E-commerce InforMais",
      description: "Loja virtual com foco em performance. Implementação de carrinho persistente e checkout otimizado.",
      techs: ["Next.js", "Zustand", "Tailwind CSS"],
      github: "https://github.com/gabrielkrishna",
      link: "https://gabrielkrishna.vercel.app",
      featured: true,
    },
  ];

  // Controlar posição do mouse para o cursor personalizado
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sections]);

  // Controlar seção ativa no scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sections).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const height = ref.current.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionName);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Variantes de animação para o cursor personalizado
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
    },
  };

  // Efeito de entrada para elementos
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  return (
    <main className="font-sans relative min-h-screen antialiased text-white">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-white/20 backdrop-blur-sm hidden md:block"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variants={cursorVariants as any}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-neutral-900 z-[-2]" />
      <div className="fixed top-[15%] left-[15%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-3xl z-[-1]" />
      <div className="fixed top-[60%] right-[10%] w-[300px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-3xl z-[-1]" />

      {/* Grain texture */}
      <div
        className="fixed inset-0 z-[-1] opacity-30 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            className="font-bold text-lg sm:text-xl tracking-tight cursor-pointer transition-colors hover:text-opacity-90"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => {
              const targetEl = document.getElementById("home");
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              history.replaceState(null, "", window.location.pathname);
            }}
          >
            GK
            <span className="text-purple-400">.</span>
          </button>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                className={`text-sm transition-all hover:text-white ${
                  activeSection === section ? "text-white font-medium" : "text-gray-400"
                } cursor-pointer`}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => {
                  const targetEl = document.getElementById(section);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  history.replaceState(null, "", window.location.pathname);
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence
          onExitComplete={() => {
            if (scrollTarget) {
              const targetEl = document.getElementById(scrollTarget);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setScrollTarget(null);
            }
          }}
        >
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-black/0 backdrop-blur-md"
            >
              <nav className="flex flex-col py-4">
                {Object.keys(sections).map((section) => (
                  <button
                    key={section}
                    className={`px-6 py-3 text-base ${
                      activeSection === section ? "text-white font-medium" : "text-gray-400"
                    } hover:bg-white/5 text-left cursor-pointer`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setScrollTarget(section);
                      history.replaceState(null, "", window.location.pathname);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        ref={sections.home}
        id="home"
        className="min-h-screen flex items-center pt-20 pb-28 sm:pb-20 px-6 sm:px-8 md:px-10 lg:px-12 animate-slide-up"
      >
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div className="text-center md:text-left">
            <span className="inline-block py-1 px-4 rounded-full text-xs font-medium bg-white/5 backdrop-blur-sm mb-4">
              Desenvolvedor Full-Stack e Engenheiro de Dados
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text leading-tight mb-6">
              Olá, eu sou <br /> Gabriel Krishna
            </h1>
            <p className="text-lg sm:text-xl text-[var(--foreground)] mb-4">
              Desenvolvedor full-stack e engenheiro de dados com 2 anos de experiência. Focado em entregar soluções que funcionam de verdade.
            </p>
            <p className="text-base text-gray-400 mb-6">Trabalho principalmente com React, Next.js, TypeScript, Tailwind CSS, Python e Java.</p>
            <p className="text-base text-gray-400 mb-8">📍 Brasil 🇧🇷</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button
                className="px-6 py-3 rounded-full bg-gray-200 text-black font-medium hover:bg-white transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => {
                  const targetEl = document.getElementById("projetos");
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  history.replaceState(null, "", window.location.pathname);
                }}
              >
                Ver projetos
              </button>

              <button
                className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors duration-300 text-white cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => {
                  const targetEl = document.getElementById("contato");
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  history.replaceState(null, "", window.location.pathname);
                }}
              >
                Contato
              </button>
            </div>
          </div>

          {/* Imagem e Ícones */}
          <div className="flex flex-col items-center md:items-end gap-6">
            {/* Imagem com bordas */}
            <div className="relative w-75 aspect-square z-10">
              {/* Imagem com gradiente */}
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 z-20">
                <Image src="/profile/profile.jpg" alt="Minha foto" fill className="object-cover z-0" />
              </div>

              {/* Borda deslocada */}
              <div className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/20 translate-x-4 translate-y-4 z-0" />
            </div>

            {/* Ícones */}
            <div className="flex items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-white/10 transition-colors duration-300 text-gray-400 hover:text-white"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <FaFile /> Curriculo
              </a>
              <a
                href="mailto:gabrielassisvieira03@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://github.com/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Tecnologias Section */}
      <section id="tecnologias" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 inline-block ml-2">Tecnologias atuais</h2>
            <p className="text-gray-400 mb-12">
              Tenho domínio em diversas tecnologias modernas que me permitem desenvolver soluções eficientes e de alta performance.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: <SiTypescript className="w-7 h-7" style={{ color: "#007acc" }} />, name: "TypeScript", desc: "JavaScript Superset" },
                { icon: <SiReact className="w-7 h-7" style={{ color: "#61dafb" }} />, name: "React", desc: "JavaScript Library" },
                { icon: <SiNextdotjs className="w-7 h-7" />, name: "Next.Js" },
                { icon: <SiTailwindcss className="w-7 h-7" style={{ color: "#06b6d4" }} />, name: "Tailwind CSS" },
                { icon: <FaJava className="w-7 h-7" style={{ color: "#f44336" }} />, name: "Java" },
                { icon: <SiSpring className="w-7 h-7" style={{ color: "#6db33f" }} />, name: "Spring" },
                { icon: <SiPython className="w-7 h-7" style={{ color: "#ffcf3f" }} />, name: "Python" },
                { icon: <SiPostgresql className="w-7 h-7" style={{ color: "#336791" }} />, name: "PostgreSQL" },
                { icon: <FaGitAlt className="w-7 h-7" style={{ color: "#f4511e" }} />, name: "Git" },
                { icon: <SiSupabase className="w-7 h-7" style={{ color: "#3ecf8e" }} />, name: "Supabase" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 text-white flex-shrink-0">{tech.icon}</div>
                  <div className="flex items-center">
                    <h3 className="text-white font-semibold text-sm mb-0">{tech.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiência Section */}
      <section ref={sections.experiencia} id="experiencia" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 inline-block ml-2">Experiência</h2>

            <div>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-white/30 py-8 sm:py-12"
                >
                  <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-14" />
                  <h3 className="text-lg sm:text-xl font-medium">{exp.title}</h3>
                  <p className="text-purple-300 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projetos Section */}
      <section ref={sections.projetos} id="projetos" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 inline-block ml-2">Projetos</h2>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group cursor-pointer relative overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/20 bg-white/5 backdrop-blur-sm hover:scale-[1.02] duration-300 ${
                    project.featured ? "sm:col-span-2" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                      </div>

                      <div className="text-white/40 group-hover:text-white/80 transition-colors">
                        <HiOutlineArrowNarrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech) => (
                        <span key={tech} className="text-xs py-1 px-2 rounded-full bg-white/5 text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato Section */}
      <section ref={sections.contato} id="contato" className="py-20 px-4 sm:px-6 bg-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Interessado em trabalhar juntos?</h2>

            <a
              href="mailto:gabrielassisvieira03@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-black font-medium hover:bg-white transition-colors duration-300 mb-10"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <FaEnvelope className="text-black" /> Entre em Contato
            </a>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 text-center text-sm text-gray-500 bg-black/20">
        <p>© {new Date().getFullYear()} Gabriel Krishna. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido com Next.js, Tailwind e Framer Motion</p>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <button onClick={() => setSelectedProject(null)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black/50 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <Image src="/projects/InforMais.jpeg" alt="Screenshot do projeto" width={1280} height={720} className="object-cover w-full h-full" />
              </div>

              <p className="mb-6 text-gray-300">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-sm uppercase text-gray-400 mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techs.map((tech) => (
                    <span key={tech} className="text-xs py-1 px-3 rounded-full bg-white/5 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FaGithub /> <span>Ver código</span>
                </a>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-white transition-colors"
                >
                  <HiOutlineArrowNarrowRight /> <span>Visitar site</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
