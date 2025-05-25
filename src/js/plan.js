document.body.classList.add("locked");
const learnBtn = document.getElementById("learnMoreBtn");
const phases   = document.getElementById("phase-columns");
const cinematic = document.getElementById("cinematic-text");

learnBtn.addEventListener("click", e => {
    e.preventDefault();
    document.body.classList.remove("locked");
    learnBtn.style.display = "none";
    phases.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
        phases.classList.remove("opacity-0");
        phases.classList.add("opacity-1");
        cinematic.classList.remove("opacity-0");
        cinematic.classList.add("opacity-1");
    }, 1000);
});

gsap.registerPlugin(SplitText, TextPlugin);
const discoverBtn = document.getElementById("discoverBtn");
const splitter    = new SplitText(discoverBtn, { type: "chars" });
const chars       = splitter.chars;
discoverBtn.addEventListener("click", () => {
  window.location.href = "ProjectUptimeX.html";
});

gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
  .fromTo(chars,
    { rotationY: -90, opacity: 0, transformOrigin: "50% 50%" },
    { duration: 0.6, rotationY: 0, opacity: 1, stagger: 0.05, ease: "back.out" }
  )
  .to(chars,
    { duration: 0.6, rotationY: 90, opacity: 0, stagger: 0.05, ease: "back.in" },
    "+=1"
  ).timeScale(1.2);


