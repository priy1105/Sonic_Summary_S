import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  AudioLines,
  Check,
  CircleHelp,
  Headphones,
  LoaderCircle,
  Mic2,
  Newspaper,
  Plus,
  Radio,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";

type SourceType = "both" | "news" | "reddit";
type RunState = "idle" | "loading" | "done" | "error";

type ComponentData = {
  status?: RunState;
  error?: string;
  audioDataUrl?: string;
  topics?: string[];
};

type GenerateRequest = { requestId: string; topics: string[]; source: SourceType };

type AppProps = {
  data: ComponentData;
  onGenerate: (request: GenerateRequest) => void;
};

const SUGGESTIONS = ["Artificial intelligence", "Climate", "Space"];
const SOURCE_OPTIONS: { id: SourceType; label: string; detail: string; icon: typeof Radio }[] = [
  { id: "both", label: "News + Reddit", detail: "The full picture", icon: Radio },
  { id: "news", label: "News", detail: "Trusted headlines", icon: Newspaper },
  { id: "reddit", label: "Reddit", detail: "Community pulse", icon: AudioLines },
];

export default function App({ data, onGenerate }: AppProps) {
  const [source, setSource] = useState<SourceType>("both");
  const [topics, setTopics] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    if (data.status && data.status !== "idle") {
      setRunState(data.status);
      setError(data.error ?? "");
      setAudioUrl(data.audioDataUrl ?? "");
      if (data.topics) setTopics(data.topics);
    }
  }, [data.status, data.error, data.audioDataUrl, data.topics]);

  const downloadName = useMemo(() => {
    const topic = topics[0]?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return topic ? `sonic-summary-${topic}.mp3` : "sonic-summary.mp3";
  }, [topics]);

  function addTopic(value = draft) {
    const clean = value.trim().replace(/\s+/g, " ");
    if (!clean || topics.some((topic) => topic.toLowerCase() === clean.toLowerCase()) || topics.length >= 3) return;
    setTopics((current) => [...current, clean]);
    setDraft("");
  }

  function onTopicKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTopic();
    }
  }

  function generateBriefing(event: FormEvent) {
    event.preventDefault();
    if (!topics.length || runState === "loading") return;
    setRunState("loading");
    setError("");
    setAudioUrl("");
    onGenerate({ requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`, topics, source });
  }

  const loadingSteps = ["Finding the stories", "Making sense of the conversation", "Recording your briefing"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label="SonicSummary home">
          <span className="brand-mark"><AudioLines size={21} strokeWidth={2.3} /></span>
          <span className="text-[17px] font-bold tracking-[-.04em]">sonic<span className="text-primary">summary</span></span>
        </a>
        <div className="hidden items-center gap-2 rounded-full border bg-white/70 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm sm:flex">
          <span className="live-dot" /> Your daily listening desk
        </div>
        <a href="#how-it-works" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
          <CircleHelp size={17} /> <span className="hidden sm:inline">How it works</span>
        </a>
      </header>

      <main id="top" className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-14 pt-4 sm:px-8 md:pt-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12 lg:px-12 lg:pt-8">
        <section className="min-w-0">
          <div className="mb-7 max-w-2xl">
            <div className="eyebrow"><Sparkles size={14} /> A LITTLE MORE SIGNAL, A LOT LESS SCROLL</div>
            <h1 className="mt-5 max-w-[720px] text-4xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-5xl lg:text-[62px]">
              Catch up on what <span className="headline-accent">matters.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Choose a topic. We’ll bring together the headlines and the conversation, then turn it into a briefing you can listen to anywhere.
            </p>
          </div>

          <Card className="overflow-hidden border-white/80 bg-white/90">
            <CardHeader className="border-b border-border/70 pb-5 sm:px-7 sm:pt-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.15em] text-primary">Your briefing</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">What are you curious about?</h2>
                </div>
                <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-primary sm:flex"><Mic2 size={21} /></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-7 p-5 sm:p-7">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="topic-input" className="text-sm font-semibold">Topics</label>
                  <span className="text-xs text-muted-foreground">Up to 3</span>
                </div>
                <div className="topic-input-wrap" onClick={() => document.getElementById("topic-input")?.focus()}>
                  {topics.map((topic) => (
                    <span className="topic-chip" key={topic}>
                      {topic}
                      <button type="button" aria-label={`Remove ${topic}`} onClick={(event) => { event.stopPropagation(); setTopics((current) => current.filter((item) => item !== topic)); }}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <Input
                    id="topic-input"
                    className="min-w-[170px] flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onTopicKeyDown}
                    placeholder={topics.length ? "Add another topic…" : "Try “artificial intelligence”"}
                    disabled={topics.length >= 3 || runState === "loading"}
                    aria-describedby="topic-help"
                  />
                  {draft.trim() && topics.length < 3 && (
                    <Button type="button" variant="secondary" size="sm" onClick={() => addTopic()}><Plus size={15} /> Add</Button>
                  )}
                </div>
                <p id="topic-help" className="mt-2 text-xs text-muted-foreground">Press Enter to add a topic. A focused brief is usually best.</p>
                {!topics.length && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs text-muted-foreground">Try:</span>
                    {SUGGESTIONS.map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => addTopic(suggestion)} className="suggestion-chip">{suggestion}<ArrowRight size={12} /></button>
                    ))}
                  </div>
                )}
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Listen from</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {SOURCE_OPTIONS.map(({ id, label, detail, icon: Icon }) => (
                    <button
                      className={`source-option ${source === id ? "source-option-active" : ""}`}
                      type="button"
                      key={id}
                      aria-pressed={source === id}
                      onClick={() => setSource(id)}
                    >
                      <span className="source-icon"><Icon size={17} /></span>
                      <span className="min-w-0 text-left"><span className="block text-xs font-semibold">{label}</span><span className="mt-0.5 block truncate text-[10px] text-muted-foreground">{detail}</span></span>
                      {source === id && <Check className="ml-auto text-primary" size={15} />}
                    </button>
                  ))}
                </div>
              </fieldset>

              <form onSubmit={generateBriefing}>
                <Button className="h-12 w-full rounded-xl text-[15px] shadow-[0_10px_22px_-10px_rgba(104,82,219,.7)]" disabled={!topics.length || runState === "loading"}>
                  {runState === "loading" ? <><LoaderCircle className="animate-spin" size={18} /> Building your briefing…</> : <><AudioLines size={18} /> Make my audio briefing <ArrowRight size={17} className="ml-auto" /></>}
                </Button>
              </form>

              {runState === "loading" && (
                <div className="rounded-xl bg-violet-50/80 p-4" role="status" aria-live="polite">
                  <div className="flex items-center gap-3"><LoaderCircle className="animate-spin text-primary" size={18} /><p className="text-sm font-medium">Putting the pieces together</p></div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {loadingSteps.map((step, index) => <div className="flex items-center gap-2 text-[11px] text-muted-foreground" key={step}><span className="step-dot">{index + 1}</span>{step}</div>)}
                  </div>
                  <div className="progress-track mt-4"><span /></div>
                </div>
              )}
              {runState === "error" && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              {runState === "done" && audioUrl && (
                <div className="audio-result" aria-live="polite">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="result-icon"><Headphones size={19} /></span>
                      <div><p className="text-sm font-semibold">Your briefing is ready</p><p className="mt-0.5 text-xs text-muted-foreground">{topics.join(" · ")}</p></div>
                    </div>
                    <a href={audioUrl} download={downloadName} className="download-link"><ArrowDownToLine size={15} /> Download</a>
                  </div>
                  <audio className="mt-4 w-full" controls src={audioUrl} aria-label="Your audio briefing" />
                </div>
              )}
            </CardContent>
          </Card>
          <p className="mt-8 text-center text-xs text-muted-foreground">Made for your ears, not your feed. Briefings are generated just for you.</p>
        </section>

        <aside id="how-it-works" className="space-y-4 lg:pt-2">
          <div className="listen-card relative overflow-hidden rounded-3xl p-6 text-white sm:p-7">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> YOUR PERSONAL NEWSROOM</div>
              <h2 className="mt-6 max-w-[240px] text-2xl font-semibold leading-tight tracking-[-.04em]">The important bits, in your own time.</h2>
              <p className="mt-3 max-w-[245px] text-sm leading-6 text-white/70">A thoughtful, audio-first catch-up built around the things you care about.</p>
              <div className="waveform" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <span key={index} style={{ height: `${12 + ((index * 19 + 7) % 30)}px`, opacity: 0.35 + ((index * 13) % 60) / 100 }} />)}</div>
            </div>
            <div className="listen-orb" aria-hidden="true" />
          </div>

          <Card className="border-white/80 bg-white/80 shadow-sm">
            <CardHeader className="px-5 pb-3 pt-5"><p className="text-sm font-semibold">A simpler way to stay in the loop</p></CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <div className="how-row"><span className="how-icon"><Sparkles size={16} /></span><div><p className="text-xs font-semibold">Pick what matters</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Choose a topic and the sources you trust.</p></div></div>
              <div className="how-row"><span className="how-icon"><Radio size={16} /></span><div><p className="text-xs font-semibold">We connect the dots</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Headlines and community perspectives, brought together.</p></div></div>
              <div className="how-row"><span className="how-icon"><Headphones size={16} /></span><div><p className="text-xs font-semibold">Take it with you</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Listen here or save the MP3 for later.</p></div></div>
            </CardContent>
          </Card>
          <p className="px-2 text-center text-[11px] leading-5 text-muted-foreground">Sources can be selected independently. AI summaries may miss context—explore original reporting for important decisions.</p>
        </aside>
      </main>
      <footer className="mx-auto flex max-w-7xl items-center justify-between border-t border-border/60 px-5 py-5 text-xs text-muted-foreground sm:px-8 lg:px-12">
        <span className="font-semibold tracking-tight text-foreground/70">sonic<span className="text-primary">summary</span></span>
        <span>Less scrolling. Better listening.</span>
      </footer>
    </div>
  );
}
