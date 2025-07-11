// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.name || !data.email || !data.service || !data.message) {
        alert("Por favor, completa todos los campos obligatorios.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Por favor, introduce un email válido.")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Enviando..."
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("¡Gracias por tu consulta! Te contactaremos pronto.")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
      } else {
        navbar.style.backgroundColor = "#000"
      }
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .project-card, .event-card, .process-step")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Add loading animation for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"

    // If image is already loaded
    if (img.complete) {
      img.style.opacity = "1"
    }
  })

  // Active navigation link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")

    if (hero && scrolled < window.innerHeight) {
      const rate = scrolled * -0.2
      hero.style.transform = `translateY(${rate}px)`
    }
  })

  // Add interactive effects to service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Create and add scroll to top button
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add some performance optimizations
  let ticking = false

  function updateScrollEffects() {
    // Update navbar background
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
      } else {
        navbar.style.backgroundColor = "#000"
      }
    }

    // Update scroll to top button
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects)
      ticking = true
    }
  }

  // Optimized scroll listener
  window.addEventListener("scroll", requestTick)

  // Add loading state
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
    console.log("FlatOut website loaded successfully!")
  })

  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      console.warn("Failed to load image:", this.src)
      // You could add a placeholder image here
    })
  })

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close mobile menu if open
      if (hamburger && navMenu) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    }
  })

  // Initialize any additional features
  initializeCounters()

  // Hero Background Slider
  initializeHeroSlider()
})

// Hero Background Slider function
function initializeHeroSlider() {
  const slides = document.querySelectorAll('.hero-bg-slide')
  let currentSlide = 0

  if (slides.length === 0) return

  // Function to show specific slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active')
      if (i === index) {
        slide.classList.add('active')
      }
    })
  }

  // Function to go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000)

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }
  })
}

// Counter animation function
function initializeCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100

    function updateCounter() {
      const current = Number.parseInt(counter.innerText)
      if (current < target) {
        counter.innerText = Math.ceil(current + increment)
        setTimeout(updateCounter, 20)
      } else {
        counter.innerText = target
      }
    }

    // Start counter when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(counter)
  })
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 1000) {
  element.style.animation = `${animation} ${duration}ms ease-out`

  element.addEventListener(
    "animationend",
    () => {
      element.style.animation = ""
    },
    { once: true },
  )
}
