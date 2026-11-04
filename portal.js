(() => {
  const links = [...document.querySelectorAll('a[data-link-key]')];
  if (!links.length) return;

  const descriptions = {
    administration: ['Administration', 'Leadership, management & school operations', 'Explore school leadership, management information, organisational updates and essential administrative resources.'],
    curricular: ['Curricular', 'Teaching, learning & academic resources', 'A central space for curriculum information, academic planning, teaching resources and learning support.'],
    studentAffairs: ['Student Affairs', 'Student welfare, discipline & support', 'Information and resources supporting pupil welfare, discipline, safety, health and student development.'],
    cocurricular: ['Cocurricular', 'Clubs, societies, sports & activities', 'Discover co-curricular programmes, clubs, societies, sports activities and pupil achievements.'],
    preschool: ['Preschool', 'Preschool information & learning', 'Information for our preschool community, including learning activities, programmes and updates.'],
    specialEducation: ['Special Education', 'Inclusive learning & PPKI information', 'A welcoming space for inclusive education, PPKI programmes, learning support and school activities.'],
    resourceCentre: ['Resource Centre (PSS)', 'PSS NEXUS — reading, discovery & creativity', 'Explore PSS NEXUS, reading initiatives, NILAM, library services, digital creativity and resource-centre programmes.'],
    nexusLearningHub: ['NEXUS Learning Hub', 'Digital learning resources & interactive activities', 'Access digital learning materials, interactive games, quizzes and resources for our learners.'],
    pibg: ['PIBG', 'Parents, teachers & school partnership', 'Stay connected with the parent–teacher community and discover ways to support our school.'],
    youtubeTVPSS: ['YouTube Channel (TVPSS)', 'Stories, events & school productions', 'Watch school stories, event highlights, student productions and TVPSS content.'],
    tiktokOfficial: ['TikTok Official', 'Moments from our school community', 'Discover short updates and moments from the SKDH school community.'],
    facebookOfficial: ['Facebook Official', 'Official updates & school announcements', 'Follow official school announcements, activities, celebrations and community updates.']
  };

  const main = document.querySelector('main');
  const view = document.createElement('main');
  view.id = 'portal-view';
  view.hidden = true;
  main.after(view);

  const style = document.createElement('style');
  style.textContent = `
    #portal-view{min-height:65vh;background:#fff}
    .internal-page{width:min(1120px,89%);margin:0 auto;padding:70px 0 100px}
    .internal-crumb{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9a9187;margin-bottom:42px}
    .internal-crumb a{color:var(--wine);text-decoration:none}
    .internal-page h1{font:clamp(42px,6vw,72px)/1.02 Georgia,serif;letter-spacing:-2px;margin:18px 0}
    .internal-page .lead{font:18px/1.8 Georgia,serif;color:#777;max-width:760px}
    .internal-rule{height:1px;background:var(--line);margin:42px 0}
    .internal-panel{background:var(--cream);padding:30px;border-left:3px solid var(--gold);max-width:760px}
    .internal-panel h2{font:27px Georgia,serif;margin:0 0 10px}
    .internal-panel p{font-size:14px;line-height:1.8;color:#777;margin:0}
    .internal-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
    .internal-actions a,.internal-actions button{display:inline-block;border:0;padding:15px 20px;background:var(--wine);color:#fff;text-decoration:none;font-size:11px;letter-spacing:1px;cursor:pointer}
    .internal-actions button{background:#eee8df;color:var(--wine)}
    @media(max-width:650px){.internal-page{padding:45px 0 70px}.internal-panel{padding:22px}}
  `;
  document.head.append(style);

  function showPage(key, push = true) {
    const data = descriptions[key];
    const source = links.find(a => a.dataset.linkKey === key);
    if (!data || !source) return;
    const url = source.href;
    main.hidden = true;
    view.hidden = false;
    view.innerHTML = `
      <section class="internal-page">
        <div class="internal-crumb"><a href="#home" data-home>SKDH DIGITAL PORTAL</a> &nbsp; / &nbsp; ${data[0]}</div>
        <div class="eyebrow">SK Darulaman Heights · KBA4065</div>
        <h1>${data[0]}</h1>
        <p class="lead">${data[2]}</p>
        <div class="internal-rule"></div>
        <div class="internal-panel">
          <div class="eyebrow">Explore this section</div>
          <h2>${data[1]}</h2>
          <p>This section is part of the official SKDH Digital Portal. More school information and resources will be added here progressively.</p>
          <div class="internal-actions">
            <a href="${url}" target="_blank" rel="noopener">OPEN ${data[0].toUpperCase()} RESOURCE ↗</a>
            <button type="button" data-home>BACK TO PORTAL HOME</button>
          </div>
        </div>
      </section>`;
    if (push) history.pushState({key}, '', '#section/' + key);
    window.scrollTo({top:0, behavior:'smooth'});
    view.querySelectorAll('[data-home]').forEach(el => el.addEventListener('click', goHome));
  }

  function goHome(event) {
    if (event) event.preventDefault();
    view.hidden = true;
    main.hidden = false;
    if (location.hash) history.pushState({}, '', location.pathname + location.search);
    window.scrollTo({top:0, behavior:'smooth'});
  }

  links.forEach(link => link.addEventListener('click', event => {
    const key = link.dataset.linkKey;
    if (!descriptions[key]) return;
    event.preventDefault();
    showPage(key);
  }));

  window.addEventListener('popstate', () => {
    const match = location.hash.match(/^#section\/(.+)$/);
    if (match) showPage(match[1], false);
    else { view.hidden = true; main.hidden = false; }
  });

  const initial = location.hash.match(/^#section\/(.+)$/);
  if (initial) showPage(initial[1], false);
})();