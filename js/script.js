/* ==========================================================================
   MUSHROOMIA — script.js
   Vanilla JavaScript only. Organized by feature.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initStickyNavbar();
  initScrollReveal();
  initBackToTop();
  initRecipeModal();
  initContactForm();
});

/* ----- Mobile Navigation (hamburger menu) ----- */
function initMobileNav() {
  var toggle = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    links.classList.add('is-open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close the menu when a navigation item is clicked */
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ----- Sticky Navbar shadow on scroll ----- */
function initStickyNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

/* ----- Scroll Animations (IntersectionObserver) ----- */
function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { observer.observe(el); });
}

/* ----- Back To Top Button ----- */
function initBackToTop() {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  function toggleVisibility() {
    if (window.scrollY > 480) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----- Recipe Data & Modal ----- */
var RECIPES = {
  'garlic-butter': {
    name: 'Garlic Butter Oyster Mushrooms',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=900&q=80',
    prepTime: '10 minutes',
    cookTime: '10 minutes',
    servings: '2 servings',
    ingredients: [
      '250g oyster mushrooms, torn into strips',
      '2 tbsp butter',
      '4 garlic cloves, finely chopped',
      '1 tbsp olive oil',
      'Salt and black pepper, to taste',
      '1 tbsp chopped parsley',
      '1/2 lemon, juiced'
    ],
    steps: [
      'Heat the olive oil and butter together in a wide pan over medium-high heat.',
      'Add the mushrooms in a single layer and cook undisturbed for 2–3 minutes until golden.',
      'Add the garlic and stir-fry for 1 minute until fragrant.',
      'Season with salt and pepper, then cook for a further 3–4 minutes until tender.',
      'Finish with lemon juice and chopped parsley, then serve warm.'
    ]
  },
  'crispy-fry': {
    name: 'Crispy Oyster Mushroom Fry',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=900&q=80',
    prepTime: '15 minutes',
    cookTime: '15 minutes',
    servings: '3 servings',
    ingredients: [
      '300g oyster mushrooms, shredded',
      '3 tbsp rice flour',
      '2 tbsp corn flour',
      '1 tsp chili powder',
      '1/2 tsp turmeric',
      '1 tsp ginger-garlic paste',
      'Salt, to taste',
      'Oil, for shallow frying'
    ],
    steps: [
      'Mix the rice flour, corn flour, chili powder, turmeric, ginger-garlic paste and salt in a bowl.',
      'Toss the mushrooms in the dry mix until evenly coated.',
      'Heat oil in a pan over medium heat and shallow fry the mushrooms in batches.',
      'Fry until golden and crisp on all sides, about 3–4 minutes per batch.',
      'Drain on paper towels and serve hot with a side of chutney.'
    ]
  },
  'curry': {
    name: 'Oyster Mushroom Curry',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',
    prepTime: '15 minutes',
    cookTime: '25 minutes',
    servings: '4 servings',
    ingredients: [
      '400g oyster mushrooms, torn into pieces',
      '2 onions, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 tsp curry powder',
      '1/2 tsp turmeric',
      '150ml coconut milk',
      '2 tbsp oil',
      'Salt, to taste',
      'Coriander leaves, to garnish'
    ],
    steps: [
      'Heat oil in a pot and sauté the onions until golden brown.',
      'Add the ginger-garlic paste and cook for 1 minute.',
      'Stir in the tomato puree, curry powder and turmeric, cooking until the oil separates.',
      'Add the mushrooms and salt, and cook for 5 minutes until they soften.',
      'Pour in the coconut milk and simmer gently for 10 minutes.',
      'Garnish with coriander leaves and serve with rice or flatbread.'
    ]
  },
  'stir-fry': {
    name: 'Mushroom Stir Fry',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
    prepTime: '10 minutes',
    cookTime: '8 minutes',
    servings: '2 servings',
    ingredients: [
      '250g oyster mushrooms, sliced',
      '1 bell pepper, julienned',
      '1 carrot, julienned',
      '2 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '2 garlic cloves, minced',
      '1 tbsp vegetable oil',
      'Spring onions, to garnish'
    ],
    steps: [
      'Heat the vegetable oil in a wok over high heat.',
      'Add the garlic and stir-fry for 30 seconds until fragrant.',
      'Add the mushrooms, pepper and carrot, and stir-fry for 3–4 minutes.',
      'Pour in the soy sauce, oyster sauce and sesame oil, tossing to coat evenly.',
      'Cook for a further 2 minutes, garnish with spring onions and serve immediately.'
    ]
  },
  'creamy-pasta': {
    name: 'Creamy Mushroom Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=900&q=80',
    prepTime: '10 minutes',
    cookTime: '20 minutes',
    servings: '3 servings',
    ingredients: [
      '250g pasta of choice',
      '300g oyster mushrooms, sliced',
      '2 tbsp butter',
      '3 garlic cloves, minced',
      '200ml fresh cream',
      '50g parmesan, grated',
      'Salt and black pepper, to taste',
      'Fresh thyme, to garnish'
    ],
    steps: [
      'Cook the pasta in salted boiling water until al dente, then drain and set aside.',
      'Melt the butter in a pan and sauté the mushrooms until golden.',
      'Add the garlic and cook for 1 minute until fragrant.',
      'Pour in the cream and simmer gently for 3–4 minutes.',
      'Stir in the parmesan, salt and pepper until the sauce thickens slightly.',
      'Toss the cooked pasta through the sauce and garnish with fresh thyme before serving.'
    ]
  },
  'soup': {
    name: 'Mushroom Soup',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    servings: '4 servings',
    ingredients: [
      '350g oyster mushrooms, chopped',
      '1 onion, diced',
      '2 garlic cloves, minced',
      '2 tbsp butter',
      '2 tbsp flour',
      '750ml vegetable stock',
      '100ml milk or cream',
      'Salt and black pepper, to taste',
      'Chives, to garnish'
    ],
    steps: [
      'Melt the butter in a pot and sauté the onion and garlic until soft.',
      'Add the mushrooms and cook for 5–6 minutes until they release their moisture.',
      'Sprinkle in the flour and stir for 1 minute to remove the raw taste.',
      'Gradually add the stock, stirring continuously, and bring to a simmer.',
      'Cook for 12–15 minutes, then blend partially or fully for your preferred texture.',
      'Stir in the milk or cream, season to taste, and garnish with chives before serving.'
    ]
  }
};

function initRecipeModal() {
  var overlay = document.getElementById('recipe-modal');
  if (!overlay) return;

  var modal = overlay.querySelector('.modal');
  var closeBtn = overlay.querySelector('.modal-close');
  var mediaImg = overlay.querySelector('.modal-media img');
  var titleEl = overlay.querySelector('.modal-title');
  var metaPrep = overlay.querySelector('[data-meta="prep"]');
  var metaCook = overlay.querySelector('[data-meta="cook"]');
  var metaServings = overlay.querySelector('[data-meta="servings"]');
  var ingredientsList = overlay.querySelector('.modal-ingredients');
  var stepsList = overlay.querySelector('.modal-steps');
  var lastFocusedElement = null;

  function openModal(recipeKey) {
    var recipe = RECIPES[recipeKey];
    if (!recipe) return;

    lastFocusedElement = document.activeElement;

    mediaImg.src = recipe.image;
    mediaImg.alt = recipe.name;
    titleEl.textContent = recipe.name;
    metaPrep.textContent = 'Prep: ' + recipe.prepTime;
    metaCook.textContent = 'Cook: ' + recipe.cookTime;
    metaServings.textContent = recipe.servings;

    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ingredientsList.appendChild(li);
    });

    stepsList.innerHTML = '';
    recipe.steps.forEach(function (step) {
      var li = document.createElement('li');
      li.textContent = step;
      stepsList.appendChild(li);
    });

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('[data-recipe]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-recipe'));
    });
  });

  closeBtn.addEventListener('click', closeModal);

  /* Close when clicking outside the modal box */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ----- Contact Form Validation ----- */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successBox = document.getElementById('form-success');

  var fields = {
    name: { el: form.querySelector('#name'), validate: validateName },
    email: { el: form.querySelector('#email'), validate: validateEmail },
    phone: { el: form.querySelector('#phone'), validate: validatePhone },
    subject: { el: form.querySelector('#subject'), validate: validateSubject },
    message: { el: form.querySelector('#message'), validate: validateMessage }
  };

  function validateName(value) {
    if (!value.trim()) return 'Please enter your name.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  }

  function validateEmail(value) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Please enter your email address.';
    if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
    return '';
  }

  function validatePhone(value) {
    var pattern = /^[0-9+\-\s()]{7,15}$/;
    if (!value.trim()) return 'Please enter your phone number.';
    if (!pattern.test(value.trim())) return 'Please enter a valid phone number.';
    return '';
  }

  function validateSubject(value) {
    if (!value.trim()) return 'Please enter a subject.';
    return '';
  }

  function validateMessage(value) {
    if (!value.trim()) return 'Please enter your message.';
    if (value.trim().length < 10) return 'Message should be at least 10 characters.';
    return '';
  }

  function showError(field, message) {
    var group = field.el.closest('.form-group');
    var errorEl = group.querySelector('.field-error');
    if (message) {
      group.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateField(key) {
    var field = fields[key];
    var message = field.validate(field.el.value);
    showError(field, message);
    return !message;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener('blur', function () {
      validateField(key);
    });
    fields[key].el.addEventListener('input', function () {
      if (fields[key].el.closest('.form-group').classList.contains('has-error')) {
        validateField(key);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault(); /* Prevent actual form submission — static site, no backend */

    var isValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) isValid = false;
    });

    if (!isValid) {
      successBox.classList.remove('is-visible');
      return;
    }

    /* Show success message and reset the form */
    successBox.classList.add('is-visible');
    form.reset();
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(function () {
      successBox.classList.remove('is-visible');
    }, 6000);
  });
}
