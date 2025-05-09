const track = document.getElementById('timelineTrack');
const levels = document.querySelectorAll('.timeline-labels .level');

const filledLevels = 0;
track.innerHTML = "";

const popupContent = {
  Level0: "Level 0: Prerequisites\n• Apr 15 – May 12\n• May 13 – Jun 9\n• Jun 10 – Jun 25",
  Level1: "Level 1: Fundamentals\n• Jun 26 – Jul 21\n• Jul 22 – Aug 19\n• Aug 20 – Sep 1",
  Level2: "Level 2: Core Knowledge\n• Sep 2 – Oct 12\n• Oct 13 – Dec 1\n• Dec 2 – Jan 15",
  Level3: "Level 3: Advanced Systems\n• Jan 16 – Mar 1\n• Mar 2 – Apr 20\n• Apr 21 – May 16",
  Level4: "Level 4: Post-Quantum Systems\n• May 17 – Jul 15\n• Jul 16 – Oct 31\n• Nov 1 – Dec 15"
};

levels.forEach((level, i) => {
  const labelEl = level.querySelector('.level-label');
  const label = labelEl?.textContent.trim().replace(/\s+/g, '');

  const segmentWrapper = document.createElement('div');
  segmentWrapper.classList.add('timeline-segment-wrapper');

  const segment = document.createElement('div');
  segment.classList.add('timeline-segment');
  if (label) segment.classList.add(`timeline-segment-${label}`);
  if (i < filledLevels) segment.classList.add('filled');

  if (popupContent[label]) {
    const popup = document.createElement('div');
    popup.classList.add('timeline-popup');
    popup.innerText = popupContent[label];

    if (i < filledLevels) {
      popup.classList.add('filled-popup');
    }

    // if you see this, we're there
    if (filledLevels === 5) {
      const northwesternLogo = document.getElementById("nw-logo")
      northwesternLogo.textContent = "PhD Admitted"
    }

    segmentWrapper.appendChild(popup);
  }

  segmentWrapper.appendChild(segment);
  track.appendChild(segmentWrapper);
});
