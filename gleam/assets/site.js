(() => {
  const header = document.getElementById("top");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );

  const motion = window.Motion;
  const root = document.documentElement;
  if (motion && root.classList.contains("m")) {
    window.__gleamMotion = true;
    const { animate, inView, press, stagger } = motion;
    const settle = { type: "spring", visualDuration: 0.6, bounce: 0 };
    const quick = { type: "spring", visualDuration: 0.25, bounce: 0 };

    const intro = [...document.querySelectorAll(".hero-copy > *")];
    animate(intro, { opacity: [0, 1], y: [20, 0] }, { ...settle, delay: stagger(0.08, { startDelay: 0.1 }) });
    animate(".hero-shot", { opacity: [0, 1], y: [28, 0], scale: [0.98, 1] }, { ...settle, visualDuration: 0.8, delay: 0.3 });
    animate(".hero-pointer", { opacity: [0, 1], x: [-24, 0], y: [18, 0] }, { ...settle, delay: 0.9 });

    const reveals = [...document.querySelectorAll(".reveal")].filter((element) => !element.closest(".hero"));
    reveals.forEach((element) => {
      const siblings = [...element.parentElement.children].filter((child) => child.classList.contains("reveal"));
      const place = siblings.indexOf(element) % 3;
      inView(element, () => {
        animate(element, { opacity: [0, 1], y: [24, 0] }, { ...settle, delay: place * 0.07 });
      }, { margin: "0px 0px -8% 0px", amount: 0.1 });
    });

    document.querySelectorAll(".award-mascot, .faq-mascot, .final-mascot, .person img").forEach((mascot, index) => {
      inView(mascot, () => {
        animate(mascot, { opacity: [0, 1], y: [18, 0], rotate: [-8, 0], scale: [0.9, 1] }, { ...settle, delay: 0.15 + (index % 3) * 0.08 });
      }, { amount: 0.4 });
    });

    inView(".award-card", () => {
      animate(".bar i", { scaleX: [0, 1] }, { type: "spring", visualDuration: 0.9, bounce: 0, delay: stagger(0.1, { startDelay: 0.25 }) });
    }, { amount: 0.3 });

    press(".btn, .announce, .chip, .hash button", (element) => {
      animate(element, { scale: 0.96 }, quick);
      return () => animate(element, { scale: 1 }, quick);
    });
  } else {
    root.classList.remove("m");
  }

  const chips = [...document.querySelectorAll(".chip")];
  const chipName = document.querySelector("[data-chip-name]");
  const chipUse = document.querySelector("[data-chip-use]");
  const chipNeed = document.querySelector("[data-chip-need]");
  const selectChip = (chip) => {
    chips.forEach((other) => {
      other.setAttribute("aria-selected", String(other === chip));
      other.tabIndex = other === chip ? 0 : -1;
    });
    chipName.textContent = `${chip.textContent.trim()}.`;
    chipUse.textContent = chip.dataset.use;
    chipNeed.textContent = chip.dataset.need;
  };
  chips.forEach((chip, index) => {
    chip.tabIndex = chip.getAttribute("aria-selected") === "true" ? 0 : -1;
    chip.addEventListener("click", () => selectChip(chip));
    chip.addEventListener("keydown", (event) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      const next = chips[(index + step + chips.length) % chips.length];
      selectChip(next);
      next.focus();
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) =>
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select and copy";
      }
      setTimeout(() => (button.textContent = "Copy"), 1600);
    }),
  );
})();
