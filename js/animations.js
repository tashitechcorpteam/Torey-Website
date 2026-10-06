/**
 * Know Motion Media — GSAP motion system
 * ScrollTrigger timelines · pinned sequences · media choreography
 */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 980px)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function init() {
    bootVideos();

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      document.body.classList.add("is-ready");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;
    if (!reduceMotion && typeof Lenis !== "undefined") {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.35,
      });
      window.__kmmLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    impactStats();
    navSolid();
    mediaPreview();
    magneticButtons();

    if (reduceMotion) {
      document.body.classList.add("is-ready");
      return;
    }

    if (!isMobile()) {
      heroExperience();
      upgrdsPinned();
      wldkindDocumentary();
    } else {
      heroMobileFallback();
      upgrdsMobileFallback();
      wldkindMobileFallback();
    }

    horizontalRails();
    craveEnergy();
    craveReelMotion();
    craveReelHover();
    youParallax();
    connectField();
    fadeSections();

    document.body.classList.add("is-ready");

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  });

  /* ---------- Video: autoplay / pause when visible ---------- */
  function bootVideos() {
    const videos = document.querySelectorAll("video");
    videos.forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("muted", "");
    });

    if (reduceMotion) {
      videos.forEach((v) => {
        v.removeAttribute("autoplay");
        v.pause();
      });
      return;
    }

    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const v = entry.target;
              if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                const play = v.play();
                if (play && play.catch) play.catch(() => {});
              } else {
                v.pause();
              }
            });
          },
          { threshold: [0, 0.25, 0.5] }
        )
      : null;

    videos.forEach((v) => {
      if (io) io.observe(v);
      else {
        const play = v.play();
        if (play && play.catch) play.catch(() => {});
      }
    });
  }

  /* ---------- Hero: KMM identity → media expand → handoff ---------- */
  function heroExperience() {
    const hero = document.querySelector(".hero");
    const pin = document.querySelector(".hero__pin");
    const stage = document.querySelector(".hero__stage");
    if (!hero || !pin || !stage) return;

    const wall = gsap.utils.toArray(".hw");
    const copy = document.querySelector(".hero__copy");
    const mark = document.querySelector(".hero__mark");
    const headline = document.querySelector(".hero__headline");
    const lede = document.querySelector(".hero__lede");
    const words = gsap.utils.toArray(".hero__words li");
    const scrollHint = document.querySelector(".hero__scroll");
    const expand = document.querySelector(".hero__expand");
    const lead = document.querySelector(".hw--lead");
    const reel = document.querySelector(".hw--reel");

    if (expand) gsap.set(expand, { opacity: 0, visibility: "hidden", scale: 0.85 });

    const mouse = { x: 0, y: 0 };
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width - 0.5;
      mouse.y = (e.clientY - r.top) / r.height - 0.5;
    });
    gsap.ticker.add(() => {
      [reel, document.querySelector(".hw--a"), document.querySelector(".hw--c")].forEach((el, i) => {
        if (!el) return;
        const strength = [18, 12, 22][i] || 12;
        const media = el.querySelector("img, video") || el;
        gsap.to(media, {
          x: mouse.x * strength * 0.35,
          y: mouse.y * strength * 0.25,
          duration: 0.7,
          overwrite: "auto",
          ease: "power3.out",
        });
      });
    });

    function buildScrollChoreography() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollHint, { opacity: 0, duration: 0.1 }, 0)
        .to(".hw--a", { x: -24, y: -18, duration: 0.35 }, 0.05)
        .to(".hw--b", { x: 20, y: 16, duration: 0.35 }, 0.05)
        .to(".hw--c", { x: 28, y: -10, duration: 0.35 }, 0.05)
        .to(".hw--d", { x: -16, y: 22, duration: 0.35 }, 0.05)
        .to(".hw--e", { y: -20, duration: 0.35 }, 0.05)
        .to(".hw--f", { x: 18, rotate: -4, duration: 0.35 }, 0.05)
        .to(words, { opacity: 0.35, duration: 0.25 }, 0.15)
        .to(lede, { opacity: 0, y: -20, duration: 0.25 }, 0.2)
        .to(copy, { x: -30, duration: 0.4 }, 0.25)
        .to(
          reel,
          {
            width: () => Math.min(window.innerWidth * 0.32, 420),
            height: () => Math.min(window.innerHeight * 0.7, 620),
            top: "15%",
            left: "34%",
            duration: 0.45,
          },
          0.28
        )
        .set(expand, { visibility: "visible" }, 0.45)
        .fromTo(
          expand,
          { opacity: 0, scale: 0.72 },
          { opacity: 1, scale: 1, duration: 0.55, ease: "none" },
          0.48
        )
        .to([lead, reel, ".hw--a", ".hw--b", ".hw--c", ".hw--d", ".hw--e", ".hw--f"], {
          opacity: 0.2,
          duration: 0.35,
        }, 0.5)
        .to(headline, { opacity: 0.25, y: -40, duration: 0.35 }, 0.55)
        .to(mark, { opacity: 0, duration: 0.25 }, 0.58)
        .to(words, { opacity: 0, duration: 0.25 }, 0.6)
        .to(expand, { opacity: 0, scale: 1.08, duration: 0.4 }, 0.85)
        .to(copy, { opacity: 0, duration: 0.3 }, 0.9);
    }

    /* Intro first — build scrub timeline only after identity is settled */
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: buildScrollChoreography,
    });
    intro
      .from(mark, { opacity: 0, y: 28, duration: 0.65 }, 0.05)
      .from(".hw--lead", { opacity: 0, scale: 1.05, duration: 0.95 }, 0.08)
      .from(".hw--reel", { opacity: 0, scale: 1.05, duration: 0.8 }, 0.18)
      .from(headline, { opacity: 0, y: 32, duration: 0.85 }, 0.2)
      .from(".hw--a, .hw--b, .hw--c, .hw--d, .hw--e, .hw--f", {
        opacity: 0,
        scale: 1.05,
        stagger: 0.05,
        duration: 0.6,
      }, 0.32)
      .from(lede, { opacity: 0, y: 24, duration: 0.6 }, 0.45)
      .from(words, { opacity: 0, y: 12, stagger: 0.04, duration: 0.35 }, 0.55)
      .from(scrollHint, { opacity: 0, duration: 0.35 }, 0.7);
  }

  function heroMobileFallback() {
    gsap.from([".hero__copy", ".hw--lead", ".hw--reel"], {
      y: 36,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  function navSolid() {
    const nav = document.getElementById("site-nav");
    const hero = document.querySelector(".hero");
    if (!nav) return;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const pastHero = hero
          ? self.scroll() > hero.offsetTop + Math.min(hero.offsetHeight * 0.55, window.innerHeight * 2)
          : self.scroll() > 80;
        nav.classList.toggle("is-solid", pastHero);
      },
    });
  }

  function upgrdsPinned() {
    const section = document.querySelector(".upgrds__pin");
    const frames = gsap.utils.toArray(".upgrds__frame");
    const captions = [
      "Objects · Places · Ideas",
      "Discovery in motion",
      "Places that shift perspective",
      "Ideas that travel",
      "Phenomena & technology",
      "Culture in motion",
    ];
    const captionEl = document.querySelector("[data-caption]");
    if (!section || !frames.length) return;

    frames.forEach((f, i) => {
      gsap.set(f, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.1,
      });
      f.classList.toggle("is-active", i === 0);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        pin: ".upgrds__stage",
        anticipatePin: 1,
      },
    });

    frames.forEach((frame, i) => {
      if (i === 0) return;
      const prev = frames[i - 1];
      tl.to(prev, { opacity: 0, scale: 1.06, duration: 0.7 }, "+=0.15")
        .to(frame, { opacity: 1, scale: 1, duration: 0.85 }, "<")
        .add(() => {
          frames.forEach((f, idx) => f.classList.toggle("is-active", idx === i));
          if (captionEl) captionEl.textContent = captions[i] || captions[0];
          const vid = frame.querySelector("video");
          if (vid) {
            const p = vid.play();
            if (p && p.catch) p.catch(() => {});
          }
        });
    });

    gsap.from(".upgrds__statement", {
      y: 40,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "25% top",
        scrub: true,
      },
    });
  }

  function upgrdsMobileFallback() {
    document.querySelectorAll(".upgrds__frame").forEach((f, i) => {
      f.classList.toggle("is-active", i === 0);
      f.style.opacity = i === 0 ? "1" : "0";
    });
  }

  function horizontalRails() {
    const rails = [
      { track: ".upgrds__track", trigger: ".upgrds__rail" },
      { track: ".crave__track", trigger: ".crave__strip" },
    ];

    rails.forEach(({ track, trigger }) => {
      const el = document.querySelector(track);
      const parent = document.querySelector(trigger);
      if (!el || !parent) return;

      const getScroll = () => Math.max(el.scrollWidth - parent.clientWidth, 0);

      gsap.to(el, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top 75%",
          end: () => "+=" + Math.max(getScroll(), 500),
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });
    });
  }

  function wldkindDocumentary() {
    const pin = document.querySelector(".wldkind__pin");
    const stage = document.querySelector(".wldkind__stage");
    if (!pin || !stage) return;

    const beatVideo = document.querySelector(".wk__beat--video");
    const beatLand = document.querySelector(".wk__beat--land");
    const beatHabitat = document.querySelector(".wk__beat--habitat");
    const beatLion = document.querySelector(".wk__beat--lion");
    const innerVideo = beatVideo?.querySelector(".wk__beat-inner");
    const innerLand = beatLand?.querySelector(".wk__beat-inner");
    const innerHabitat = beatHabitat?.querySelector(".wk__beat-inner");
    const innerLion = beatLion?.querySelector(".wk__beat-inner");
    const fox = document.querySelector(".wk__frag--fox");
    const detail = document.querySelector(".wk__frag--detail");
    const wide = document.querySelector(".wk__frag--wide");
    const typeOpen = document.querySelector(".wk__type--open");
    const typeMid = document.querySelector(".wk__type--mid");
    const typeClose = document.querySelector(".wk__type--close");

    gsap.set([beatLand, beatHabitat, beatLion], { autoAlpha: 0 });
    gsap.set(typeMid, { autoAlpha: 0, y: 40 });
    gsap.set(typeClose, { autoAlpha: 0, y: 30 });
    gsap.set(fox, { xPercent: 115, autoAlpha: 0 });
    gsap.set(detail, { xPercent: -35, yPercent: 8, autoAlpha: 0 });
    gsap.set(wide, { xPercent: 28, yPercent: 6, autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
        pin: stage,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    /* STATE 1 — full-screen reel, identity */
    tl.to(innerVideo, { scale: 1.12, duration: 1.2 }, 0)
      .to(typeOpen, { y: -24, duration: 1.2 }, 0)

      /* STATE 2 — scale + fox enters */
      .to(innerVideo, { scale: 1.22, duration: 1.4 }, 1.2)
      .to(
        fox,
        { xPercent: 0, autoAlpha: 1, duration: 1.4, ease: "power1.out" },
        1.35
      )
      .to(typeOpen, { y: -48, duration: 1.4 }, 1.2)

      /* STATE 3 — main tightens, detail layer, copy handoff */
      .to(
        innerVideo,
        {
          scale: 0.94,
          clipPath: "inset(6% 8% 6% 8%)",
          duration: 1.5,
        },
        2.6
      )
      .to(
        detail,
        { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 1.3, ease: "power1.out" },
        2.85
      )
      .to(typeOpen, { autoAlpha: 0, y: -80, duration: 0.7 }, 3.1)
      .to(typeMid, { autoAlpha: 1, y: 0, duration: 0.9 }, 3.25)

      /* STATE 4 — editorial drift */
      .to(fox, { x: "-38vw", y: "-4vh", duration: 1.6 }, 4.1)
      .to(detail, { x: "28vw", y: "-6vh", duration: 1.6 }, 4.1)
      .to(innerVideo, { x: "-4vw", duration: 1.6 }, 4.1)
      .to(typeMid, { x: "6vw", duration: 1.6 }, 4.1)

      /* STATE 5 — landscape takeover */
      .to(
        [beatVideo, fox, detail, typeMid],
        { autoAlpha: 0, duration: 0.75 },
        5.7
      )
      .to(beatLand, { autoAlpha: 1, duration: 0.85 }, 5.75)
      .fromTo(
        innerLand,
        { scale: 1.18 },
        { scale: 1.08, duration: 1.8 },
        5.75
      )
      .to(
        wide,
        { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 1.2, ease: "power1.out" },
        6.1
      )

      /* STATE 6 — habitat + outro */
      .to([beatLand, wide], { autoAlpha: 0, duration: 0.65 }, 7.5)
      .to(beatHabitat, { autoAlpha: 1, duration: 0.85 }, 7.55)
      .fromTo(
        innerHabitat,
        { scale: 1.15 },
        { scale: 1.05, duration: 1.4 },
        7.55
      )
      .to(beatHabitat, { autoAlpha: 0, duration: 0.7 }, 8.7)
      .to(beatLion, { autoAlpha: 1, duration: 0.85 }, 8.75)
      .fromTo(
        innerLion,
        { scale: 1.2 },
        { scale: 1, duration: 1.2 },
        8.75
      )
      .to(typeClose, { autoAlpha: 1, y: 0, duration: 1 }, 9)
      .to(innerLion, { y: "-12vh", scale: 1.08, duration: 1.3 }, 9.8)
      .to(typeClose, { y: -36, autoAlpha: 0.85, duration: 1.2 }, 9.8)
      .to(beatLion, { autoAlpha: 0.25, duration: 1, ease: "power1.in" }, 10.5);
  }

  function wldkindMobileFallback() {
    gsap.from(".wk__type--open .wk__headline", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".wldkind",
        start: "top 75%",
      },
    });

    gsap.from(".wk__frag--fox", {
      y: 50,
      opacity: 0,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".wk__frag--fox",
        start: "top 85%",
      },
    });
  }

  function craveEnergy() {
    gsap.from(".crave__copy h2", {
      x: -70,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".crave", start: "top 70%" },
    });

    gsap.from(".cf", {
      opacity: 0,
      scale: 0.92,
      stagger: 0.07,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: ".crave__spread", start: "top 75%" },
    });

    if (isMobile()) return;

    gsap.to(".cf--tall", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".crave__stage",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".cf--sq", {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".crave__stage",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".cf--hero img", {
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: ".crave__stage",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  function craveReelMotion() {
    const reel = document.querySelector(".crave__reel");
    if (!reel || reduceMotion) return;

    gsap.from(".crave__vid", {
      opacity: 0,
      y: 28,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: reel,
        start: "top 88%",
      },
    });
  }

  function craveReelHover() {
    /* CSS hover handles scale(1.02) + Watch hint */
  }

  function youParallax() {
    gsap.from(".you__main", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: ".you", start: "top 70%" },
    });
    gsap.from(".you__side", {
      y: 80,
      opacity: 0,
      duration: 1.05,
      delay: 0.08,
      scrollTrigger: { trigger: ".you", start: "top 70%" },
    });
    gsap.from([".you__float", ".you__portrait"], {
      scale: 0.7,
      opacity: 0,
      duration: 0.95,
      stagger: 0.1,
      delay: 0.15,
      scrollTrigger: { trigger: ".you", start: "top 70%" },
    });

    if (isMobile()) return;
    gsap.to(".you__float", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".you",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  function impactStats() {
    const content = (window.KMM && window.KMM.content) || {};
    const metrics = content.impactMetrics || content.stats || [];
    const lead = document.getElementById("impact-lead");
    if (!lead) return;

    const primary =
      metrics.find((m) => m.primary) ||
      metrics.find((m) => m.id === "views") ||
      metrics[0];
    const secondary = metrics.filter((m) => m !== primary);

    const primaryDisplay = primary
      ? primary.confirmed && primary.value != null
        ? `<span data-count="${primary.value}" data-suffix="${primary.suffix || ""}">0${primary.suffix || ""}</span>`
        : `<span>${primary.display || "XX"}</span>`
      : "";

    const primaryLabel = (primary && primary.label) || "Views Generated";
    const labelLines = primaryLabel.toUpperCase().includes("GENERATED")
      ? primaryLabel.replace(/\s+/g, "<br>")
      : `${primaryLabel}<br>generated`;

    lead.innerHTML = `
      <div class="impact__lead-main">
        <p class="impact__mega">${primaryDisplay}</p>
        <p class="impact__mega-label">${labelLines}</p>
        <p class="impact__mega-note">${(primary && primary.note) || ""}</p>
      </div>
      <div class="impact__secondary" id="impact-stats-slot">
        ${secondary
          .map((s) => {
            const isPlaceholder = !s.confirmed || s.value == null;
            const num = isPlaceholder
              ? `<span class="stat__num">${s.display || "XX"}</span>`
              : `<span class="stat__num" data-count="${s.value}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</span>`;
            return `
              <article class="stat ${isPlaceholder ? "is-placeholder" : ""}">
                ${num}
                <p class="stat__label">${s.label}</p>
                ${s.note ? `<p class="stat__note">${s.note}</p>` : ""}
              </article>`;
          })
          .join("")}
      </div>
    `;

    const legacy = document.getElementById("impact-stats");
    if (legacy) legacy.remove();

    if (reduceMotion) {
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count + (el.dataset.suffix || "");
      });
      return;
    }

    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: end,
            duration: 1.9,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
          });
        },
      });
    });

    gsap.from(".impact__mega", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".impact", start: "top 70%" },
    });
    gsap.from(".impact__mega-label", {
      y: 30,
      opacity: 0,
      duration: 0.85,
      delay: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".impact", start: "top 70%" },
    });
    gsap.from(".impact__secondary .stat", {
      y: 28,
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      delay: 0.25,
      ease: "power3.out",
      scrollTrigger: { trigger: ".impact", start: "top 70%" },
    });
  }

  function connectField() {
    const section = document.querySelector(".connect");
    const mail = document.querySelector(".connect__mail");
    if (!section || !mail) return;

    mail.addEventListener("pointerenter", () => section.classList.add("is-hot"));
    mail.addEventListener("pointerleave", () => section.classList.remove("is-hot"));

    gsap.from(".connect__headline", {
      y: 60,
      opacity: 0,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".connect", start: "top 70%" },
    });
  }

  function mediaPreview() {
    const preview = document.getElementById("media-preview");
    const img = preview && preview.querySelector("img");
    if (!preview || !img || isMobile()) return;

    document.querySelectorAll("[data-preview]").forEach((link) => {
      link.addEventListener("pointerenter", () => {
        img.src = link.dataset.preview;
        preview.classList.add("is-on");
      });
      link.addEventListener("pointerleave", () => {
        preview.classList.remove("is-on");
      });
      link.addEventListener("pointermove", (e) => {
        gsap.to(preview, {
          x: e.clientX + 24,
          y: e.clientY - 40,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    });
  }

  function magneticButtons() {
    if (isMobile()) return;
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.35,
          ease: "power3.out",
        });
      });
      btn.addEventListener("pointerleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
      });
    });
  }

  function fadeSections() {
    gsap.utils.toArray(".ecosystem__title, .upgrds__outro").forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    });

    gsap.from(".ecosystem__list li", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".ecosystem__list", start: "top 78%" },
    });
  }
})();
