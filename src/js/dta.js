const LEVEL_CONFIG = {
    0: { title: 'The Launchpad', cats: ['Quantum Mechanics'] },
    1: { title: 'Foundations', cats: ['Mathematics', 'Programming', 'Quantum Computing'] },
    2: { title: 'Blueprints', cats: ['Advanced Mathematics', 'Machine Learning', 'Network Infrastructure'] },
    3: { title: 'Integration', cats: ['Systems Programming', 'Cryptography', 'Cybersecurity'] },
    4: { title: 'Vanguard', cats: ['Formal Methods', 'Code Auditing', 'Secure Architectures'] },
    5: { title: 'Mastery', cats: ['Post-Quantum Cryptography', 'Quantum Forensics', 'Autonomous Security'] }
};
let currentLevel = '0', pathData = null;

fetch('/src/JSON/path-data.json')
    .then(r => r.json())
    .then(json => {
        pathData = json;
        wireLevelClicks();
        updateHeader();
        buildCategories();
        renderCards();
    });

function wireLevelClicks() {
    document.querySelectorAll('.sidebar .nav-link[data-level]')
        .forEach(el => el.addEventListener('click', e => {
            e.preventDefault();
            currentLevel = el.dataset.level;
            document.querySelectorAll('.sidebar .nav-link[data-level]')
                .forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            updateHeader();
            buildCategories();
            renderCards();
        }));
}

function updateHeader() {
    const wrap = document.getElementById('headerWrap'),
        title = document.getElementById('levelTitle');
    title.textContent = LEVEL_CONFIG[currentLevel].title;
    wrap.classList.remove('animate');
    void wrap.offsetWidth;
    wrap.classList.add('animate');
}

function buildCategories() {
    const cont = document.getElementById('levelCats'),
        cats = LEVEL_CONFIG[currentLevel].cats;
    cont.innerHTML = cats.map((c, i) => `
        <a class="nav-link${i === 0 ? ' active' : ''}" data-cat="${c}" href="#">
          ${c === 'all' ? 'All' : c[0].toUpperCase() + c.slice(1)}
        </a>
      `).join('');
    cont.classList.remove('animate');
    void cont.offsetWidth;
    cont.classList.add('animate');
    cont.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            cont.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
            a.classList.add('active');
            renderCards();
        });
    });
}

function renderCards() {
    const cat = document.querySelector('#levelCats .nav-link.active').dataset.cat,
        items = (cat === 'all')
            ? [].concat(...Object.values(pathData[currentLevel]).filter(v => Array.isArray(v)))
            : (pathData[currentLevel][cat] || []),
        grid = document.querySelector('.cards-grid');

    grid.innerHTML = items.length
        ? items.map(it => `
          <div class="card">
            <div class="card-meta">
              <!-- you can add a date field in your JSON later -->
              <div class="card-category">${it.category || ''}</div>
              <div class="date">${it.date || ''}</div>
            </div>
            <div class="card-body">
              <div class="card-title">${it.title}</div>
              <div class="card-text">${it.desc}</div>
            </div>
          </div>`).join('')
        : `<p style="color:#555">No items in “${cat}.”</p>`;

    grid.classList.remove('animate');
    void grid.offsetWidth;
    grid.classList.add('animate');
}
