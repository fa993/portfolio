import { useState } from 'preact/hooks';
import { GitMerge, GitPullRequestClosed, Search, Code2 } from 'lucide-react';

const PRS = [
  {
    id: 1,
    title: "Followup for adding support for deep and light sleep",
    repo: "esp-rs/esp-idf",
    date: "8 Nov 2025",
    status: "merged",
    tags: ["Rust", "Embedded", "ESP32"]
  },
  {
    id: 2,
    title: "Fixes an issue with the test for app.controller.spec.ts and updates types",
    repo: "laakal/nestjs-better-auth-template",
    date: "6 Jul 2025",
    status: "merged",
    tags: ["TypeScript", "NestJS", "Testing"]
  },
  {
    id: 3,
    title: "use TryInto<SocketAddress> bound for bind/listen functions in rama",
    repo: "plabayo/rama",
    date: "26 Jan 2025",
    status: "merged",
    tags: ["Rust", "Networking", "Transport"]
  },
  {
    id: 4,
    title: "moved src input to AsRef and dest input to Into",
    repo: "Miyoshi-Ryota/async-ssh2-tokio",
    date: "23 Jul 2024",
    status: "merged",
    tags: ["Rust", "Async", "Tokio"]
  },
  {
    id: 5,
    title: "feat: made AuthMethod enum variants more generic",
    repo: "Miyoshi-Ryota/async-ssh2-tokio",
    date: "21 Jul 2024",
    status: "merged",
    tags: ["Rust", "Async", "Tokio"]
  },
  {
    id: 6,
    title: "Feature Request: Percentages",
    repo: "printfn/fend",
    date: "1 Nov 2023",
    status: "merged",
    tags: ["Rust", "Parser"]
  },
  {
    id: 15,
    title: "Read password from file not containing trailing newline",
    repo: "rustic-rs/rustic",
    date: "23 Feb 2023",
    status: "merged",
    tags: ["Rust", "CLI", "Security"]
  },
  {
    id: 16,
    title: "Fixed spelling mistakes in documentation",
    repo: "zhiburt/tabled",
    date: "21 Feb 2023",
    status: "merged",
    tags: ["Rust", "Documentation"]
  }
];

export function ChangelogSection() {
  const [filter, setFilter] = useState('');

  const filteredPRs = PRS.filter(pr => 
    pr.title.toLowerCase().includes(filter.toLowerCase()) || 
    pr.repo.toLowerCase().includes(filter.toLowerCase()) ||
    pr.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <section className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-4 flex items-center gap-2">
        <Code2 className="text-emerald-500" /> Pull Request Archive
      </h2>
      
      {/* Interactive Filter Bar */}
      <div className="bg-[#111] border border-gray-800 rounded-md p-3 flex items-center gap-3">
        <span className="text-emerald-500 font-mono text-sm">&gt;</span>
        <span className="text-gray-500 font-mono text-sm">filter --query=</span>
        <input 
          type="text" 
          className="bg-transparent border-none outline-none text-white font-mono text-sm w-full placeholder-gray-700"
          placeholder='"Rust", "esp-idf", "Tokio", etc...'
          value={filter}
          onInput={(e) => setFilter(e.currentTarget.value)}
        />
        <Search size={16} className="text-gray-600" />
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <button onClick={() => setFilter('Rust')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-gray-400 transition-colors">#Rust</button>
        <button onClick={() => setFilter('Tokio')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-gray-400 transition-colors">#Tokio</button>
        <button onClick={() => setFilter('')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-gray-500 transition-colors">Clear</button>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-gray-800 ml-4 space-y-8 py-4">
        {filteredPRs.map(pr => (
          <div key={pr.id} className="relative pl-8 group">
            <div className={`absolute w-6 h-6 rounded-full -left-3 top-0 border-4 border-[#0a0a0a] flex items-center justify-center ${pr.status === 'merged' ? 'bg-purple-900/50 text-purple-400' : 'bg-red-900/50 text-red-400'}`}>
              {pr.status === 'merged' ? <GitMerge size={12} /> : <GitPullRequestClosed size={12} />}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors leading-tight">{pr.title}</h3>
                <span className="text-gray-600 text-xs font-mono whitespace-nowrap">{pr.date}</span>
              </div>
              <div className="text-gray-500 font-mono text-xs">Repo: {pr.repo}</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {pr.tags.map(tag => (
                  <span key={tag} className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredPRs.length === 0 && (
          <div className="pl-8 text-gray-500 font-mono text-sm">No results found.</div>
        )}
      </div>
    </section>
  );
}
