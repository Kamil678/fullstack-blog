import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/posts/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) setPosts(data.posts);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-center">
        {/* Gradient blobs — widoczne w obu trybach */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl animate-pulse opacity-20 dark:opacity-20"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 dark:opacity-15"
            style={{
              background: "radial-gradient(circle, #3b82f6, transparent 70%)",
              animation: "pulse 4s ease-in-out infinite 1s",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-3xl opacity-10 dark:opacity-10"
            style={{ background: "radial-gradient(ellipse, #0891b2, transparent 70%)" }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          className={`relative z-10 max-w-3xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Blog & Artykuły</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 text-slate-900 dark:text-slate-100">
            Wiedza, którą{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #0891b2 0%, #2563eb 60%, #7c3aed 100%)" }}
            >
              warto czytać
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
            Artykuły o programowaniu, narzędziach i nowoczesnym webdevelopmencie. Bez lania wody — tylko konkrety.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/search"
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
              style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)" }}
            >
              Przeglądaj artykuły
              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#posts"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-transparent px-7 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            >
              Ostatnie posty
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
            visible ? "opacity-40" : "opacity-0"
          }`}
        >
          <div className="h-10 w-px bg-gradient-to-b from-cyan-500 dark:from-cyan-400 to-transparent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">Scroll</span>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800">
          {[
            { value: posts.length > 0 ? `${posts.length}+` : "∞", label: "Artykułów" },
            { value: "100%", label: "Bezpłatnie" },
            { value: "24/7", label: "Dostępne" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-4 gap-1">
              <span
                className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent leading-none"
                style={{ backgroundImage: "linear-gradient(135deg, #0891b2, #6366f1)" }}
              >
                {value}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="bg-white dark:bg-slate-950 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <CallToAction />
        </div>
      </div>

      {/* ─── POSTS ─── */}
      {posts && posts.length > 0 && (
        <section id="posts" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/60 py-24 px-6">
          {/* Top glow line */}
          <div
            className="absolute top-0 left-1/2 h-px w-[480px] -translate-x-1/2"
            style={{ background: "linear-gradient(90deg, transparent, rgba(8,145,178,0.4), transparent)" }}
          />

          {/* Bottom ambient */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-[600px] opacity-0 dark:opacity-10 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #0891b2, transparent 70%)" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Świeże treści</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">Ostatnie artykuły</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link
                to="/search"
                className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 transition-all duration-200 hover:opacity-70"
              >
                Zobacz wszystkie artykuły
                <svg
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── FOOTER BANNER ─── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-24 px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-5 dark:opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, #0891b2, transparent)" }}
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">Zostań na bieżąco</h2>
          <p className="mb-8 text-slate-500 dark:text-slate-400 leading-relaxed">
            Nowe artykuły regularnie. Sprawdź wszystkie posty lub wróć wkrótce.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30"
            style={{ background: "linear-gradient(135deg, #0891b2, #4f46e5)" }}
          >
            Wszystkie artykuły
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
