import { useState } from 'preact/hooks';
import { Mail, Database, X, ExternalLink, Play } from 'lucide-react';
import { BootSequence } from './components/BootSequence';
import { ChangelogSection } from './components/ChangelogSection';

export function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState<'showcase' | 'career' | 'prs'>('showcase');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-emerald-500/30 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-12">
        
        {/* Header / Hero */}
        <header className="space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ameya Swapneel Kore
            </h1>
            <p className="text-xl md:text-2xl text-emerald-400 font-medium tracking-wide">
              Software Engineer | Systems, Edge AI & Distributed Architecture
            </p>
          </div>
          
          <p className="text-lg leading-relaxed text-gray-400 max-w-2xl">
            Bridging the gap between hardware constraints and cloud-scale infrastructure. 
            I build high-performance systems from bare-metal embedded microcontrollers 
            to fault-tolerant telemetry pipelines.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="mailto:kore.ameya@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10 text-sm">
              <Mail size={16} />
              <span>kore.ameya@gmail.com</span>
            </a>
            <a href="https://github.com/fa993" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>github.com/fa993</span>
            </a>
            <a href="https://linkedin.com/in/ameya-kore-925620239" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </header>

        {/* Tabbed Navigation */}
        <div className="flex bg-[#111] p-1 border border-gray-800 rounded-md w-fit overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveTab('showcase')} 
            className={`px-4 py-2 text-sm font-mono rounded whitespace-nowrap transition-colors ${activeTab === 'showcase' ? 'bg-[#222] text-white shadow-sm border border-gray-700' : 'text-gray-400 hover:text-white border border-transparent'}`}
          >
            [ Showcase ]
          </button>
          <button 
            onClick={() => setActiveTab('career')} 
            className={`px-4 py-2 text-sm font-mono rounded whitespace-nowrap transition-colors ${activeTab === 'career' ? 'bg-[#222] text-white shadow-sm border border-gray-700' : 'text-gray-400 hover:text-white border border-transparent'}`}
          >
            [ Career & Timeline ]
          </button>
          <button 
            onClick={() => setActiveTab('prs')} 
            className={`px-4 py-2 text-sm font-mono rounded whitespace-nowrap transition-colors ${activeTab === 'prs' ? 'bg-[#222] text-white shadow-sm border border-gray-700' : 'text-gray-400 hover:text-white border border-transparent'}`}
          >
            [ PR Archive ]
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="animate-fade-in-up min-h-[50vh]">
          {activeTab === 'showcase' && <ShowcaseGrid onSelect={setSelectedProject} />}
          {activeTab === 'career' && <CareerTimeline />}
          {activeTab === 'prs' && <ChangelogSection />}
        </div>

      </div>

      <SlideOverPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function ShowcaseGrid({ onSelect }: { onSelect: (project: any) => void }) {
  const projects = {
    infrastructure: {
      id: "infra",
      title: "Personal k3s Kubernetes Cluster",
      tags: ["Bare-Metal", "Kubernetes", "Helm", "Nginx"],
      description: "You are currently hitting my personal multi-node k3s Kubernetes cluster, running on bare-metal Raspberry Pi hardware right on my desk.",
      warStoryContent: (
        <div className="space-y-4">
          <p>This cluster utilizes Nginx reverse proxies and Helm charts to manage traffic, backed by a load balancer that seamlessly fails over to a stable GitHub Pages proxy if the bare metal goes down.</p>
          <p>This home lab doesn't just host my portfolio—it's the playground where I deploy everything from ClickHouse databases and Mosquitto MQTT brokers to self-hosted instances of Llama.cpp, Open WebUI, and Jellyfin.</p>
        </div>
      )
    },
    rcCar: {
      id: "rc-car",
      title: "Autonomous VLM Navigation",
      tags: ["ESP32", "Hardware", "VLM"],
      description: "Tore down an off-the-shelf RC car, reverse-engineered proprietary RF protocols, and soldered a custom ESP32 bridge directly to the PCB.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Traditional compute constraints on edge devices mean running a Vision-Language Model (VLM) locally is near impossible without aggressive optimization.</p>
          <p>By sniffing the RF protocol with a logic analyzer, I was able to replicate the exact pulse width modulations using an ESP32. The VLM processes a camera feed at 15fps, outputting JSON bounding boxes that translate to instantaneous micro-burst motor actuations via the ESP32 bridge.</p>
        </div>
      )
    },
    sudoku: {
      id: "sudoku",
      title: "Algorithmic Sudoku Engine",
      tags: ["Algorithm X", "Web Workers", "React"],
      description: "Modeled Sudoku as an exact cover set problem. Implemented Donald Knuth's Algorithm X via Dancing Links in vanilla JS, paired with React and Web Workers.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Bypassed inefficient traditional solving approaches. By utilizing Web Workers, the engine achieves millisecond-level solving speeds without blocking the main browser thread, enabling a butter-smooth UI even on massive boards.</p>
        </div>
      )
    },
    manga: {
      id: "manga",
      title: "MangaVerse: Distributed Data",
      tags: ["Rust", "High-Load"],
      description: "Resolved fragmented, multi-source data retrieval by engineering a unified abstraction caching layer. Reduced query latency by 50% across a 13GB dataset.",
      warStoryContent: (
        <p>Originally built in Spring Boot and later re-architected in Rust for maximum performance. The new backend sustains massive high-load concurrency with virtually zero garbage collection pauses.</p>
      )
    },
    ddos: {
      id: "ddos",
      title: "DDoS Prevention via GANs",
      tags: ["ICICKE 2025", "Edge AI"],
      description: "Synthesized benign network traffic for imbalanced Healthcare IoT (IoMT) datasets. Elevated classification accuracy to 99.61%.",
      warStoryContent: (
        <p>Co-authored a paper published at the 2025 IEEE International Conference on Intelligent Computing and Knowledge Extraction. The lightweight GAN enables real-time edge deployment.</p>
      )
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
      
      {/* Tile 1: Infrastructure (Spans 2 columns on tablet/desktop) */}
      <div 
        onClick={() => onSelect(projects.infrastructure)}
        className="md:col-span-2 relative bg-[#111] rounded-xl border border-gray-800 overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-colors"
      >
        <div className="absolute inset-0 bg-[#1a1a1a]">
          {/* Placeholder for physical desk setup photo */}
          <div className="w-full h-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600 font-mono text-sm opacity-50 group-hover:opacity-70 transition-opacity">
            [Photo: k3s Bare-Metal Desk Setup]
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
          </div>
          <span className="text-emerald-500 font-mono text-xs font-semibold">Live: bare-metal/node-1</span>
        </div>
        <div className="absolute bottom-0 left-0 p-6 space-y-2 w-full">
          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">Personal k3s Cluster</h3>
          <p className="text-gray-300 text-sm max-w-lg hidden sm:block">You are currently being served by this cluster. Load balanced via Nginx & Helm with GitHub Pages failover.</p>
        </div>
      </div>

      {/* Tile 2: Hardware Hack (ESP32) */}
      <div 
        onClick={() => onSelect(projects.rcCar)}
        className="relative bg-[#111] rounded-xl border border-gray-800 overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-colors"
      >
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <div className="w-full h-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600 font-mono text-sm opacity-50 group-hover:opacity-70 transition-opacity text-center px-4">
            [Photo: Soldered ESP32 Board]
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider">Hardware</div>
        <div className="absolute bottom-0 left-0 p-5 space-y-1 w-full">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">Autonomous VLM Navigation</h3>
          <p className="text-gray-400 text-xs">Reverse-engineered RF + Custom ESP32 Bridge</p>
        </div>
      </div>

      {/* Tile 3: Interactive Algorithm (Sudoku) */}
      <div 
        onClick={() => onSelect(projects.sudoku)}
        className="relative bg-[#111] rounded-xl border border-gray-800 overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-colors"
      >
        <div className="p-6 h-full flex flex-col justify-between relative z-10">
          <div className="space-y-2">
            <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-[10px] font-mono w-fit uppercase tracking-wider">Algorithm</div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">Dancing Links Sudoku Solver</h3>
            <p className="text-gray-400 text-xs">Algorithm X + Web Workers</p>
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 transition-colors text-sm font-semibold">
            <Play size={14} /> Try Live Demo
          </button>
        </div>
        {/* Background ambient effect */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* Tile 4: MangaVerse */}
      <div 
        onClick={() => onSelect(projects.manga)}
        className="md:col-span-2 relative bg-[#111] rounded-xl border border-gray-800 p-6 group cursor-pointer hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row gap-6 items-center"
      >
         <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-2 py-1 rounded border border-orange-400/20">Rust</span>
              <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded border border-gray-700">Distributed</span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">MangaVerse Backend</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Unified abstraction caching layer handling 13GB of fragmented data. Rewritten from Spring Boot to Rust, cutting latency by 50% under massive load.</p>
         </div>
         <div className="w-full sm:w-48 h-32 bg-[#1a1a1a] rounded border border-gray-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
            {/* Fake Grafana Chart SVG */}
            <svg className="w-full h-full opacity-30 text-emerald-500" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 40 L0 30 Q10 25 20 35 T40 20 T60 25 T80 10 T100 15 L100 40 Z" fill="currentColor" opacity="0.2"/>
              <path d="M0 30 Q10 25 20 35 T40 20 T60 25 T80 10 T100 15" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="absolute text-xs font-mono text-gray-500">[Latency Graph]</span>
         </div>
      </div>
      
      {/* Tile 5: DDoS Prevention */}
      <div 
        onClick={() => onSelect(projects.ddos)}
        className="relative bg-[#111] rounded-xl border border-gray-800 p-6 group cursor-pointer hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
      >
        <div className="space-y-3">
          <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded text-[10px] font-mono w-fit uppercase tracking-wider">Research</div>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">DDoS Prevention via GANs</h3>
          <p className="text-gray-400 text-xs leading-relaxed">Synthesized benign network traffic for imbalanced Healthcare IoT datasets. 99.61% accuracy.</p>
        </div>
        <div className="mt-4 flex items-center text-emerald-500 text-xs font-mono gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Read Abstract <ExternalLink size={12} />
        </div>
      </div>

    </div>
  );
}

function CareerTimeline() {
  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="space-y-12 pl-2 md:pl-0">
        <div className="relative pl-6 border-l border-gray-800">
          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 border-4 border-[#0a0a0a]"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Motorq</h3>
              <div className="text-emerald-400 text-sm font-mono mt-1">Software Development Engineer | Jun 2025 - Jul 2026</div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="bg-[#111] border border-gray-800 rounded px-3 py-2 text-center flex-1 md:flex-auto">
                <span className="block text-emerald-500 font-bold">5%</span>
                <span className="text-[10px] text-gray-500 font-mono uppercase">Revenue Recovery</span>
              </div>
              <div className="bg-[#111] border border-gray-800 rounded px-3 py-2 text-center flex-1 md:flex-auto">
                <span className="block text-emerald-500 font-bold">Zero</span>
                <span className="text-[10px] text-gray-500 font-mono uppercase">Downtime</span>
              </div>
            </div>
          </div>

          <ul className="space-y-3 text-gray-400 mt-2">
            <li><strong className="text-gray-200">OEM Telemetry & Infrastructure:</strong> Architected a custom end-to-end telemetry ingestion pipeline for Hyundai. Designed schema-versioning and normalization layers to automate data ingestion.</li>
            <li><strong className="text-gray-200">Cloud & Microservices:</strong> Deployed microservices across Kubernetes and Microsoft Azure, significantly improving system fault tolerance.</li>
            <li><strong className="text-gray-200">Zero-Downtime Migrations:</strong> Led complex internal database migrations for PO services, adhering to hard constraints.</li>
            <li><strong className="text-gray-200">AI & Automation Integration:</strong> Pioneered the company's AI initiative by engineering an automated CI/CD remediation pipeline via SonarQube and GitHub PRs.</li>
            <li><strong className="text-gray-200">Resilience Engineering:</strong> Built a conditional workflow retry feature recovering failing onboarding operations.</li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-gray-800">
          <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5 border-4 border-[#0a0a0a]"></div>
          <h3 className="text-xl font-bold text-white">Daten & Wissen</h3>
          <div className="text-gray-400 text-sm font-mono mb-4">Edge AI Software Intern | Oct 2023 - Apr 2024</div>
          <ul className="space-y-3 text-gray-400">
            <li><strong className="text-gray-200">Embedded Vision & Mobile:</strong> Engineered embedded AI solutions targeting mobile devices and constrained hardware, including the development and optimization of face recognition models.</li>
            <li><strong className="text-gray-200">ROI Optimization Research:</strong> Conducted pure research on performance optimization, evaluating ROI-based image filters for edge AI vision pipelines to assess potential improvements in inference precision and throughput.</li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-gray-800">
          <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5 border-4 border-[#0a0a0a]"></div>
          <h3 className="text-xl font-bold text-white">Florican Infosoft</h3>
          <div className="text-gray-400 text-sm font-mono mb-4">Freelance Systems Developer | Jan 2023 - Jun 2023</div>
          <ul className="space-y-3 text-gray-400">
            <li>Engineered real-time, multi-station chemical formulation software using Kotlin and Java SWT, synchronized with hardware weighing scales.</li>
            <li>Built high-throughput AES encryption/decryption modules in Rust to secure proprietary recipe transmissions.</li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-gray-800">
          <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5 border-4 border-[#0a0a0a]"></div>
          <h3 className="text-xl font-bold text-white">Vicara</h3>
          <div className="text-gray-400 text-sm font-mono mb-4">Backend Intern | Jun 2022 - Jul 2022</div>
          <ul className="space-y-3 text-gray-400">
            <li>Contributed to Patr, a cloud platform for deploying sites, web apps, databases, and containers.</li>
            <li>Refactored the core CLI application to improve error handling and propagation, and established VSCode remote container environments.</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-white pb-6 flex items-center gap-2">
          <Database className="text-emerald-500" /> Core Technologies & Background
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Technical Stack</h3>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-gray-300">Systems & Languages:</strong> Rust, Python, C/C++, Java, JavaScript/TypeScript, Dart, SQL.</li>
              <li><strong className="text-gray-300">Infrastructure & Cloud:</strong> Kubernetes, Docker, AWS EC2, Microsoft Azure, Linux, RTOS.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Honors & Academics</h3>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-gray-300">MS in Computer Science:</strong> USC (Autonomous Cyber-Physical Systems).</li>
              <li><strong className="text-gray-300">University Rankings:</strong> Top 0.5% (9.63 CGPA) from VIT.</li>
              <li><strong className="text-gray-300">INSPIRE Scholarship:</strong> Top 1% statewide following 12th-grade.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideOverPanel({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${project ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose} 
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#0a0a0a] border-l border-gray-800 z-50 transform transition-transform duration-300 ease-out overflow-y-auto shadow-2xl ${project ? 'translate-x-0' : 'translate-x-full'}`}>
        {project && (
          <>
            <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center z-10">
              <div className="flex gap-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 text-[10px] font-mono rounded border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white leading-tight">{project.title}</h2>
                <p className="text-lg text-gray-400 leading-relaxed">{project.description}</p>
              </div>

              <div className="w-full h-48 sm:h-64 bg-[#111] border border-gray-800 border-dashed rounded-lg flex items-center justify-center text-gray-600 font-mono text-sm overflow-hidden group">
                <div className="group-hover:scale-105 transition-transform duration-500">
                  [ High-Res Image Placeholder ]
                </div>
              </div>

              <div className="prose prose-invert prose-emerald max-w-none text-gray-300">
                {project.warStoryContent}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
