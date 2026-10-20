import React, { useState } from 'react';
import {
  Laptop,
  Terminal,
  ExternalLink,
  GitBranch,
  Layers,
  Search,
} from 'lucide-react';
import { SOFTWARE_PROJECTS, DEVELOPER_PROFILE } from '../data/portfolioData';
import { SoftwareProject } from '../types/portfolio';
import { Modal } from './Modal';

export const WorkstationSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<SoftwareProject | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'terminal'>('projects');

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'ChileOS v4.2.0 (x86_64-chilepeppers)',
    'Type "help" for available commands.',
    'System ready at 02:00 PM peak focus.',
  ]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Backend' },
    { id: 'webgl', label: 'Creative & WebGL' },
    { id: 'fullstack', label: 'Full-Stack Web' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? SOFTWARE_PROJECTS
      : SOFTWARE_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newOutput = [...terminalOutput, `$ ${cmd}`];

    if (trimmed === 'help') {
      newOutput.push(
        'Commands:',
        '  projects    - list software builds',
        '  linkedin    - show LinkedIn profile link',
        '  skills      - display stack summary',
        '  contact     - show direct outreach channels',
        '  clear       - clear screen'
      );
    } else if (trimmed === 'projects') {
      SOFTWARE_PROJECTS.forEach((p) => {
        newOutput.push(`  • ${p.title} [${p.year}] - ${p.tagline}`);
      });
    } else if (trimmed === 'linkedin') {
      newOutput.push(`  LinkedIn: ${DEVELOPER_PROFILE.linkedin}`);
    } else if (trimmed === 'skills') {
      newOutput.push('  TypeScript, Go, React 19, Tailwind, WebGL, PostgreSQL, ClickHouse, Docker');
    } else if (trimmed === 'contact') {
      newOutput.push(`  Email: ${DEVELOPER_PROFILE.email} | Telegram: ${DEVELOPER_PROFILE.telegram}`);
    } else if (trimmed === 'clear') {
      setTerminalOutput(['Terminal screen cleared.']);
      setTerminalInput('');
      return;
    } else {
      newOutput.push(`Command not recognized: "${trimmed}". Type "help".`);
    }

    setTerminalOutput(newOutput);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    handleCommand(terminalInput);
  };

  return (
    <section id="workstation" className="relative min-h-[90vh] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Minimalist Scene Kicker */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-amber-800 tracking-widest font-semibold uppercase">
            02:00 PM · Afternoon Workstation
          </span>
          <p className="text-xs font-mono text-amber-950/60 mt-1">
            Studio Terminal & Dual Display · Touch projects to launch architecture
          </p>
        </div>

        {/* Floating Aluminum Workstation Monitor */}
        <div className="w-full bg-slate-950 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline-block">
                workstation@chilepeppers:~
              </span>
            </div>

            {/* LinkedIn Account Callout */}
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-mono transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>LinkedIn Profile</span>
            </a>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'projects'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-amber-400" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'terminal'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>CLI</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Featured Projects */}
          {activeTab === 'projects' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>{filteredProjects.length} Builds Active</span>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                            {project.categoryLabel}
                          </span>
                          <h4 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors mt-0.5">
                            {project.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          {project.year}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Metrics */}
                      <div className="mt-3 pt-3 border-t border-slate-800/70 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-400">
                        {project.metrics.map((metric, mIdx) => (
                          <span key={mIdx}>
                            {metric} {mIdx < project.metrics.length - 1 && '·'}
                          </span>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-slate-800/80 px-2 py-0.5 rounded-sm border border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Inspect Architecture</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="View on GitHub"
                        >
                          <GitBranch className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Open Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Terminal */}
          {activeTab === 'terminal' && (
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
              <div className="space-y-1.5 min-h-[220px] max-h-[340px] overflow-y-auto text-slate-300">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith('$')
                        ? 'text-amber-300 font-semibold'
                        : line.startsWith('  •')
                        ? 'text-emerald-300'
                        : 'text-slate-300'
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Quick Suggestions */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-500">Quick run:</span>
                {['projects', 'linkedin', 'skills', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 text-xs font-mono transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type command (e.g. projects, linkedin, skills)..."
                  className="flex-1 bg-transparent border-none text-white focus:outline-hidden font-mono text-xs sm:text-sm placeholder:text-slate-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-sm cursor-pointer"
                >
                  Enter
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Project Architectural Detail Modal */}
      <Modal
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title || ''}
        subtitle={`${activeProject?.categoryLabel} · ${activeProject?.year}`}
      >
        <div className="space-y-5">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeProject?.summary}
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Verified Production Benchmarks
            </span>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              {activeProject?.metrics.map((m, idx) => (
                <span key={idx}>✓ {m}</span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Architectural Highlights
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {activeProject?.architectureHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {activeProject?.codeSnippet && (
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-500">
                Core Snippet
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-amber-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {activeProject.codeSnippet}
              </pre>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <a
              href={activeProject?.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-900 dark:text-white transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={activeProject?.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors shadow-xs"
            >
              <span>Launch Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
};
