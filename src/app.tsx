import { useState } from 'preact/hooks';
import { Mail, Database, X, ExternalLink } from 'lucide-react';
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
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 animate-fade-in-up">
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Ameya Swapneel Kore
              </h1>
              <p className="text-xl md:text-2xl text-emerald-400 font-medium tracking-wide">
                Software Engineer | Systems, Edge AI & Distributed Architecture
              </p>
            </div>
            
            <p className="text-lg leading-relaxed text-gray-400">
              Bridging the gap between hardware constraints and cloud-scale infrastructure. 
              I build high-performance systems from bare-metal embedded microcontrollers 
              to fault-tolerant telemetry pipelines.
            </p>
          </div>

          <div className="flex md:flex-col gap-6 md:pt-2">
            <a href="mailto:kore.ameya@gmail.com" className="text-gray-500 hover:text-emerald-400 transition-colors" title="Email">
              <Mail size={22} />
            </a>
            <a href="https://github.com/fa993" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://linkedin.com/in/ameya-kore-925620239" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
      imageUrl: "/assets/rc-car-hardware.jpg",
      imageCaption: "Investigative phase: Hardware relays providing current sink protection for the ESP32, paired with an SDR antenna to sniff and decode proprietary RF control packets.",
      warStoryContent: (
        <>
          <h3>The Inertia Drift Problem</h3>
          <p>
            During the development of my local, closed-loop control application—driven by an onboard <strong>VLM (YOLOE-26)</strong> and an <strong>LLM (Gemma 4)</strong>—I hit a major physics roadblock. My soldered ESP32 perfectly replicated the proprietary RF signals of the original remote, but hardware physics doesn't stop when the signal does.
          </p>
          <p>
            When sending a forward actuation signal, the RC car's momentum would carry it past the exact bounds of the signal due to inertia. This seemingly random "drift" destroyed the deterministic behavioral modeling required by the VLM's spatial bounding box outputs.
          </p>
          
          <h3>Hacking an ABS (Anti-Lock Braking System)</h3>
          <p>
            To regain tight control, I engineered a programmatic braking system based on the same principles as modern ABS. At the termination of every motion command, my orchestrator would fire a micro-burst of the <em>opposite</em> directional signal. This forced the motors to engage in reverse just enough to kill the forward momentum instantly.
          </p>
          <p>
            This introduced a new issue: <strong>Over-calibration</strong>. If the secondary impulse was too strong, the car would visibly jerk backward. To solve this, I split the termination brake into two distinct, ultra-short impulses separated by a tiny delay gap, successfully smoothing out the deceleration without causing reverse drift.
          </p>

          <h3>Long-Route Command Queueing</h3>
          <p>
            While the split-impulse braking worked flawlessly for micro-adjustments, it broke down on longer, continuous navigation routes. Continuous sequences didn't have the luxury of time gaps to execute dual-burst braking safely between directional changes. 
          </p>
          <p>
            To solve this, I approached the system state differently for extended sequences. I enabled tighter constraints for continuous routes and introduced <strong>on-device command queueing</strong>. The LLM orchestrator now pre-computes and chains continuous multi-step routes at the start of a navigation section, bypassing intermediate micro-braking and treating the entire maneuver as a single fluid execution before applying the final stop constraint.
          </p>
        </>
      )
    },
    laserLab: {
      id: "laser-lab",
      title: "USC LASER Lab",
      tags: ["Research", "Robotics"],
      description: "Coordinating experimental setups to advance uncertainty-aware exploration in autonomous systems.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Detailed experimental coordination for uncertainty-aware exploration mapping. Assisting in setting up hardware-in-the-loop tests and verifying data pipelines for the lab's upcoming research initiatives.</p>
        </div>
      )
    },
    studentTeams: {
      id: "student-teams",
      title: "Rocket Propulsion Lab & AUV",
      tags: ["Hardware", "Dynamics", "USC"],
      description: "Applying industry software practices to the USC Rocket Propulsion Lab and Autonomous Underwater Vehicle club.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Bringing rigorous software engineering practices to complex hardware dynamics. Working closely with mechanical and aerospace teams to ensure telemetry and control loops are fault-tolerant and highly performant.</p>
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
    },
    weatherNetwork: {
      id: "weather-network",
      title: "ESP32 Weather Network",
      tags: ["IoT", "ESP32", "Distributed"],
      description: "Distributed environmental telemetry network across physical microcontrollers.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Built a mesh of ESP32 sensors communicating via MQTT. Hardened the devices for outdoor deployment and optimized sleep cycles to maximize battery life.</p>
        </div>
      )
    },
    rustFsm: {
      id: "rust-fsm",
      title: "From Rust to Riches: Decoding FSMs",
      tags: ["Medium", "Rust", "Architecture"],
      description: "A comprehensive technical guide to implementing FSMs in Rust, featuring a fully open-sourced UNO game engine codebase.",
      warStoryContent: (
        <div className="space-y-4">
          <p>Authored a technical article breaking down complex state transitions using Rust's powerful type system. Open-sourced the accompanying UNO game engine to serve as a practical learning tool for the community.</p>
        </div>
      )
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
      
      {/* Tile 1: Bare-Metal K3s (Huge, 2x2 Feature) */}
      <div 
        onClick={() => onSelect(projects.infrastructure)}
        className="md:col-span-2 md:row-span-2 relative group cursor-pointer rounded-2xl overflow-hidden border border-gray-800/60 bg-[#111]"
      >
        {/* Replace with <img src="/assets/k3s-desk-setup.jpg" ... /> when ready */}
        <div className="absolute inset-0 w-full h-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600 font-mono text-sm opacity-50 transition-transform duration-1000 group-hover:scale-105">
          [Photo: k3s Bare-Metal Desk Setup]
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex gap-2 mb-3">
            <span className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              Live Host
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Bare-Metal k3s Home Lab</h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            You are looking at the exact physical hardware currently serving this portfolio.
          </p>
        </div>
      </div>

      {/* Tile 2: Autonomous RC Car (Tall Vertical, 1x2) */}
      <div 
        onClick={() => onSelect(projects.rcCar)}
        className="md:col-span-1 md:row-span-2 relative group cursor-pointer rounded-2xl overflow-hidden border border-gray-800/60 bg-[#111]"
      >
        <img 
          src={projects.rcCar.imageUrl} 
          alt="Soldered ESP32 Hardware" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/20"></div>
        <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm z-10">Hardware</div>
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">Autonomous VLM Navigation</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Hardware-modified RC platform with a soldered ESP32 bridge and on-device visual tracking.
          </p>
        </div>
      </div>

      {/* Tile 3: MangaVerse Backend (Standard Square, 1x1) */}
      <div 
        onClick={() => onSelect(projects.manga)}
        className="md:col-span-1 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-orange-500/50 transition-colors relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-orange-500/10"></div>
        <div className="relative z-10">
          <div className="text-orange-400 text-xs font-mono mb-3">Rust / Distributed</div>
          <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors">MangaVerse Backend</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Unified abstraction caching layer handling 13GB of data. Reduced latency by 50%.
          </p>
        </div>
      </div>

      {/* Tile 4: Sudoku Solver (Standard Square, 1x1) */}
      <div 
        onClick={() => onSelect(projects.sudoku)}
        className="md:col-span-1 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-emerald-500/50 transition-colors relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full transition-all group-hover:bg-emerald-500/10"></div>
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors">Algorithm X Engine</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Donald Knuth's exact cover solver via Dancing Links.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-emerald-400 text-xs font-mono mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
          Live Demo <ExternalLink size={12} />
        </div>
      </div>

      {/* Row 3 */}
      {/* Tile 5: RPL & AUV (Wide, 2x1) */}
      <div 
        onClick={() => onSelect(projects.studentTeams)}
        className="md:col-span-2 md:row-span-1 bg-[#151515] p-6 md:p-8 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-blue-500/50 transition-colors relative overflow-hidden flex items-center"
      >
        <div className="absolute bottom-0 left-1/2 w-64 h-32 bg-blue-500/5 rounded-full blur-3xl -ml-32 transition-all group-hover:bg-blue-500/10"></div>
        <div className="relative z-10 w-full flex justify-between items-center">
          <div className="max-w-[80%]">
            <div className="text-blue-400 text-xs font-mono mb-3">Hardware & Dynamics</div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Rocket Propulsion Lab & AUV</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Applying industry software practices to the USC Rocket Propulsion Lab and Autonomous Underwater Vehicle club.
            </p>
          </div>
          <div className="text-gray-600 group-hover:text-blue-400 transition-colors translate-x-0 group-hover:translate-x-1 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      {/* Tile 6: USC LASER Lab (Standard Square, 1x1) */}
      <div 
        onClick={() => onSelect(projects.laserLab)}
        className="md:col-span-1 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-purple-500/50 transition-colors relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/10"></div>
        <div className="relative z-10">
          <div className="text-purple-400 text-xs font-mono mb-3">Research</div>
          <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">USC LASER Lab</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Coordinating experimental setups to advance uncertainty-aware exploration in autonomous systems.
          </p>
        </div>
      </div>

      {/* Tile 7: ESP32 Weather Network (Standard Square, 1x1) */}
      <div 
        onClick={() => onSelect(projects.weatherNetwork)}
        className="md:col-span-1 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-cyan-500/50 transition-colors relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full transition-all group-hover:bg-cyan-500/10"></div>
        <div className="relative z-10">
          <div className="text-cyan-400 text-xs font-mono mb-3">IoT / Distributed</div>
          <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">ESP32 Weather Network</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Distributed environmental telemetry.
          </p>
        </div>
      </div>

      {/* Row 4 */}
      {/* Tile 8: Technical Writing & Rust FSM (Wide, 2x1) */}
      <div 
        className="md:col-span-2 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-[#F26522]/50 transition-colors relative overflow-hidden flex flex-col justify-between"
        onClick={() => onSelect(projects.rustFsm)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F26522]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-[#F26522]/10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#F26522] text-xs font-mono font-bold bg-[#F26522]/10 px-2 py-1 rounded">Medium Publication</span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              100+ Claps
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#F26522] transition-colors">From Rust to Riches: Decoding Finite State Machines</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
            A comprehensive technical guide to implementing FSMs in Rust, featuring a fully open-sourced UNO game engine codebase to demonstrate state transitions.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-[#F26522] text-xs font-mono mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
          Read on Medium <ExternalLink size={12} />
        </div>
      </div>

      {/* DDoS Prevention (Wide, 2x1) */}
      <div 
        onClick={() => onSelect(projects.ddos)}
        className="md:col-span-2 md:row-span-1 bg-[#151515] p-6 group cursor-pointer rounded-2xl border border-gray-800/60 hover:border-red-500/50 transition-colors relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-red-500/5 blur-3xl rounded-full transition-all group-hover:bg-red-500/10"></div>
        <div className="relative z-10 space-y-3">
          <div className="text-red-400 text-xs font-mono mb-3">Research & Security</div>
          <h2 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-red-400 transition-colors">DDoS Prevention via GANs</h2>
          <p className="text-gray-400 text-xs leading-relaxed max-w-lg">
            Synthesized benign network traffic for imbalanced Healthcare IoT (IoMT) datasets. Elevated DDoS classification accuracy from 97.13% to 99.61%, enabling real-time edge deployment.
          </p>
        </div>
        <div className="relative z-10 mt-4 flex items-center text-red-500 text-xs font-mono gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          Read ICICKE 2025 Abstract <ExternalLink size={12} />
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

              {project.imageUrl ? (
                <div className="space-y-3">
                  <div className="w-full h-48 sm:h-64 bg-[#111] border border-gray-800 rounded-lg overflow-hidden group">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {project.imageCaption && (
                    <p className="text-gray-500 text-xs font-mono border-l-2 border-emerald-500/50 pl-3 leading-relaxed">
                      {project.imageCaption}
                    </p>
                  )}
                </div>
              ) : (
                <div className="w-full h-48 sm:h-64 bg-[#111] border border-gray-800 border-dashed rounded-lg flex items-center justify-center text-gray-600 font-mono text-sm overflow-hidden group">
                  <div className="group-hover:scale-105 transition-transform duration-500">
                    [ High-Res Image Placeholder ]
                  </div>
                </div>
              )}

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
