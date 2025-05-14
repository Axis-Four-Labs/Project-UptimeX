const notesPath = "../../notes/marlon/";
const authorFullName = "Marlon Selvi";
const authorShortName = "Marlon";

// Set the title at the top
document.getElementById("notes-title").textContent = `These are the academic notes that ${authorFullName} has taken`;

// Check if a file exists using HEAD request
async function tryFileExists(url) {
   try {
      const res = await fetch(url, {
         method: 'HEAD'
      });
      return res.ok;
   } catch {
      return false;
   }
}

async function loadNotes() {
   const grid = document.getElementById("notes-grid");
   const preview = document.getElementById("preview-pane");
   const previewTitle = document.getElementById("preview-title");

   let index = 0;
   let firstNoteLoaded = false;

   const sections = [{
         kind: "quantum",
         prefix: "qnt_",
         cssClass: "quantum-note",
         label: "qnt",
         title: `${authorShortName.toLowerCase()}'s quantum computing notes`
      },
      {
         kind: "crypto",
         prefix: "cry_",
         cssClass: "crypto-note",
         label: "cry",
         title: `${authorShortName.toLowerCase()}'s cryptography notes`
      }
   ];

   for (const section of sections) {
      const title = document.createElement("p");
      title.className = "notes-section-title";
      title.innerHTML = `These are ${section.title}. This is corpus [<span class="notes-corpus-title">${section.label}</span>]`;

      const container = document.createElement("div");
      container.className = `notes-group ${section.kind}-group`;

      section.container = container;

      grid.appendChild(title);
      grid.appendChild(container);
   }

   while (true) {
      let foundAny = false;

      for (const section of sections) {
         const filename = `${section.prefix}${index}.md`;
         const url = notesPath + filename;

         if (await tryFileExists(url)) {
            foundAny = true;

            const note = document.createElement("div");
            note.className = `note-item ${section.cssClass}`;
            note.dataset.kind = section.kind;

            const label = document.createElement("p");
            label.textContent = filename;
            note.appendChild(label);

            section.container.appendChild(note);

            note.onclick = async () => {
               // Update UI
               document.querySelectorAll(".note-item").forEach(n => n.classList.remove("selected"));
               note.classList.add("selected");
               previewTitle.textContent = `Markdown preview for file ${filename}`;

               try {
                  const res = await fetch(url);
                  const markdown = await res.text();

                  // Convert to HTML and inject
                  const html = marked.parse(markdown);
                  preview.innerHTML = `<div class="markdown-preview">${html}</div>`;

                  // Render KaTeX math expressions AFTER injection
                  renderMathInElement(preview, {
                     delimiters: [{
                           left: "$$",
                           right: "$$",
                           display: true
                        },
                        {
                           left: "$",
                           right: "$",
                           display: false
                        }
                     ]
                  });
               } catch (err) {
                  console.error(`Error loading ${filename}:`, err);
                  preview.innerHTML = `<div class="markdown-preview placeholder">Failed to load ${filename}</div>`;
               }
            };

            // Auto-click first loaded note
            if (!firstNoteLoaded) {
               note.click();
               firstNoteLoaded = true;
            }
         }
      }

      if (!foundAny) break;
      index++;
   }
}

// Start
loadNotes();