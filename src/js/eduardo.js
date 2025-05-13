const imgNotesPath = "../../notes/eduardo/";
const name = "Eduardo Gaborit"; 

document.getElementById("notes-title").textContent = `These are the academic notes that ${name} has taken`;

async function tryFileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function loadNotes() {
  const grid = document.getElementById('notes-grid');
  const preview = document.getElementById('preview-pane');
  const previewTitle = document.getElementById('preview-title');
  let index = 0;

  while (true) {
    const filename = `quantum_note_${index}.md`;
    const fileURL = imgNotesPath + filename;

    if (await tryFileExists(fileURL)) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note-item';

      const filenameText = document.createElement('p');
      filenameText.textContent = filename;

      noteDiv.appendChild(filenameText);
      grid.appendChild(noteDiv);

      noteDiv.onclick = async () => {
        document.querySelectorAll('.note-item').forEach(el => el.classList.remove('selected'));
        noteDiv.classList.add('selected');
        previewTitle.textContent = `Markdown preview for file ${filename}`;

        try {
          const res = await fetch(fileURL);
          const text = await res.text();
          preview.innerHTML = `<div class="markdown-preview">${marked.parse(text)}</div>`;

          renderMathInElement(preview, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ]
          });

        } catch (err) {
          console.error(err);
          preview.innerHTML = `<div class="markdown-preview placeholder">Failed to load ${filename}</div>`;
        }
      };

      if (index === 0) {
        noteDiv.click(); 
      }

      index++;
    } else {
      break;
    }
  }
}

loadNotes();