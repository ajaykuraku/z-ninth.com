/* ═══════════════════════════════════════════════════════
   z-ninth · main.js
   Handles: nav scroll, mobile drawer, capability tabs,
            scroll-reveal, form submit, counter animation
═══════════════════════════════════════════════════════ */

/* ── NAV: transparent → solid on scroll ─────────────── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.style.borderBottomColor =
          window.scrollY > 20 ? 'rgba(30,32,40,1)' : 'rgba(30,32,40,0.6)';
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── MOBILE DRAWER ──────────────────────────────────── */
(function () {
  const btn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const close = document.getElementById('drawerClose');
  const links = document.querySelectorAll('.drawer-link');
  if (!btn || !drawer) return;

  const open = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const shut = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };

  btn.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  links.forEach(l => l.addEventListener('click', shut));
})();

/* ── CAPABILITY TABS ─────────────────────────────────── */
(function () {
  const tabs = document.querySelectorAll('.cap-tab');
  const panels = document.querySelectorAll('.cap-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('cap-tab--active'));
      panels.forEach(p => p.classList.remove('cap-panel--active'));
      tab.classList.add('cap-tab--active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('cap-panel--active');
    });
  });
})();

/* ── SCROLL REVEAL ───────────────────────────────────── */
(function () {
  const items = document.querySelectorAll(
    '.card, .step, .testi-card, .pricing-card, .faq-item, .section__header, .cta-inner > *, .compare-table'
  );
  items.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach(el => io.observe(el));
})();

/* ── ANIMATED COUNTERS ───────────────────────────────── */
(function () {
  const animateCounter = (el, end, suffix, prefix, decimals) => {
    const duration = 1400;
    const step = 16;
    const steps = duration / step;
    let current = 0;
    const increment = end / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      const display = decimals
        ? current.toFixed(decimals)
        : Math.round(current);
      el.textContent = (prefix || '') + display + (suffix || '');
    }, step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseFloat(el.dataset.end);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      animateCounter(el, end, suffix, prefix, decimals);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-counter]').forEach(el => io.observe(el));
})();

/* ── FORM SUBMIT ─────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');

  // Simulate async send
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  }, 900);
}

/* ── SMOOTH ANCHOR SCROLL ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});







/*chatbot*/
document.addEventListener("DOMContentLoaded", () => {

  const chatBtn = document.getElementById("chatBtn");
  const chatbot = document.getElementById("chatbot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatBody = document.querySelector(".chat-body");

  /* OPEN CHAT */

  chatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    chatbot.style.display = "block";
  });

  /* CLOSE CHAT */

  closeChat.addEventListener("click", () => {
    chatbot.style.display = "none";
  });

  /* SEND MESSAGE */

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
      sendMessage();
    }
  });

  function sendMessage(){

    const message = userInput.value.trim();

    if(message === "") return;

    chatBody.innerHTML += `
      <div class="user-message">
        ${message}
      </div>
    `;

    const text = message.toLowerCase();

    let reply = "";

    /* Greetings */

    if(
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey")
    ){

      reply = `
      Hello 👋

      Welcome to Z-Ninth.

      We help businesses transform through Salesforce Solutions, Data, AI, and MuleSoft Integration.

      How can I assist you today?
      `;

    }

    /* How are you */

    else if(
      text.includes("how are you")
    ){

      reply = `
      I'm doing great, thank you!

      I'm here to help you explore Salesforce, Data, AI, MuleSoft, and Digital Transformation solutions offered by Z-Ninth.
      `;

    }

    /* Salesforce */

    else if(
      text.includes("salesforce") ||
      text.includes("sales")
     
    ){

      reply = `
      Z-Ninth delivers Salesforce solutions that help businesses improve customer relationships, automate workflows, increase productivity, and accelerate growth.
      `;

    }

    /* MuleSoft */

    else if(
      text.includes("mulesoft")
    ){

      reply = `
      Our MuleSoft experts connect applications, systems, and data sources to create seamless enterprise integration and faster business operations.
      `;

    }

    /* AI */

    else if(
      text.includes("ai") ||
      text.includes("artificial intelligence")
    ){

      reply = `
      We help organizations leverage AI to automate processes, improve decision-making, enhance customer experiences, and unlock business value.
      `;

    }

    /* Data */

    else if(
      text.includes("data")
    ){

      reply = `
      Our Data and Analytics solutions transform raw business data into meaningful insights that drive smarter decisions and better outcomes.
      `;

    }

    /* Services */

    else if(
      text.includes("services")
    ){

      reply = `
      Our core services include:

      • Salesforce Solutions
      • MuleSoft Integration
      • Data Cloud
      • AI Solutions
      • Digital Transformation Consulting
      `;
    }

    /* Vision */

    else if(
      text.includes("vision") ||
      text.includes("company")
    ){

      reply = `
      Z-Ninth envisions a future where businesses transform through the power of Salesforce Solutions, Data, and AI.

      Our mission is to help organizations innovate, integrate, and grow through intelligent technology solutions.
      `;
    }

    /* Default */

    else{

      reply = `
      Thank you for reaching out.

      Z-Ninth specializes in Salesforce, MuleSoft, Data, AI, and Digital Transformation solutions.

      Could you tell me more about your business requirement?
      `;
    }

    setTimeout(() => {

      chatBody.innerHTML += `
        <div class="bot-message" style="margin-top:12px;">
          ${reply}
        </div>
      `;

      chatBody.scrollTop = chatBody.scrollHeight;

    }, 500);

    userInput.value = "";
  }

});