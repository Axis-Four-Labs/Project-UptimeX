
const notesGrid = document.getElementById('notes-grid');
const previewPane = document.getElementById('preview-pane');

const directory = "../../../notes/pablo/";
const prefix = "qq_note_";
let index = 0;

previewPane.innerHTML = `<p>Select a note to preview.</p>`;

function loadNextImage() {
  const src = `${directory}${prefix}${index}.png`;
  const img = new Image();

  img.onload = () => {
    const container = document.createElement('div');
    container.className = 'image-container';

    const imageTop = document.createElement('div');
    imageTop.className = 'image-top';

    const displayedImg = document.createElement('img');
    displayedImg.src = src;
    displayedImg.alt = `Note ${index}`;
    imageTop.appendChild(displayedImg);

    const imageBottom = document.createElement('div');
    imageBottom.className = 'image-bottom';
    imageBottom.textContent = `[Quantum] Scanned Note [${index}]`;

    container.appendChild(imageTop);
    container.appendChild(imageBottom);

    container.addEventListener('click', () => {
      document.querySelectorAll('.image-container.selected').forEach(el => {
        el.classList.remove('selected');
      });

      container.classList.add('selected');

      previewPane.innerHTML = `<img src="${src}" alt="Preview">`;
    });

    notesGrid.appendChild(container);
    index++;
    loadNextImage();
  };

  img.onerror = () => {
    if (index === 0) {
      previewPane.innerHTML = `<p>No Data to Show</p>`;
    }
  };

  img.src = src;
}

loadNextImage();
