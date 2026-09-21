(() => {
  const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!mouse.matches) return;
  const interactive = "a, button, summary, label, video, [role='button'], [data-copy]";

  const cursor = document.createElement("div");
  cursor.className = "gleam-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<div class="gc-pose"><svg viewBox="-124.5 -49.9 549.4 462.6" aria-hidden="true" focusable="false"><g transform="translate(290 215) scale(1.1) translate(-245 -82)"><path d="M347.7 35.5C355.7 30.6 365.4 38.5 362.3 47.3L314.9 182.4C312.1 190.6 300.9 191.5 296.7 183.9L276.2 146.3C275.1 144.2 273.3 142.6 271.2 141.8L230 125.1C222.4 122 221.6 111.5 228.6 107.3L347.7 35.5Z" fill="#5ef0a0" stroke="#0b0d10" stroke-width="13" stroke-linejoin="round"/></g><g class="gc-body"><path d="M104.06 24.3099C105.721 24.1957 108.452 24.4755 109.979 25.0318C125.864 30.8163 127.766 53.1121 128.334 67.1456C129.379 92.9616 124.387 118.458 116.648 142.862C122.498 135.333 126.643 126.23 133.713 119.254C140.237 112.817 159.329 100.411 164.999 114.174C168.479 122.619 162.522 132.795 159.195 140.436C170.98 134.529 183.004 134.231 192.989 143.521C193.489 143.986 194.302 144.681 194.979 144.623C194.655 142.772 193.362 140.007 192.772 138.062C191.654 134.385 190.67 130.714 189.74 126.989C184.229 104.917 181.149 81.8301 182.912 59.0983C183.941 49.3103 186.647 34.7878 194.758 28.4713C212.773 14.4428 235.028 40.9646 245.6 53.3831C248.464 56.7478 251.715 61.8223 254.402 65.5926C276.61 96.7473 288.507 134.443 292.872 172.199C295.3 194.148 295.785 217.509 295.87 239.653C295.885 243.857 295.19 248.097 295.095 252.252C294.857 262.56 293.917 272.795 292.94 283.055C292.045 288.362 291.29 293.89 290.545 299.225C286.887 325.427 268.935 346.59 247.931 361.452C232.01 372.54 213.957 380.2 194.918 383.94C181.348 386.542 171.208 386.537 157.582 386.88C124.286 387.717 93.1456 382.107 65.1654 362.995C43.2074 347.997 25.9539 328.407 20.8432 301.55C18.7547 289.985 17.2905 278.315 16.457 266.592C16.1601 262.087 16.1086 257.315 15.9125 252.757C15.7798 248.915 15.1674 245.019 15.0173 241.195C14.5456 229.179 15.1466 217.634 15.9245 205.671C16.6455 194.584 16.6986 183.354 17.9709 172.248C20.9233 144.156 28.6779 116.78 40.8966 91.3128C42.0136 89.0211 43.1559 86.2168 44.3124 84.0621C45.6481 81.8576 47.0466 79.8056 48.4296 77.6171C59.7866 59.6458 72.5576 40.8876 90.7589 29.2473C95.1999 26.4073 98.9421 25.2711 104.06 24.3099Z" fill="#5ef0a0" stroke="#0b0d10" stroke-width="13" stroke-linejoin="round"/><g class="gc-eyes"><path class="gc-eye" d="M101.191 319.49C111.449 318.102 114.963 312.387 120.944 304.942C122.914 302.27 124.292 299.435 125.66 296.385C132.982 280.052 134.536 262.607 132.706 244.578C130.903 226.805 119.933 193.568 96.7244 195.311C96.6651 195.321 96.6059 195.331 96.5466 195.341C70.8064 197.619 61.6814 245.203 64.4054 265.882C64.9009 269.642 65.0669 274.182 65.8141 277.835C69.3694 295.212 79.5431 321.21 101.191 319.49Z" fill="#0b0d10"/><path class="gc-eye" d="M214.593 319.452C222.272 317.992 227.741 314.487 232.168 307.945C239.713 296.92 244.344 284.162 245.628 270.865C246.36 262.622 246.437 247.927 245.086 239.834C242.104 221.963 231.793 194.03 209.538 195.33C189.481 197.749 179.505 227.315 177.932 244.476C177.251 251.892 177.291 265.165 178.106 272.465C179.734 287.047 186.199 304.992 197.679 314.612C202.894 318.91 208.034 320.015 214.593 319.452Z" fill="#0b0d10"/></g></g></svg></div>';
  document.body.append(cursor);
  document.documentElement.classList.add("has-gleam-cursor");

  const pose = cursor.querySelector(".gc-pose");
  const body = cursor.querySelector(".gc-body");
  const eyes = cursor.querySelector(".gc-eyes");
  const lids = [...cursor.querySelectorAll(".gc-eye")];
  const motion = window.Motion;
  const spring = { type: "spring", visualDuration: 0.28, bounce: 0 };
  const move = (element, values, options = spring) => {
    if (motion) motion.animate(element, values, options);
  };

  let x = 0;
  let y = 0;
  let lastX = 0;
  let frame = 0;
  let settle = 0;
  let pointing = false;
  let pressed = false;

  const draw = () => {
    frame = 0;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const stance = () => {
    move(pose, { scale: pressed ? 0.9 : pointing ? 1.14 : 1 });
    move(body, pointing ? { x: -34, y: 26 } : { x: 0, y: 0 });
  };

  const blink = () => {
    move(lids, { scaleY: [1, 0.1, 1] }, { duration: 0.22, ease: "easeInOut" });
  };
  const blinkLater = () => {
    setTimeout(() => {
      if (!document.hidden && cursor.classList.contains("is-on")) {
        blink();
        if (Math.random() < 0.2) setTimeout(blink, 300);
      }
      blinkLater();
    }, 2200 + Math.random() * 3400);
  };
  blinkLater();

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    x = event.clientX;
    y = event.clientY;
    const moved = x - lastX;
    lastX = x;
    cursor.classList.add("is-on");
    const over = Boolean(event.target.closest?.(interactive));
    if (over !== pointing) {
      pointing = over;
      stance();
    }
    move(pose, { rotate: Math.max(-14, Math.min(14, moved * 0.9)) });
    move(eyes, pointing ? { x: 14, y: -10 } : { x: Math.max(-16, Math.min(16, moved * 2)), y: 0 });
    clearTimeout(settle);
    settle = setTimeout(() => {
      move(pose, { rotate: 0 }, { type: "spring", visualDuration: 0.45, bounce: 0 });
      if (!pointing) move(eyes, { x: 0, y: 0 });
    }, 110);
    if (!frame) frame = requestAnimationFrame(draw);
  }, { passive: true });
  window.addEventListener("pointerdown", () => {
    pressed = true;
    stance();
    blink();
  });
  window.addEventListener("pointerup", () => {
    pressed = false;
    stance();
  });
  document.documentElement.addEventListener("mouseleave", () => cursor.classList.remove("is-on"));
  window.addEventListener("blur", () => cursor.classList.remove("is-on"));
})();
