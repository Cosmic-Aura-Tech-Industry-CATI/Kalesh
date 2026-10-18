import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Users, Target } from "lucide-react";
import ScrollReveal from "./rb/ScrollReveal";
import CountUp from "./rb/CountUp";
import DecryptedText from "./rb/DecryptedText";
import SpotlightCard from "./rb/SpotlightCard";
import "../../styles/pages/about-scroll.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/* Light webp phone screens that already exist in /public/images */
const PHONES = [
  { src: "/images/create_poll-800.webp", alt: "Kalesh create poll screen", from: 18, to: -8 },
  { src: "/images/realtime_poll-800.webp", alt: "Kalesh real-time poll screen", from: 0, to: -22 },
  { src: "/images/anonymous_chat-800.webp", alt: "Kalesh anonymous chat screen", from: 26, to: -4 },
  { src: "/images/anonymous_profile-800.webp", alt: "Kalesh anonymous profile screen", from: 6, to: -26 },
];

const STATS = [
  { value: "100%", label: "Anonymous" },
  { value: "Real-time", label: "Polling" },
  { value: "Zero", label: "Judgment" },
  { value: "Safe", label: "Space" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

/* ScrollReveal needs a plain string child; reduced-motion users get a normal <p>.
   Defined outside the component so it keeps a stable identity between renders. */
function Reveal({ children, textClassName, reduced }) {
  return reduced ? (
    <p className={textClassName}>{children}</p>
  ) : (
    <ScrollReveal
      baseOpacity={0.12}
      baseRotation={2}
      blurStrength={6}
      rotationEnd="bottom bottom"
      wordAnimationEnd="bottom center"
      containerClassName="abt2-reveal"
      textClassName={textClassName}
    >
      {children}
    </ScrollReveal>
  );
}

/* true only when the stacking layout (>= 801px) is active */
function useStackLayout() {
  const [on, setOn] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(min-width: 801px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia?.("(min-width: 801px)");
    if (!mq) return;
    const fn = () => setOn(mq.matches);
    fn();
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return on;
}

export default function AboutSection() {
  const reduced = useReducedMotion();
  const stackOn = useStackLayout();

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const titleInnerRef = useRef(null);
  const stackRef = useRef(null);

  /* ---------- GSAP: hero title split-reveal + phone parallax (scrubbed) ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) letters rise out of a mask on load
        SplitText.create(titleRef.current, {
          type: "chars",
          mask: "chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              duration: 1,
              ease: "power4.out",
              stagger: 0.05,
            }),
        });

        // 2) pinned title recedes while the phones climb over it
        gsap.to(titleInnerRef.current, {
          scale: 0.82,
          opacity: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "35% top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // 3) each phone moves at its own speed
        gsap.utils.toArray(".abt2-phone").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: Number(el.dataset.from) },
            {
              yPercent: Number(el.dataset.to),
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  /* positions of everything below depend on layout: refresh once fonts/images settled */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
    };
  }, []);

  /* ---------- Framer Motion: Problem card gets covered by the Solution card ---------- */
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const problemScale = useTransform(scrollYProgress, [0, 1], [1, 0.9], { clamp: true });
  const problemDim = useTransform(scrollYProgress, [0, 1], [0, 0.55], { clamp: true });
  const animateStack = stackOn && !reduced;

  return (
    <section id="about" className="abt2-section" aria-labelledby="about-title" ref={rootRef}>
      {/* ===== 1. HERO: split-text title + parallax phones (GSAP) ===== */}
      <div className="abt2-hero" ref={heroRef}>
        <div className="abt2-title-wrap">
          <div className="abt2-title-inner" ref={titleInnerRef}>
            <h2 id="about-title" className="abt2-title" ref={titleRef}>
              About Us
            </h2>
            <div className="abt2-underline" aria-hidden="true">
              <span className="abt2-underline-line" />
              <span className="abt2-underline-dot" />
            </div>
          </div>
        </div>

        <div className="abt2-phones">
          {PHONES.map((p) => (
            <div
              className="abt2-phone"
              key={p.src}
              data-from={p.from}
              data-to={p.to}
            >
              <img src={p.src} alt={p.alt} width="800" height="1583" loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== 2. STORY: word-by-word scroll reveal (React Bits ScrollReveal / GSAP) ===== */}
      <div className="abt2-story">
        <Reveal reduced={reduced} textClassName="abt2-lead">
          {
            "Kalesh was created to challenge the way opinions are shared online. In a digital world dominated by profiles, likes, followers, and social validation, many people hesitate to express what they truly feel. Fear of judgment, screenshots, online backlash, and long-term reputation often silence honest voices."
          }
        </Reveal>
        <Reveal reduced={reduced} textClassName="abt2-body">
          {
            "We believe opinions should be valued for their content, not the identity behind them. That’s why Kalesh is built as a fully anonymous, real-time opinion and polling platform where users can speak freely without pressure."
          }
        </Reveal>
        <Reveal reduced={reduced} textClassName="abt2-body">
          {
            "Our platform empowers Gen-Z users, students, introverts, and creators to share thoughts, create live polls, and participate in discussions without revealing who they are. With instant engagement and no popularity bias, every opinion gets a fair chance to be heard."
          }
        </Reveal>
        <Reveal reduced={reduced} textClassName="abt2-body">
          {
            "At the same time, brands, colleges, and institutions gain access to honest, unbiased audience feedback in real time. Backed by strong moderation and safety controls, Kalesh offers a secure, judgment-free space designed for authentic expression."
          }
        </Reveal>
        <motion.p className="abt2-closing" {...fadeUp}>
          Kalesh isn’t just another social platform — it’s a shift toward{" "}
          <span className="abt2-gradient-text">
            real conversations, real opinions, and real engagement
          </span>
        </motion.p>
      </div>

      {/* ===== 3. PROBLEM -> SOLUTION: stacking cards (Framer Motion sticky stack) ===== */}
      <div className="abt2-stack" ref={stackRef}>
        <div className="abt2-slot">
          <motion.article
            className="abt2-card abt2-card-problem"
            style={animateStack ? { scale: problemScale } : undefined}
          >
            <div className="abt2-card-head">
              <span className="abt2-card-icon">
                <Users size={22} aria-hidden="true" />
              </span>
              <h3>The Problem</h3>
            </div>
            <p>
              In today's digital ecosystem, most social media platforms are identity-driven and
              centered around public profiles, likes, and followers, which creates social pressure
              and discourages honest expression. Users often hesitate to share their real opinions
              due to fear of judgment, online backlash, screenshots, and long-term reputational
              impact.
            </p>
            <p>
              This environment particularly affects Gen-Z users, students, and introverts, who lack
              a safe and comfortable space to express themselves freely. Additionally, existing
              platforms prioritize reach based on popularity rather than content relevance, making
              it difficult for new users to be heard and preventing brands and institutions from
              receiving instant, unbiased audience feedback.
            </p>
            {animateStack && (
              <motion.span
                className="abt2-card-dim"
                aria-hidden="true"
                style={{ opacity: problemDim }}
              />
            )}
          </motion.article>
        </div>

        <div className="abt2-slot">
          <article className="abt2-card abt2-card-solution">
            <div className="abt2-card-head">
              <span className="abt2-card-icon">
                <Target size={22} aria-hidden="true" />
              </span>
              <h3>The Solution</h3>
            </div>
            <p>
              Kalesh solves this problem by offering a fully anonymous, real-time opinion and
              polling platform that removes identity pressure and promotes authentic participation.
              Users can create live polls, vote instantly, and engage in discussions without
              revealing their identity, ensuring opinions are judged by content rather than
              personal branding.
            </p>
            <p>
              The real-time engagement model allows users to participate immediately after joining,
              while colleges, brands, and creators gain access to honest and unbiased feedback. With
              strong moderation and safety controls, Kalesh provides a secure, judgment-free
              environment that enables genuine expression and meaningful engagement.
            </p>
          </article>
        </div>
      </div>

      {/* ===== 4. STATS: spotlight cards + count-up / decrypt (React Bits) ===== */}
      <motion.div className="abt2-stats" {...fadeUp}>
        {STATS.map((s, i) => (
          <SpotlightCard
            key={s.label}
            className="abt2-stat"
            spotlightColor="rgba(255, 106, 0, 0.28)"
          >
            <div className="abt2-stat-value">
              {i === 0 ? (
                reduced ? (
                  "100%"
                ) : (
                  <>
                    <span className="abt2-sr">100%</span>
                    <span aria-hidden="true">
                      <CountUp to={100} duration={2} />%
                    </span>
                  </>
                )
              ) : reduced ? (
                s.value
              ) : (
                <DecryptedText
                  text={s.value}
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={55}
                  maxIterations={14}
                />
              )}
            </div>
            <div className="abt2-stat-label">{s.label}</div>
          </SpotlightCard>
        ))}
      </motion.div>
    </section>
  );
}
