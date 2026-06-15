const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

if (window.lucide) {
  window.lucide.createIcons();
}

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

menuButton.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('nav-open', isOpen);
  menuButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" aria-hidden="true"></i>`;
  if (window.lucide) window.lucide.createIcons();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.enter-topic').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.topic !== '1') {
      showToast('This topic is being prepared. Topic 1 is ready to explore.');
      return;
    }

    topicDetail.hidden = false;
    window.setTimeout(() => {
      topicDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  });
});

document.querySelectorAll('.resource-button').forEach((button) => {
  button.addEventListener('click', () => showToast(`${button.dataset.resource} preview will open here.`));
});

document.getElementById('teaching-materials').addEventListener('click', () => {
  showToast('Teaching materials hub is ready for your team files.');
});

