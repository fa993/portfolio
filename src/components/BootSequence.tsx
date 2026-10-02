import { useState, useEffect } from 'preact/hooks';

const BOOT_LOGS = [
  "[OK] Initializing k3s multi-node cluster...",
  "[INFO] Pulling image ameya/portfolio-ui:latest...",
  "[OK] Successfully assigned to bare-metal/node-1...",
  "[INFO] Mounting persistent volumes...",
  "[OK] Starting container...",
  "[INFO] Establishing secure connection...",
  "[OK] System Ready."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait a bit before transitioning
      }
    }, 200); // Speed of logs appearing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] text-emerald-500 font-mono p-6 md:p-12 z-50 flex flex-col justify-end">
      <div className="space-y-2 mb-12">
        {logs.map((log, i) => (
          <div key={i} className="animate-fade-in-up">
            <span className="opacity-50">{new Date().toISOString()}</span> {log}
          </div>
        ))}
        {logs.length < BOOT_LOGS.length && (
          <div className="animate-pulse w-3 h-5 bg-emerald-500 inline-block align-middle ml-2"></div>
        )}
      </div>
    </div>
  );
}
