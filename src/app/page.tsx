"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaFile, FaGithub, FaLinkedin, FaJava, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiReact, SiNextdotjs, SiSpring, SiPython, SiPostgresql, SiSupabase } from "react-icons/si";
import { HiMenu, HiExternalLink, HiX } from "react-icons/hi";
import { MdHome, MdWork, MdFolder, MdBuild, MdEdit } from "react-icons/md";
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
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = {
    home: useRef<HTMLDivElement>(null),
    tecnologias: useRef<HTMLDivElement>(null),
    experiencia: useRef<HTMLDivElement>(null),
    projetos: useRef<HTMLDivElement>(null),
    contato: useRef<HTMLDivElement>(null),
  };

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
      image: "/projects/InforMais.jpeg",
      featured: true,
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Tracks how much of each section is visible to find the "most visible" one
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Pick the section with the highest intersection ratio
        let maxRatio = 0;
        let mostVisible = "";
        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        if (mostVisible) setActiveSection(mostVisible);
      },
      {
        // Multiple thresholds for finer granularity
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        rootMargin: "-60px 0px 0px 0px",
      },
    );

    Object.entries(sections).forEach(([, ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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
      backgroundColor: "rgba(232, 105, 74, 0.1)",
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  // Mapeamento de seções para ícones
  const navItems = [
    { key: "home", icon: <MdHome className="w-5 h-5" />, label: "Início" },
    { key: "tecnologias", icon: <MdBuild className="w-5 h-5" />, label: "Tecnologias" },
    { key: "experiencia", icon: <MdWork className="w-5 h-5" />, label: "Experiência" },
    { key: "projetos", icon: <MdFolder className="w-5 h-5" />, label: "Projetos" },
    { key: "contato", icon: <MdEdit className="w-5 h-5" />, label: "Contato" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", window.location.pathname);
  };

  return (
    <main className="font-sans relative min-h-screen antialiased text-[var(--foreground)]">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[60] border border-[var(--primary)]/30 hidden md:block"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variants={cursorVariants as any}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Background */}
      <div className="fixed inset-0 bg-[var(--background)] z-[-1]" />

      {/* ── HEADER: dock centralizado ── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
        {/* Desktop dock */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#2a2a2a] border border-white/[0.08]">
          {navItems.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer
                ${
                  activeSection === key
                    ? "text-[var(--primary)] bg-white/[0.07]"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/[0.05]"
                }`}
            >
              {icon}

              {/* Label tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[#2a2a2a] border border-white/[0.08] text-[10px] text-[var(--foreground-muted)] whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none">
                {label}
              </span>

              {activeSection === key && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)]" />}
            </button>
          ))}
        </nav>

        {/* Mobile: botão hamburguer à direita */}
        <div className="pointer-events-auto md:hidden absolute right-4 top-0">
          <button
            className="p-2.5 rounded-xl bg-[#2a2a2a] border border-white/[0.08]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      <AnimatePresence
        onExitComplete={() => {
          if (scrollTarget) {
            scrollTo(scrollTarget);
            setScrollTarget(null);
          }
        }}
      >
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 right-4 z-40 bg-[#2a2a2a] border border-white/[0.08] rounded-xl overflow-hidden"
          >
            {navItems.map(({ key, icon, label }) => (
              <button
                key={key}
                className={`flex items-center gap-3 w-full px-5 py-3 text-sm transition-colors
                  ${activeSection === key ? "text-[var(--primary)]" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setScrollTarget(key);
                }}
              >
                {icon} {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={sections.home} id="home" className="min-h-screen flex items-center pt-24 pb-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-10"
        >
          {/* Texto */}
          <div className="flex-1">
            <p className="text-[var(--foreground-muted)] text-sm mb-4 tracking-wide">Engenheiro de Dados & Desenvolvedor Full-Stack</p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--foreground)] leading-[1.1] mb-6">
              Gabriel
              <br />
              <span className="text-[var(--primary)]">Krishna</span>
            </h1>

            <p className="text-[var(--foreground-muted)] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              2 anos de experiência transformando dados em soluções — pipelines, dashboards e automações com Python e SQL no dia a dia. Nos projetos paralelos, React, Next.js, TypeScript e Java.
            </p>

            <p className="text-[var(--foreground-muted)] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">📍 Brasil</p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => scrollTo("projetos")}
              >
                Ver projetos
              </button>
              <button
                className="px-5 py-2.5 rounded-lg border border-white/[0.12] text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-white/20 transition-all cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => scrollTo("contato")}
              >
                Contato
              </button>
            </div>
          </div>

          {/* Foto + links sociais */}
          <div className="flex flex-col items-center gap-4 shrink-0 self-center md:self-auto p-4 rounded-2xl border border-[var(--primary)]/20">
            {/* Foto */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60">
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/[0.1]">
                <Image src="/profile/profile.jpg" alt="Gabriel Krishna" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 rounded-xl border border-white/[0.08] translate-x-3 translate-y-3 -z-10" />
            </div>

            {/* Links sociais — abaixo da foto */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#2a2a2a] border border-white/[0.08]">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-white/[0.1] hover:border-white/20 rounded-md px-3 py-1.5 transition-all"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <FaFile className="w-3 h-3" /> Currículo
              </a>
              <a
                href="mailto:gabrielassisvieira03@gmail.com"
                className="flex items-center justify-center w-8 h-8 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="Email"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TECNOLOGIAS ── */}
      <section ref={sections.tecnologias} id="tecnologias" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Tecnologias</h2>
            <p className="text-base text-[var(--foreground-muted)] mb-8">Stack de desenvolvimento.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { icon: <SiTypescript className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "TypeScript" },
                { icon: <SiReact className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "React" },
                { icon: <SiNextdotjs className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Next.js" },
                { icon: <SiTailwindcss className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Tailwind" },
                { icon: <FaJava className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Java" },
                { icon: <SiSpring className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Spring" },
                { icon: <SiPython className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Python" },
                { icon: <SiPostgresql className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "PostgreSQL" },
                { icon: <FaGitAlt className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Git" },
                { icon: <SiSupabase className="w-5 h-5" style={{ color: "#e8694a" }} />, name: "Supabase" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                >
                  {tech.icon}
                  <span className="text-sm text-[var(--foreground)]">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIÊNCIA ── */}
      <section ref={sections.experiencia} id="experiencia" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Experiência</h2>
            <p className="text-base text-[var(--foreground-muted)] mb-8">Onde trabalhei até agora.</p>

            <div className="flex flex-col gap-3">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--primary)]/25 px-5 py-4 transition-all duration-300"
                >
                  <p className="text-xs text-[var(--foreground-muted)] tabular-nums">{exp.period}</p>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">{exp.title}</h3>
                    <p className="text-xs text-[var(--primary)] mb-2 font-medium">{exp.company}</p>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJETOS ── */}
      <section ref={sections.projetos} id="projetos" className="py-16 sm:py-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Projetos</h2>
            <p className="text-base text-[var(--foreground-muted)] mb-8">Alguns dos projetos que desenvolvi.</p>

            <div className="flex flex-col gap-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--primary)]/25 px-5 py-4 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  {project.image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-black/30">
                      <Image src={project.image} alt={project.title} width={80} height={80} className="object-cover w-full h-full" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">{project.title}</h3>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techs.map((tech) => (
                        <span key={tech} className="text-xs py-0.5 px-2.5 rounded-full border border-white/[0.08] text-[var(--foreground-muted)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icon buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver código no GitHub"
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-white/20 transition-all"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visitar site"
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <HiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section ref={sections.contato} id="contato" className="py-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Contato</h2>
            <p className="text-base text-[var(--foreground-muted)] mb-8">Interessado em trabalhar juntos? Me manda uma mensagem.</p>

            <a
              href="mailto:gabrielassisvieira03@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity mb-10"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <FaEnvelope /> Entre em Contato
            </a>

            <div className="flex gap-5">
              <a
                href="https://github.com/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="GitHub"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/GabrielKrishna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="LinkedIn"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 text-center text-xs text-[var(--foreground-muted)]">
        <div className="max-w-3xl mx-auto border-t border-white/[0.06] pt-8">
          <p>© {new Date().getFullYear()} Gabriel Krishna. Todos os direitos reservados.</p>
          <p className="mt-1.5">Desenvolvido com Next.js, Tailwind e Framer Motion</p>
        </div>
      </footer>
    </main>
  );
}
