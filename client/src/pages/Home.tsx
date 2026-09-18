import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleHelp,
  Eye,
  Github,
  Laptop2,
  LockKeyhole,
  Menu,
  Mic,
  Network,
  Play,
  Radio,
  ScanText,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#flow" },
  { label: "Privacy", href: "#privacy" },
];

const featureCards = [
  {
    icon: Eye,
    eyebrow: "01 / See",
    title: "Context from the windows you choose.",
    copy: "Permissioned screen understanding keeps the right context close — without indexing your whole desktop.",
    accent: "mint",
  },
  {
    icon: AudioLines,
    eyebrow: "02 / Hear",
    title: "A meeting memory that stays yours.",
    copy: "Near real-time transcription turns conversations into a private working layer for summaries and next steps.",
    accent: "amber",
  },
  {
    icon: BrainCircuit,
    eyebrow: "03 / Help",
    title: "Useful answers, grounded in now.",
    copy: "A small local reasoning model connects what is on screen with what was just said, then gets out of the way.",
    accent: "violet",
  },
];

const pipeline = [
  { number: "01", label: "Capture", copy: "Screen + mic", icon: ScanText },
  { number: "02", label: "Understand", copy: "STT + VLM", icon: Network },
  { number: "03", label: "Assist", copy: "Local reasoning", icon: Sparkles },
];

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function DemoConsole() {
  const [activeTab, setActiveTab] = useState<"observe" | "ask" | "memory">("observe");
  const [sessionLive, setSessionLive] = useState(false);
  const [memoryWiped, setMemoryWiped] = useState(false);
  const [question, setQuestion] = useState("");

  const answer = useMemo(() => {
    if (!question.trim()) return "Ask AuraDesk what is on screen, what changed, or what to do next.";
    return `Local answer: the dashboard is ready for a focused review. Start with the two flagged items, then share the short recap.`;
  }, [question]);

  return (
    <div className="demo-shell" id="demo">
      <div className="console-topbar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="console-title"><span className="status-dot" /> AURADESK / LOCAL SESSION</div>
        <div className="console-badge"><LockKeyhole size={12} /> no cloud</div>
      </div>
      <div className="console-body">
        <aside className="console-side">
          <div className="side-brand"><LogoMark /><span>AuraDesk</span></div>
          <div className="side-section-label">Workspace</div>
          <button className="side-link active"><Radio size={15} /> Live context</button>
          <button className="side-link"><ScanText size={15} /> Screen focus <span className="side-count">1</span></button>
          <button className="side-link"><AudioLines size={15} /> Voice notes</button>
          <div className="side-section-label side-section-spaced">Controls</div>
          <button className="side-link"><ShieldCheck size={15} /> Privacy center</button>
          <button className="side-link" onClick={() => setMemoryWiped(true)}><Trash2 size={15} /> Wipe session</button>
          <div className="side-footer"><span className="npu-chip">NPU</span><span>preferred</span></div>
        </aside>
        <main className="console-main">
          <div className="console-heading">
            <div>
              <p className="eyebrow">WORKSPACE / 09:41</p>
              <h3>Good morning, Arav.</h3>
            </div>
            <button className={`session-button ${sessionLive ? "live" : ""}`} onClick={() => setSessionLive(!sessionLive)}>
              <span className="button-pulse" /> {sessionLive ? "Session live" : "Start session"}
            </button>
          </div>
          <div className="console-tabs" role="tablist" aria-label="AuraDesk demo views">
            {(["observe", "ask", "memory"] as const).map((tab) => (
              <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}>
                {tab === "observe" ? "Observe" : tab === "ask" ? "Ask AuraDesk" : "Session memory"}
              </button>
            ))}
          </div>
          {activeTab === "observe" && (
            <div className="observe-grid">
              <div className="screen-card">
                <div className="card-label"><span className="mini-live" /> SELECTED WINDOW <span>● Figma</span></div>
                <div className="fake-window">
                  <div className="fake-toolbar"><span>Untitled / product brief</span><span>•••</span></div>
                  <div className="fake-canvas">
                    <div className="fake-sidebar"><i /><i /><i /><i /></div>
                    <div className="fake-board">
                      <div className="fake-heading" />
                      <div className="fake-line short" />
                      <div className="fake-line" />
                      <div className="fake-line medium" />
                      <div className="fake-blocks"><div /><div /><div /></div>
                    </div>
                  </div>
                </div>
                <div className="screen-caption"><Eye size={14} /> AuraDesk is watching only this window</div>
              </div>
              <div className="insight-card">
                <div className="card-label">LIVE INSIGHT <span className="confidence">98% grounded</span></div>
                <div className="insight-orb"><div className="orb-core" /><div className="orb-ring ring-a" /><div className="orb-ring ring-b" /></div>
                <p className="insight-quote">“The product brief is open. I found one unresolved decision and a draft handoff note.”</p>
                <div className="insight-tags"><span>decision · 1</span><span>handoff · 1</span></div>
              </div>
            </div>
          )}
          {activeTab === "ask" && (
            <div className="ask-panel">
              <div className="ask-intro"><div className="ask-icon"><CircleHelp size={18} /></div><div><strong>Ask about the current context</strong><span>Answers are composed on-device from the selected window.</span></div></div>
              <div className="ask-history"><div className="ask-user">What should I do next?</div><div className="ask-answer"><Sparkles size={15} /><span>{answer}</span></div></div>
              <div className="ask-input-row"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setQuestion(question); }} placeholder="Ask anything about this window…" /><button onClick={() => setQuestion(question || "What should I do next?")}><ArrowUpRight size={17} /></button></div>
            </div>
          )}
          {activeTab === "memory" && (
            <div className="memory-panel">
              <div className="memory-head"><div><p className="eyebrow">SHORT-TERM / EPHEMERAL</p><h4>Your context, bounded.</h4></div><span className={`memory-state ${memoryWiped ? "wiped" : ""}`}>{memoryWiped ? "Wiped" : "3 items"}</span></div>
              {!memoryWiped ? <><div className="memory-list"><div><span className="memory-icon mint"><Mic size={14} /></span><p><strong>Transcript</strong><small>Let’s review the current task…</small></p><time>09:40</time></div><div><span className="memory-icon violet"><Eye size={14} /></span><p><strong>Screen context</strong><small>Product brief / Figma</small></p><time>09:41</time></div><div><span className="memory-icon amber"><Sparkles size={14} /></span><p><strong>Assistant note</strong><small>1 decision, 1 handoff</small></p><time>09:41</time></div></div><button className="wipe-button" onClick={() => setMemoryWiped(true)}><Trash2 size={14} /> Wipe everything now</button></> : <div className="wiped-state"><div><Check size={19} /></div><strong>Session cleared</strong><span>No screen frames, audio, or notes remain.</span><button className="restore-button" onClick={() => setMemoryWiped(false)}>Restore demo state</button></div>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="AuraDesk home"><LogoMark /><span>AuraDesk</span><em>private by design</em></a>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>)}
          <a href="#demo" className="nav-cta" onClick={() => setMobileOpen(false)}>See the demo <ArrowUpRight size={15} /></a>
        </nav>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-glow glow-one" aria-hidden="true" /><div className="hero-glow glow-two" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="kicker"><span className="kicker-line" /> Snapdragon AI Lab / 2026 build & present</div>
              <h1>Intelligence that stays <span>with you.</span></h1>
              <p className="hero-lede">AuraDesk sees, hears, and helps across your workday — with the speed of local AI and the calm of knowing your context never leaves the device.</p>
              <div className="hero-actions"><a className="primary-button" href="#demo">Explore the live demo <ArrowUpRight size={17} /></a><a className="text-button" href="#flow"><Play size={14} fill="currentColor" /> How it works</a></div>
              <div className="hero-proof"><div className="proof-item"><strong>0 bytes</strong><span>sent to cloud</span></div><div className="proof-divider" /><div className="proof-item"><strong>NPU-first</strong><span>Snapdragon ready</span></div><div className="proof-divider" /><div className="proof-item"><strong>1 click</strong><span>to wipe memory</span></div></div>
            </div>
            <div className="hero-visual">
              <div className="visual-label label-top"><span className="signal-dot" /> ON-DEVICE / ACTIVE</div>
              <div className="visual-grid" aria-hidden="true"><div className="visual-grid-center" /><span className="crosshair c1" /><span className="crosshair c2" /><span className="crosshair c3" /></div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
              <div className="hero-core"><div className="core-icon"><LogoMark /></div><span className="core-label">AURA</span><span className="core-sub">LOCAL INTELLIGENCE</span></div>
              <div className="telemetry telemetry-a"><span>SCREEN</span><strong>CONNECTED</strong><small>01 window / permissioned</small></div>
              <div className="telemetry telemetry-b"><span>VOICE</span><strong>LISTENING</strong><small>16 kHz / transient</small></div>
              <div className="telemetry telemetry-c"><span>REASONING</span><strong>HEXAGON NPU</strong><small>preferred execution path</small></div>
              <div className="visual-note"><ShieldCheck size={14} /> your context is not a product</div>
            </div>
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><ChevronDown size={16} /></div>
        </section>

        <section className="marquee-section" aria-label="AuraDesk capabilities"><div className="marquee-track"><span>SEE CLEARLY</span><i>✦</i><span>HEAR PRIVATELY</span><i>✦</i><span>THINK LOCALLY</span><i>✦</i><span>MOVE WITH FOCUS</span><i>✦</i><span>SEE CLEARLY</span><i>✦</i><span>HEAR PRIVATELY</span><i>✦</i></div></section>

        <section className="section feature-section" id="product"><div className="container"><div className="section-intro"><div><p className="eyebrow">A SECOND BRAIN / WITHOUT THE SECOND SERVER</p><h2>The useful kind of <span>always-on.</span></h2></div><p>Most assistants ask you to bring the context to them. AuraDesk meets you where the work already is — a selected window, a meeting, a thought in motion.</p></div><div className="feature-grid">{featureCards.map(({ icon: Icon, eyebrow, title, copy, accent }) => <article key={eyebrow} className={`feature-card ${accent}`}><div className="feature-top"><span className="feature-icon"><Icon size={19} /></span><span className="feature-number">{eyebrow}</span></div><h3>{title}</h3><p>{copy}</p><a href="#demo">Try this layer <ArrowUpRight size={15} /></a></article>)}</div></div></section>

        <section className="section flow-section" id="flow"><div className="container flow-layout"><div className="flow-copy"><p className="eyebrow">THE AURADESK LOOP</p><h2>Small models.<br /><span>Close attention.</span></h2><p className="flow-lede">One modular loop turns raw context into a useful next step. Every layer can run locally, swap cleanly, and stay quiet until you need it.</p><a href="#demo" className="primary-button compact">Open the workspace <ArrowUpRight size={16} /></a></div><div className="pipeline">{pipeline.map(({ number, label, copy, icon: Icon }, index) => <div className="pipeline-row" key={number}><div className="pipeline-number">{number}</div><div className="pipeline-icon"><Icon size={18} /></div><div className="pipeline-copy"><strong>{label}</strong><span>{copy}</span></div>{index < pipeline.length - 1 && <div className="pipeline-line" />}</div>)}</div></div></section>

        <section className="section privacy-section" id="privacy"><div className="privacy-noise" aria-hidden="true" /><div className="container privacy-layout"><div className="privacy-stamp"><LockKeyhole size={20} /><span>THE PRIVACY<br />PROMISE</span></div><div className="privacy-copy"><p className="eyebrow">A DIFFERENT DEFAULT</p><h2>Your work is not<br /><span>training data.</span></h2><p>Audio is transient. Screens stay permissioned. Short-term memory is bounded, redacted, and one click from gone. No cloud inference in the core loop — ever.</p><div className="privacy-list"><div><Check size={16} /><span>Capture only what you choose</span></div><div><Check size={16} /><span>Redact before copy or export</span></div><div><Check size={16} /><span>Wipe your context instantly</span></div></div></div><div className="privacy-metric"><span>LOCAL</span><strong>100<span>%</span></strong><small>of the core loop</small><div className="metric-line"><i /></div><em>offline-capable / NPU-first</em></div></div></section>

        <section className="section demo-section"><div className="container"><div className="demo-heading"><div><p className="eyebrow">AURA DESK / LIVE CONCEPT</p><h2>See how it feels<br /><span>in the flow.</span></h2></div><p>Click around the prototype. The surface is calm by design: one selected window, one local session, one clear answer.</p></div><DemoConsole /></div></section>

        <section className="section final-section"><div className="container final-inner"><div className="final-mark"><LogoMark /></div><p className="eyebrow">BUILT FOR THE SNAPDRAGON AI LAB</p><h2>Keep the context.<br /><span>Lose the compromise.</span></h2><p>AuraDesk is an individual prototype for a more private desktop future — designed for Snapdragon-powered HP PCs.</p><div className="final-actions"><a className="primary-button" href="#demo">Enter AuraDesk <ArrowUpRight size={17} /></a><a className="github-button" href="https://github.com/AravKotwal18/AuraDesk" target="_blank" rel="noreferrer"><Github size={16} /> View the build</a></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a href="#top" className="brand"><LogoMark /><span>AuraDesk</span></a><span>Private intelligence, right on your desktop.</span><span>© 2026 Arav Kotwal</span></div></footer>
    </div>
  );
}
