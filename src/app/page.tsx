"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaGitAlt, } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiReact, SiNextdotjs, SiSupabase} from "react-icons/si";
import { HiOutlineArrowNarrowRight, HiX, HiMenu } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const customStyles = `
  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #8B5CF6, #3B82F6);
  }

  .glass-effect {
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

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
    sobre: useRef<HTMLDivElement>(null),
    tecnologias: useRef<HTMLDivElement>(null),
    experiencia: useRef<HTMLDivElement>(null),
    projetos: useRef<HTMLDivElement>(null),
    contato: useRef<HTMLDivElement>(null),
  };

  // Dados
  const experiences: Experience[] = [
    {
      title: "Data Engineer",
      company: "GoVendas",
      period: "2025 - presente",
      description:
        "Criação de dashboards a partir de bancos de dados para melhor visualização de consultas.",
    },
  ];

  const projects: Project[] = [
    {
      id: "ecommerce",
      title: "E-commerce InforMais",
      description:
        "Loja virtual com foco em performance. Implementação de carrinho persistente e checkout otimizado.",
      techs: ["Next.js", "Zustand", "Tailwind CSS"],
      github: "https://github.com/seuusuario/ecommerce",
      link: "https://ecommerce.vercel.app",
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

  return (
    <main className="font-sans relative min-h-screen antialiased text-white">
      <style jsx global>
        {customStyles}
      </style>
      {/* Cursor personalizado - visível apenas em desktop */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-white/20 backdrop-blur-sm hidden md:block"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variants={cursorVariants as any}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black to-neutral-900 z-[-2]" />
      <div className="fixed top-[15%] left-[15%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl z-[-1]" />
      <div className="fixed top-[60%] right-[10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl z-[-1]" />

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
          <Link href="/">
            <span
              className="font-bold text-lg sm:text-xl tracking-tight cursor-pointer transition-colors hover:text-opacity-90"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Gabriel Krishna
              <span className="text-purple-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {Object.keys(sections).map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`text-sm transition-all hover:text-white ${activeSection === section ? "text-white font-medium" : "text-gray-400"}`}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => setMobileMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect border-t border-white/5"
            >
              <nav className="flex flex-col py-4">
                {Object.keys(sections).map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={`px-6 py-3 text-base ${activeSection === section ? "text-white font-medium" : "text-gray-400"} hover:bg-white/5`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
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
        className="min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4 sm:px-6 animate-slide-up"
      >
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-white/5 backdrop-blur-sm mb-6">Desenvolvedor Full-Stack</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Olá, eu sou
            <br />
            Gabriel Krishna
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Criando experiências digitais modernas e minimalistas com foco em performance e usabilidade.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#projetos"
              className="px-6 sm:px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-300"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="px-6 sm:px-8 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/5 transition-colors duration-300"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Contato
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Sobre Section */}
      <section ref={sections.sobre} id="sobre" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <span className="text-sm text-gray-400 font-mono">01.</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 inline-block ml-2">Sobre Mim</h2>

            <div className="grid md:grid-cols-5 gap-6 sm:gap-10">
              <div className="md:col-span-3">
                <p className="text-gray-300 mb-4">
                  Sou um desenvolvedor front-end apaixonado por criar interfaces modernas e minimalistas. Com mais de 5 anos de experiência no
                  desenvolvimento web, tenho trabalhado com React e seus ecossistemas para construir aplicações performáticas e acessíveis.
                </p>
                <p className="text-gray-300 mb-8">
                  Meu foco está em combinar código limpo com design intuitivo, sempre priorizando a experiência do usuário. Acredito que a
                  simplicidade é a chave para interfaces eficientes.
                </p>
              </div>

              <div className="md:col-span-2 relative">
                {/* Container da imagem */}
                <div className="aspect-square rounded-xl overflow-hidden relative border border-white/10 z-10">
                  {/* Fundo + Imagem */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex items-center justify-center text-2xl font-bold">
                    <Image src="/profile/profilepic.jpeg" alt="My picture" fill className="object-cover" />
                  </div>
                </div>

                {/* Borda deslocada para trás */}
                <div className="absolute top-0 left-0 aspect-square w-full rounded-xl border border-white/10 z-0 translate-x-4 translate-y-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tecnologias Section */}
      <section ref={sections.tecnologias} id="tecnologias" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <span className="text-sm text-gray-400 font-mono">02.</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 inline-block ml-2">Tecnologias atuais</h2>
            <p className="text-gray-400 mb-12">
              Tenho domínio em diversas tecnologias modernas que me permitem desenvolver soluções eficientes e de alta performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: <SiTypescript size={28} style={{ color: "#007acc" }} />, name: "TypeScript", desc: "JavaScript but better" },
                { icon: <SiReact size={28} style={{ color: "#61dafb" }} />, name: "React", desc: "JavaScript Library" },
                { icon: <SiNextdotjs size={28} />, name: "NextJS", desc: "React Framework" },
                { icon: <SiTailwindcss size={28} style={{ color: "#06b6d4" }} />, name: "Tailwind", desc: "CSS Framework" },
                { icon: <FaGitAlt size={28} style={{ color: "#f4511e" }} />, name: "Git", desc: "Version Control" },
                { icon: <SiSupabase size={28} style={{ color: "#3ecf8e" }} />, name: "Supabase", desc: "Backend-as-a-service" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 text-white">{tech.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{tech.name}</h3>
                    <p className="text-gray-400 text-xs">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiência Section */}
      <section ref={sections.experiencia} id="experiencia" className="py-16 sm:py-20 px-4 sm:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <span className="text-sm text-gray-400 font-mono">03.</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 inline-block ml-2">Experiência</h2>

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-2" />
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
      <section ref={sections.projetos} id="projetos" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <span className="text-sm text-gray-400 font-mono">04.</span>
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
      <section ref={sections.contato} id="contato" className="py-16 sm:py-20 px-4 sm:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <span className="text-sm text-gray-400 font-mono">05.</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 inline-block ml-2">Contato</h2>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
              Interessado em trabalhar juntos? Entre em contato para discutirmos seu projeto.
            </p>

            <a
              href="mailto:gabrielassisvieira03@gmail.com"
              className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-300 mb-10 break-words max-w-full"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              gabrielassisvieira03@gmail.com
            </a>

            <div className="flex justify-center gap-6">
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 text-center text-sm text-gray-500">
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

              <div className="aspect-video w-full bg-black/50 rounded-lg mb-6 flex items-center justify-center">
                {/* Placeholder para screenshot do projeto */}
                <p className="text-gray-500">Screenshot do projeto</p>
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
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
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
