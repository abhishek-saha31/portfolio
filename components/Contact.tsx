"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { profile } from "@/lib/content";

function DownloadIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

export default function Contact() {
  const [note, setNote] = useState<{ msg: string; kind: string }>({
    msg: "",
    kind: "",
  });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (profile.web3formsKey === "YOUR_WEB3FORMS_KEY") {
      setNote({
        msg: "Add your Web3Forms access key to enable sending.",
        kind: "err",
      });
      return;
    }
    setSending(true);
    setNote({ msg: "Sending…", kind: "" });
    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, access_key: profile.web3formsKey }),
      });
      const json = await res.json();
      if (json.success) {
        setNote({ msg: "Sent. I’ll get back to you soon.", kind: "ok" });
        form.reset();
      } else {
        setNote({ msg: "Something went wrong — try again or email me directly.", kind: "err" });
      }
    } catch {
      setNote({ msg: "Network error — try again or email me directly.", kind: "err" });
    }
    setSending(false);
  };

  return (
    <section
      id="contact"
      className="relative px-5 pb-[clamp(110px,17vh,210px)] pt-[clamp(110px,17vh,210px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(40px,6vw,90px)] min-[861px]:grid-cols-2">
        <Reveal>
          <div className="font-serif text-[clamp(38px,6vw,80px)] font-extralight leading-[1.04] tracking-[-0.03em]">
            Let&apos;s build something
            <br />
            <em className="italic text-signal-soft">deliberate</em>.
          </div>
          <div className="mt-9">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3.5 rounded-[44px] border border-line px-7 py-4 font-mono text-[clamp(14px,1.6vw,17px)] text-ink transition-all hover:gap-5 hover:border-signal hover:bg-signal/[0.06]"
            >
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_#ff6a3d]" />
              {profile.email}
            </a>
          </div>
          <div className="mt-10 flex gap-7 font-mono text-[12px] uppercase tracking-[0.08em]">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-ink-dim transition-colors hover:text-signal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="flex flex-col gap-[18px]">
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                Your email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded border border-line bg-panel px-4 py-[15px] text-[15px] text-ink transition-colors placeholder:text-ink-faint focus:border-signal focus:bg-[#16191f] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="What's this about?"
                className="w-full rounded border border-line bg-panel px-4 py-[15px] text-[15px] text-ink transition-colors placeholder:text-ink-faint focus:border-signal focus:bg-[#16191f] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                Message
              </label>
              <textarea
                name="message"
                required
                placeholder="Tell me a little more…"
                className="min-h-[130px] w-full resize-y rounded border border-line bg-panel px-4 py-[15px] text-[15px] leading-[1.6] text-ink transition-colors placeholder:text-ink-faint focus:border-signal focus:bg-[#16191f] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-1.5 inline-flex items-center justify-center gap-3 rounded bg-signal px-[26px] py-[17px] font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-bg transition-all hover:gap-4 hover:bg-signal-soft disabled:opacity-50"
            >
              Send message →
            </button>
            {note.msg && (
              <div
                className={`min-h-[18px] font-mono text-[12px] tracking-[0.03em] ${
                  note.kind === "ok"
                    ? "text-cyan"
                    : note.kind === "err"
                    ? "text-signal"
                    : "text-ink-faint"
                }`}
              >
                {note.msg}
              </div>
            )}
          </form>
        </Reveal>
      </div>

      <Reveal className="mt-[54px] flex justify-center">
        <a
          href={profile.cvFile}
          download
          className="inline-flex items-center gap-2.5 rounded-[30px] border border-line bg-white/[0.02] px-[18px] py-[11px] font-mono text-[12px] font-semibold uppercase tracking-[0.05em] text-ink transition-all hover:gap-3.5 hover:border-signal hover:bg-signal/[0.08]"
        >
          <DownloadIcon />
          Download Resume
        </a>
      </Reveal>
    </section>
  );
}
