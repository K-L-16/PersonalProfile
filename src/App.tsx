import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Code2, Database, Server, Layout, Terminal } from 'lucide-react';

// --- Theme Context ---
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Components ---

const SectionHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.h2
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="text-3xl font-bold tracking-tight mb-8"
  >
    {children}
  </motion.h2>
);

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="w-full px-6 md:px-20 h-16 flex items-center justify-between">
        <a href="#" className="font-mono font-bold text-shadow-lg tracking-tighter">
          KL<span className="text-[var(--muted)]">_</span>
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium text-[var(--muted)]">
            <a href="#about" className="hover:text-[var(--fg)] transition-colors">About</a>
            <a href="#skills" className="hover:text-[var(--fg)] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[var(--fg)] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[var(--fg)] transition-colors">Contact</a>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[var(--border)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          Hello !
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          I'm  Kevin  Liu.
        </h1>
        <p className="text-xl md:text-2xl font-medium text-[var(--muted)] mb-8 max-w-2xl">
          Backend & Full-Stack Developer
        </p>
        <p className="text-base md:text-lg text-[var(--fg)] leading-relaxed max-w-3xl mb-10">
          I enjoy building backend systems and full-stack applications that are practical, scalable, and easy to reason about.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="px-6 py-3 bg-[var(--accent)] text-[var(--accent-fg)] font-medium rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            View Projects
          </a>
          <a 
            href="https://github.com/K-L-16" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-medium rounded-md hover:bg-[var(--border)] transition-colors flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-medium rounded-md hover:bg-[var(--border)] transition-colors flex items-center gap-2"
          >
            <Mail size={18} />
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[var(--card)] border-y border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>About</SectionHeading>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              I am a Computer Science student at the <strong className="text-[var(--fg)] font-medium">University of Waterloo</strong>. 
              My primary interests lie in backend engineering, distributed systems, full-stack development, and AI-powered applications.
            </p>
            <p>
              I believe the best way to learn is by building and shipping real projects. I focus on writing clean, maintainable code 
              and designing scalable architectures that solve concrete problems.
            </p>
          </div>
          <div className="bg-[var(--bg)] p-8 rounded-xl border border-[var(--border)] font-mono text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2 mb-4 text-[var(--fg)]">
              <Terminal size={16} />
              <span>~/profile.sh</span>
            </div>
            <p className="mb-2"><span className="text-blue-500">const</span> <span className="text-green-500">developer</span> = {'{'}</p>
            <p className="ml-4 mb-1">name: <span className="text-yellow-500">'Kevin Liu'</span>,</p>
            <p className="ml-4 mb-1">education: <span className="text-yellow-500">'University of Waterloo'</span>,</p>
            <p className="ml-4 mb-1">major: <span className="text-yellow-500">'Computer Science'</span>,</p>
            <p className="ml-4 mb-1">focus: [<span className="text-yellow-500">'Backend'</span>, <span className="text-yellow-500">'Full stack'</span>],</p>
            <p className="ml-4 mb-1">status: <span className="text-yellow-500">'Seeking Internships/Coop'</span></p>
            <p>{'};'}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Backend",
      icon: <Server size={20} className="text-[var(--fg)]" />,
      skills: ["Spring Boot", "Spring Data JPA", "Node.js", "Express", "MyBatis"]
    },
    {
      title: "Databases",
      icon: <Database size={20} className="text-[var(--fg)]" />,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis" ]
    },
    {
      title: "Messaging/Infra",
      icon: <Terminal size={20} className="text-[var(--fg)]" />,
      skills: ["RabbitMQ","Docker", "CI/CD", "Linux", "AWS"]
    },
    {
      title: "Frontend",
      icon: <Layout size={20} className="text-[var(--fg)]" />,
      skills: ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Languages",
      icon: <Code2 size={20} className="text-[var(--fg)]" />,
      skills: ["Java", "C", "C++", "Python", "JavaScript"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <div className="flex items-center gap-3 mb-4">
              {group.icon}
              <h3 className="font-semibold text-lg">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-md text-sm font-medium text-[var(--muted)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "SpotFlow High-Concurrency Backend",
      description: "A Spring Boot backend focused on high-concurrency ordering, Redis-based caching strategies, asynchronous processing with RabbitMQ, and distributed locking with Redisson. Built to explore practical backend system design beyond basic CRUD.",
      tech: ["Java", "Spring Boot", "RabbitMQ", "Redis", "JWT","MySQL"],
      github: "https://github.com/K-L-16/SpotFlow-High-Concurrency-Backend",
      demo: "https://github.com/K-L-16/SpotFlow-High-Concurrency-Backend"
    },
    {
      title: "GoChat Realtime Messaging App",
      description: "A full-stack real-time messaging app with one-to-one chat, online presence, read receipts, unread tracking, and image messaging. Built with a React frontend and a Node.js/Express backend using Socket.IO for low-latency communication.",
      tech: ["React", "Node.js", "Express", "WebSockets", "MongoDB","JWT"],
      github: "https://github.com/K-L-16/GoChat",
      demo: "https://go-chat-rosy.vercel.app/login"
    },
    {
      title: "ImNotAi",
      description: "A real-time social deduction game where players chat, vote, and try to identify an AI participant. Includes room-based synchronization, round-based state updates, and spectator mode.",
      tech: ["Java", "Spring Boot", "React", "TypeScript","WebSockets"],
      github: "https://github.com/K-L-16/ImNotAi",
      demo: "https://im-not-aifrontend.vercel.app/"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-[var(--card)] border-y border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>Featured Projects</SectionHeading>
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group grid md:grid-cols-[1fr_2fr] gap-8 p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--muted)] transition-colors"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium hover:text-[var(--muted)] transition-colors">
                    <Github size={16} /> Code
                  </a>
                  <a href={project.demo} className="flex items-center gap-2 text-sm font-medium hover:text-[var(--muted)] transition-colors">
                    <ExternalLink size={16} /> Demo / Details
                  </a>
                </div>
              </div>
              <div className="text-[var(--muted)] text-lg leading-relaxed flex items-center">
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-6">Let's Connect</h2>
        <p className="text-lg text-[var(--muted)] mb-10">
          I'm currently looking for software engineering internship opportunities. 
          Whether you're a recruiter, engineer, or founder, I'd love to chat about systems architecture, backend development, or potential collaborations.
        </p>
        <div className="flex justify-center gap-6 mb-16">
          <a href="mailto: k376liu@uwaterloo.ca" className="p-3 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors" aria-label="Email">
            <Mail size={24} />
          </a>
          <a href="https://github.com/K-L-16" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="www.linkedin.com/in/kevin-liu-0516-
" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
        </div>
        <p className="font-mono text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Kevin Liu. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-[var(--fg)] selection:text-[var(--bg)]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
