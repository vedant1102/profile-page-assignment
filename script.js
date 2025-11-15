document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle')
  const navLinks = document.querySelector('.nav-links')
  const header = document.querySelector('header')
  const navAnchors = document.querySelectorAll('.nav-links a')
  const sections = document.querySelectorAll('section[id]')
  const backToTop = document.getElementById('backToTop')
  const viewButtons = document.querySelectorAll('.view-project')
  const modal = document.getElementById('project-modal')
  const modalImg = document.getElementById('modal-img')
  const modalTitle = document.getElementById('modal-title')
  const modalDesc = document.getElementById('modal-desc')
  const modalLink = document.getElementById('modal-link')
  const modalClose = modal ? modal.querySelector('.modal-close') : null

  // Experience Slider Elements
  const experienceSlider = document.querySelector('.experience-slider')
  const experienceSlides = document.querySelectorAll('.experience-slide')
  const sliderPrev = document.querySelector('.slider-prev')
  const sliderNext = document.querySelector('.slider-next')
  const sliderDots = document.querySelectorAll('.dot')
  
  // Current slide index
  let currentSlide = 0

  // Menu toggle (accessible)
  if (menuToggle && navLinks) {
    menuToggle.setAttribute('role', 'button')
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.addEventListener('click', function () {
      const expanded = navLinks.classList.toggle('active')
      menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    })
  }

  // Smooth scroll for nav links + close mobile menu
  navAnchors.forEach((a) =>
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const offset = header ? header.offsetHeight : 0
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset + 5
      window.scrollTo({ top, behavior: 'smooth' })
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active')
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false')
      }
    })
  )

  // Active nav link on scroll
  function updateActiveLink() {
    const scrollY = window.pageYOffset
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - (header ? header.offsetHeight : 0) - 10
      const sectionHeight = sec.offsetHeight
      const id = sec.getAttribute('id')
      const link = document.querySelector('.nav-links a[href="#' + id + '"]')
      if (!link) return
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }
  updateActiveLink()
  window.addEventListener('scroll', function () {
    updateActiveLink()
    if (backToTop) {
      if (window.pageYOffset > 400) backToTop.classList.add('visible')
      else backToTop.classList.remove('visible')
    }
  })

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // Project modal handlers
  if (viewButtons && modal) {
    viewButtons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault()
        const title = this.dataset.title || ''
        const img = this.dataset.img || ''
        const desc = this.dataset.desc || ''
        if (modalImg) {
          modalImg.src = img
          modalImg.alt = title
        }
        if (modalTitle) modalTitle.textContent = title
        if (modalDesc) modalDesc.textContent = desc
        if (modalLink) modalLink.href = '#'
        modal.classList.add('open')
        modal.setAttribute('aria-hidden', 'false')
        document.body.style.overflow = 'hidden'
      })
    })
  }

  function closeModal() {
    if (!modal) return
    modal.classList.remove('open')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  if (modalClose) modalClose.addEventListener('click', closeModal)
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal()
    })
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open'))
      closeModal()
  })

  // Contact form validation (simulated submit)
  const contactForm = document.querySelector('.contact-form form')
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()
      const name = this.querySelector('#name')
        ? this.querySelector('#name').value.trim()
        : ''
      const email = this.querySelector('#email')
        ? this.querySelector('#email').value.trim()
        : ''
      const message = this.querySelector('#message')
        ? this.querySelector('#message').value.trim()
        : ''
      if (!name || !email || !message) {
        alert('Please fill in name, email and message.')
        return
      }
      const success = document.createElement('div')
      success.className = 'form-success'
      success.textContent =
        'Message sent! Thanks — I will get back to you shortly.'
      this.appendChild(success)
      this.reset()
      setTimeout(() => success.remove(), 4000)
    })
  }

  // Experience Slider Functionality
  function showSlide(index) {
    // Hide all slides
    experienceSlides.forEach(slide => {
      slide.classList.remove('active')
    });
    
    // Remove active class from all dots
    sliderDots.forEach(dot => {
      dot.classList.remove('active')
    });
    
    // Show the current slide and update dot
    experienceSlides[index].classList.add('active')
    sliderDots[index].classList.add('active')
    
    // Update current slide index
    currentSlide = index
  }

  // Next slide
  if (sliderNext) {
    sliderNext.addEventListener('click', function() {
      let nextSlide = currentSlide + 1
      if (nextSlide >= experienceSlides.length) {
        nextSlide = 0
      }
      showSlide(nextSlide)
    })
  }

  // Previous slide
  if (sliderPrev) {
    sliderPrev.addEventListener('click', function() {
      let prevSlide = currentSlide - 1
      if (prevSlide < 0) {
        prevSlide = experienceSlides.length - 1
      }
      showSlide(prevSlide)
    })
  }

  // Dot navigation
  sliderDots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-index'))
      showSlide(slideIndex)
    })
  })

  // Auto slide every 5 seconds
  setInterval(() => {
    let nextSlide = currentSlide + 1
    if (nextSlide >= experienceSlides.length) {
      nextSlide = 0
    }
    showSlide(nextSlide)
  }, 5000)

  // --- Added: reveal-on-scroll + project-card tilt (unique touches) ---

  // 1) Mark key elements to be revealed (no HTML changes required)
  const toRevealSelectors = [
    '.hero-content',
    '.about-text',
    '.project-card',
    '.timeline-content',
    '.contact-form',
    '.footer-content',
  ]
  toRevealSelectors.forEach((sel) =>
    document.querySelectorAll(sel).forEach((el) => el.classList.add('reveal'))
  )

  // 2) IntersectionObserver to add .in-view (safe fallback)
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const revealEls = document.querySelectorAll('.reveal')
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !prefersReduced) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 }
      )
      revealEls.forEach((el) => observer.observe(el))
    } else {
      // fallback: reveal immediately (or if reduced motion, keep as-is)
      revealEls.forEach((el) => el.classList.add('in-view'))
    }
  }

  // 3) Project card 3D tilt effect (disabled for reduced-motion)
  if (!prefersReduced) {
    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach((card) => {
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const ry = ((x - cx) / cx) * -6 // rotateY
        const rx = ((y - cy) / cy) * 6 // rotateX
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
      }
      const handleLeave = () => {
        card.style.transform = ''
        card.style.transition = 'transform 0.45s cubic-bezier(.16,1,.3,1)'
        setTimeout(() => (card.style.transition = ''), 500)
      }
      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
      card.addEventListener('touchstart', () => {}, { passive: true })
    })
  }
})