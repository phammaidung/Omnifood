///////////////////////////////////////////////////////////

// Set current year
const yearEl = document.querySelector('.year');
const curYear = new Date().getFullYear();
yearEl.textContent = curYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const headerEl = document.querySelector('.header');
const toggleBtnEl = document.querySelector('.btn-mobile-nav');

toggleBtnEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile nav
    if (link.classList.contains('main-nav-link')) {
      headerEl.classList.toggle('nav-open');
    }
  });
});

///////////////////////////////////////////////////////////
// Visible button back to top

const btnUpToTop = document.querySelector('.btn-up-nav');

function visibleBtnBackTop() {
  window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Get the height of the window
    const windowHeight = window.innerHeight;

    if (scrollPosition > windowHeight) {
      btnUpToTop.classList.add('visible');
    } else {
      btnUpToTop.classList.remove('visible');
    }
  });
}
visibleBtnBackTop();

///////////////////////////////////////////////////////////
// Sticky Navigation

const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      document.body.classList.add('sticky');
    }
    if(entry.isIntersecting) {
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();



