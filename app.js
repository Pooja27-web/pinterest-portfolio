/* ==========================================================================
   POOJASHREE H - PINTEREST PORTFOLIO INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Lock to Light Theme
  document.body.removeAttribute('data-theme');

  /* --------------------------------------------------------------------------
     1. Live Clock for Bangalore, India
     -------------------------------------------------------------------------- */
  const liveClock = document.getElementById('live-clock');
  function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (liveClock) liveClock.textContent = now.toLocaleTimeString('en-US', options);
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* --------------------------------------------------------------------------
     2. Poojashree's Real Projects Data Model
     -------------------------------------------------------------------------- */
  const projectsData = {
    1: {
      title: "WARLENS — Public Sentiment Analysis",
      category: "NLP & Data Science",
      date: "2026",
      image: "assets/images/warlens_nlp_dashboard.jpg",
      description: "Manually curated and structured a dataset of war-related news articles and reports into a structured format for NLP sentiment classification & text mining.",
      techStack: ["Python", "NLP", "Pandas", "TextBlob"],
      demoUrl: "https://github.com/Pooja27-web/WARLENS---NLP-PROJECT",
      githubUrl: "https://github.com/Pooja27-web/WARLENS---NLP-PROJECT"
    },
    2: {
      title: "CarbonTrace — AI Carbon Footprinter",
      category: "AI Sustainability",
      date: "1M1B Internship",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      description: "AI-based estimation tool calculating daily carbon output from travel, energy, and diet with personalized eco-reduction recommendations. Built during 1M1B internship.",
      techStack: ["AI Models", "JavaScript", "Netlify"],
      demoUrl: "https://carbontracev2.netlify.app/",
      githubUrl: "https://carbontracev2.netlify.app/"
    },
    3: {
      title: "Electric Vehicle Market Intelligence Dashboard",
      category: "Power BI & DAX",
      date: "2026",
      image: "assets/images/powerbi_ev_dashboard.jpg",
      description: "Analyzed 100,000+ EV records across 5 interactive dashboards. Formulated 10+ custom DAX measures and derived 15+ key business insights regarding EV adoption.",
      techStack: ["Power BI", "Power Query", "DAX"],
      demoUrl: "https://github.com/Pooja27-web/Electric-Vehicle-Population-Data--Power-BI-",
      githubUrl: "https://github.com/Pooja27-web/Electric-Vehicle-Population-Data--Power-BI-"
    },
    4: {
      title: "CampusCart — Campus E-Commerce",
      category: "Fullstack Web",
      date: "2025",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
      description: "Campus buying and selling marketplace platform built with REST APIs and Express backend for seamless peer-to-peer student commerce.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      demoUrl: "https://github.com/Pooja27-web/CampusCart-FSD",
      githubUrl: "https://github.com/Pooja27-web/CampusCart-FSD"
    }
  };

  /* --------------------------------------------------------------------------
     3. Chart.js Analytics Sandbox Widget
     -------------------------------------------------------------------------- */
  const ctx = document.getElementById('sandboxChart');
  let myChart;

  const sandboxDatasets = {
    ev: {
      label: 'EV Market Growth (Units in Thousands)',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025 (Est)', '2026 (Target)'],
      data: [12, 28, 45, 68, 89, 115, 140],
      borderColor: '#0284C7',
      backgroundColor: 'rgba(2, 132, 199, 0.15)'
    },
    sentiment: {
      label: 'WARLENS Public Sentiment Score Breakdown (%)',
      labels: ['Positive Insights', 'Neutral Reports', 'Negative Sentiment', 'Urgent Bulletins'],
      data: [35, 42, 15, 8],
      borderColor: '#E60023',
      backgroundColor: 'rgba(230, 0, 35, 0.15)'
    },
    carbon: {
      label: 'CarbonTrace Estimated CO2 Reduction (kg/month)',
      labels: ['Travel Optimization', 'Renewable Energy', 'Dietary Shift', 'Waste Reduction'],
      data: [120, 95, 60, 45],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.15)'
    }
  };

  if (ctx) {
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sandboxDatasets.ev.labels,
        datasets: [{
          label: sandboxDatasets.ev.label,
          data: sandboxDatasets.ev.data,
          borderColor: sandboxDatasets.ev.borderColor,
          backgroundColor: sandboxDatasets.ev.backgroundColor,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { family: 'Plus Jakarta Sans', weight: 'bold' } } }
        },
        scales: {
          y: { grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });

    const sandboxBtns = document.querySelectorAll('.sandbox-btn');
    sandboxBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sandboxBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const datasetKey = btn.getAttribute('data-dataset');
        const selected = sandboxDatasets[datasetKey];

        myChart.data.labels = selected.labels;
        myChart.data.datasets[0].label = selected.label;
        myChart.data.datasets[0].data = selected.data;
        myChart.data.datasets[0].borderColor = selected.borderColor;
        myChart.data.datasets[0].backgroundColor = selected.backgroundColor;
        myChart.update();

        showToast(`Chart updated to: ${selected.label}`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Category Filter Tabs
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const pinCards = document.querySelectorAll('.pin-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      pinCards.forEach(pin => {
        const category = pin.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          pin.style.display = 'block';
        } else {
          pin.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Pin Likes Counter
     -------------------------------------------------------------------------- */
  const pinSaveBtns = document.querySelectorAll('.pin-save-btn');
  pinSaveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const likeCountSpan = btn.querySelector('.like-count');
      let currentLikes = parseInt(likeCountSpan.textContent, 10);
      
      if (!btn.classList.contains('liked')) {
        btn.classList.add('liked');
        btn.style.color = '#E60023';
        likeCountSpan.textContent = currentLikes + 1;
        showToast('Saved to your collection! ❤️');
      } else {
        btn.classList.remove('liked');
        btn.style.color = '';
        likeCountSpan.textContent = currentLikes - 1;
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Project Modal Viewer
     -------------------------------------------------------------------------- */
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');

  pinCards.forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.getAttribute('data-id');
      const data = projectsData[id];

      if (data) {
        modalImg.src = data.image;
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.category;
        modalDesc.textContent = data.description;
        modalDemoBtn.href = data.demoUrl;
        modalGithubBtn.href = data.githubUrl;

        modalTech.innerHTML = data.techStack.map(tech => `<span>${tech}</span>`).join('');
        modalBackdrop.classList.add('open');
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => modalBackdrop.classList.remove('open'));

  /* --------------------------------------------------------------------------
     7. Actions & Toast System
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('ph089683@gmail.com').then(() => {
        showToast('Email copied: ph089683@gmail.com');
      });
    });
  }

  /* Video Presentation Modal Listener */

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! Thank you for reaching out.');
      contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     9. Live Search Input for Projects Grid
     -------------------------------------------------------------------------- */
  const pinSearchInput = document.getElementById('pin-search-input');
  if (pinSearchInput) {
    pinSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      pinCards.forEach(pin => {
        const text = pin.textContent.toLowerCase();
        if (text.includes(query)) {
          pin.style.display = 'block';
        } else {
          pin.style.display = 'none';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. Inline PDF Preview Modal System
     -------------------------------------------------------------------------- */
  const pdfModalBackdrop = document.getElementById('pdf-preview-modal');
  const pdfModalCloseBtn = document.getElementById('pdf-modal-close-btn');
  const pdfModalIframe = document.getElementById('pdf-modal-iframe');
  const pdfModalTitle = document.getElementById('pdf-modal-title');
  const pdfModalDownload = document.getElementById('pdf-modal-download');

  window.openPdfModal = function(url, title) {
    if (pdfModalBackdrop && pdfModalIframe) {
      pdfModalIframe.src = url;
      if (pdfModalTitle) pdfModalTitle.innerHTML = `<i class="fa-solid fa-file-pdf" style="color:#E60023;"></i> ${title}`;
      if (pdfModalDownload) pdfModalDownload.href = url;
      pdfModalBackdrop.classList.add('open');
    }
  };

  if (pdfModalCloseBtn) {
    pdfModalCloseBtn.addEventListener('click', () => {
      if (pdfModalBackdrop) pdfModalBackdrop.classList.remove('open');
      if (pdfModalIframe) pdfModalIframe.src = '';
    });
  }

  // Intercept online preview links to open in modal
  document.querySelectorAll('a[href="Poojashree_H_American_ATS_Resume.html"], a[href="cv.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const title = href.includes('ATS') ? 'Poojashree H — Data Analyst Resume (ATS)' : 'Poojashree H — Curriculum Vitae (CV)';
      openPdfModal(href, title);
    });
  });

  /* --------------------------------------------------------------------------
     11. Quick Recruiter Presets Autofill
     -------------------------------------------------------------------------- */
  const presetChips = document.querySelectorAll('.preset-chip');
  const messageArea = document.getElementById('message');

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (messageArea) {
        messageArea.value = msg;
        messageArea.focus();
        showToast('Preset loaded into message field! ✍️');
      }
    });
  });

  /* --------------------------------------------------------------------------
     12. 3D Tilt & Magnetic Physics Controller
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-card, .pin-card, .cert-card, .story-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  /* --------------------------------------------------------------------------
     13. Interactive Pink Dotted Custom Cursor Physics
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = document.querySelectorAll('a, button, .pin-card, .sticky-note, .stat-card, .cert-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  /* --------------------------------------------------------------------------
     14. Draggable Sticky Notes Handler
     -------------------------------------------------------------------------- */
  const stickyNotes = document.querySelectorAll('.sticky-note');
  stickyNotes.forEach(note => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    note.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = note.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      note.style.position = 'fixed';
      note.style.left = `${initialLeft}px`;
      note.style.top = `${initialTop}px`;
      note.style.zIndex = '1000';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      note.style.left = `${initialLeft + dx}px`;
      note.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        note.style.zIndex = '10';
      }
    });
  });

  /* --------------------------------------------------------------------------
     15. Navbar Scroll Shrink & Spotlight Command Palette (Ctrl + K)
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (navbar) navbar.classList.add('shrunk');
    } else {
      if (navbar) navbar.classList.remove('shrunk');
    }
  });

  const cmdModalBackdrop = document.getElementById('cmd-palette-modal');
  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');
  const cmdCloseBtn = document.getElementById('cmd-close-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmdPalette() {
    if (cmdModalBackdrop) {
      cmdModalBackdrop.classList.add('open');
      if (cmdInput) {
        cmdInput.value = '';
        setTimeout(() => cmdInput.focus(), 100);
      }
    }
  }

  function closeCmdPalette() {
    if (cmdModalBackdrop) cmdModalBackdrop.classList.remove('open');
  }

  if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', openCmdPalette);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmdPalette();
    }
    if (e.key === 'Escape') closeCmdPalette();
  });

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cmdItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCmdPalette();

      if (action === 'download-resume') {
        window.open('assets/Poojashree_H_American_ATS_Resume.pdf', '_blank');
        showToast('Downloading Resume PDF... 📄');
      } else if (action === 'download-cv') {
        window.open('assets/Poojashree_H_Curriculum_Vitae.pdf', '_blank');
        showToast('Downloading CV PDF... 📜');
      } else if (action === 'view-ev-project') {
        const evPin = document.querySelector('.pin-card[data-id="3"]');
        if (evPin) evPin.click();
      } else if (action === 'view-warlens') {
        const nlpPin = document.querySelector('.pin-card[data-id="1"]');
        if (nlpPin) nlpPin.click();
      } else if (action === 'copy-email') {
        navigator.clipboard.writeText('ph089683@gmail.com');
        showToast('Email copied to clipboard! 📋');
      } else if (action === 'copy-phone') {
        navigator.clipboard.writeText('+918050606420');
        showToast('Phone number copied to clipboard! 📞');
      }
    });
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (toast && toastMessage) {
      toastMessage.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

});

