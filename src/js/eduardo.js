
const notesGrid = document.getElementById('notes-grid');
const previewPane = document.getElementById('preview-pane');

const directory = "../../../notes/eduardo/";
const prefix = "qq_note_";
let index = 0;

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
script.onload = () => {
  previewPane.innerHTML = `
    <div class="markdown-preview placeholder">
      <p>Select a note to preview.</p>
    </div>`;
  loadNextNote();
};
document.head.appendChild(script);

function loadNextNote() {
  const filename = `${prefix}${index}.md`;
  const src = `${directory}${filename}`;

  fetch(src)
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .then(markdown => {
      const container = document.createElement("div");
      container.className = "image-container";

      const imageTop = document.createElement("div");
      imageTop.className = "image-top";
      imageTop.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
          <path fill="currentColor" d="M26 30H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2M6 4v24h20V4Z"/>
          <path fill="currentColor" d="M22 15H10v-2h12zm-2 5h-8v-2h8z"/>
        </svg>
      `;

      const imageBottom = document.createElement("div");
      imageBottom.className = "image-bottom";
      imageBottom.textContent = filename;

      container.appendChild(imageTop);
      container.appendChild(imageBottom);

      container.addEventListener("click", () => {
        document.querySelectorAll('.image-container.selected').forEach(el => {
          el.classList.remove('selected');
        });

        container.classList.add("selected");

        const html = marked.parse(markdown);
        previewPane.innerHTML = `<div class="markdown-preview">${html}</div>`;
      });

      notesGrid.appendChild(container);
      index++;
      loadNextNote();
    })
    .catch(() => {
      if (index === 0) {
        previewPane.innerHTML = `
          <div class="markdown-preview placeholder">
            <p>No Markdown Notes Available</p>
          </div>`;
      }
    });
}
