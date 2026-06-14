const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const topicDetail = document.getElementById('topic-detail');
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

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide) window.lucide.createIcons();
  });
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

const playOne = document.getElementById('play-episode-one');
const actionOne = document.getElementById('episode-one-action');
const statusOne = document.getElementById('episode-one-status');
const episodeOne = document.getElementById('episode-one');
const progressOne = document.getElementById('audio-progress-one');
const elapsedOne = document.getElementById('elapsed-one');
const episodeTwo = document.getElementById('episode-two');
const statusTwo = document.getElementById('episode-two-status');
const actionTwo = document.getElementById('episode-two-action');
const playTwo = document.getElementById('play-episode-two');
const lockedMessage = document.getElementById('locked-message');
const connectorFill = document.getElementById('connector-fill');
const topicProgress = document.getElementById('progress-number');

let episodeOneState = 'ready';
let playbackTimer;
let playbackProgress = 0;

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function completeEpisodeOne() {
  window.clearInterval(playbackTimer);
  episodeOneState = 'completed';
  playbackProgress = 100;
  progressOne.style.width = '100%';
  elapsedOne.textContent = '3:45';
  statusOne.className = 'status status-completed';
  statusOne.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Completed';
  actionOne.textContent = 'Completed';
  actionOne.disabled = true;
  playOne.innerHTML = '<i data-lucide="check" aria-hidden="true"></i>';
  playOne.disabled = true;
  episodeOne.style.borderColor = '#a7c957';

  episodeTwo.classList.remove('locked');
  episodeTwo.removeAttribute('aria-disabled');
  statusTwo.className = 'status status-available';
  statusTwo.innerHTML = '<i data-lucide="radio" aria-hidden="true"></i> Available';
  actionTwo.disabled = false;
  playTwo.disabled = false;
  lockedMessage.hidden = true;
  connectorFill.style.height = '100%';
  topicProgress.textContent = '50%';
  refreshIcons();
  showToast('Episode 1 complete. Episode 2 is now unlocked.');
}

function toggleEpisodeOne() {
  if (episodeOneState === 'completed') return;

  if (episodeOneState === 'playing') {
    episodeOneState = 'paused';
    window.clearInterval(playbackTimer);
    actionOne.textContent = 'Resume Podcast 1';
    playOne.innerHTML = '<i data-lucide="play" aria-hidden="true"></i>';
    refreshIcons();
    return;
  }

  episodeOneState = 'playing';
  actionOne.textContent = 'Playing Podcast 1';
  playOne.innerHTML = '<i data-lucide="pause" aria-hidden="true"></i>';
  refreshIcons();

  playbackTimer = window.setInterval(() => {
    playbackProgress += 2;
    progressOne.style.width = `${playbackProgress}%`;
    const simulatedSeconds = Math.round((playbackProgress / 100) * 225);
    const minutes = Math.floor(simulatedSeconds / 60);
    const seconds = String(simulatedSeconds % 60).padStart(2, '0');
    elapsedOne.textContent = `${minutes}:${seconds}`;

    if (playbackProgress >= 100) completeEpisodeOne();
  }, 160);
}

playOne.addEventListener('click', toggleEpisodeOne);
actionOne.addEventListener('click', toggleEpisodeOne);

function playSecondEpisode() {
  if (actionTwo.disabled) return;
  showToast('Episode 2 is ready. Audio playback would begin here.');
  actionTwo.textContent = 'Episode 2 Ready';
}

playTwo.addEventListener('click', playSecondEpisode);
actionTwo.addEventListener('click', playSecondEpisode);

document.querySelectorAll('.resource-button').forEach((button) => {
  button.addEventListener('click', () => showToast(`${button.dataset.resource} preview will open here.`));
});

document.getElementById('teaching-materials').addEventListener('click', () => {
  showToast('Teaching materials hub is ready for your team files.');
});

