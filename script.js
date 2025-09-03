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

    // Close mobile menu when window resizes to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
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
  const animatedElements = document.querySelectorAll(".kit-card, .event-card, .process-step")
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

  // Initialize any additional features
  initializeCounters()

  // Hero Background Slider
  initializeHeroSlider()
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

  // Hero Background Slider
  initializeHeroSlider()

  // Initialize kit modal functionality
  initializeKitModal()

  // Create and add scroll to top button
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

// Kit Modal Functions (Global scope)
function openKitModal(kitType) {
  const modal = document.getElementById('kitModal')
  const modalTitle = document.getElementById('modalTitle')
  const selectedKit = document.getElementById('selectedKit')
  
  // Set kit type
  selectedKit.value = kitType
  
  // Update modal title based on kit type
  const kitTitles = {
    'estetica': 'Solicitar Presupuesto - Kit Estética',
    'performance': 'Solicitar Presupuesto - Kit Performance',
    '4x4': 'Solicitar Presupuesto - Kit 4x4'
  }
  
  modalTitle.textContent = kitTitles[kitType] || 'Solicitar Presupuesto'
  
  // Show modal with animation
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  
  // Add entrance animation
  const modalContent = modal.querySelector('.modal-content')
  modalContent.style.transform = 'scale(0.7) translateY(-50px)'
  modalContent.style.opacity = '0'
  
  setTimeout(() => {
    modalContent.style.transition = 'all 0.3s ease'
    modalContent.style.transform = 'scale(1) translateY(0)'
    modalContent.style.opacity = '1'
  }, 10)
  
  // Focus on first input
  setTimeout(() => {
    const firstInput = document.getElementById('kitName')
    if (firstInput) {
      firstInput.focus()
    }
  }, 100)
}

function closeKitModal() {
  const modal = document.getElementById('kitModal')
  const modalContent = modal.querySelector('.modal-content')
  
  // Add exit animation
  modalContent.style.transition = 'all 0.3s ease'
  modalContent.style.transform = 'scale(0.7) translateY(-50px)'
  modalContent.style.opacity = '0'
  
  setTimeout(() => {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
    
    // Reset form
    const form = document.getElementById('kitQuoteForm')
    if (form) {
      form.reset()
    }
    
    // Reset modal content position
    modalContent.style.transform = ''
    modalContent.style.opacity = ''
    modalContent.style.transition = ''
  }, 300)
}

// Initialize kit modal functionality
function initializeKitModal() {
  // Kit quote form handling
  const kitQuoteForm = document.getElementById('kitQuoteForm')
  
  if (kitQuoteForm) {
    kitQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      // Get form data
      const formData = new FormData(kitQuoteForm)
      const data = Object.fromEntries(formData)
      
      // Validation
      if (!data.name || !data.email || !data.vehicle) {
        alert('Por favor, completa todos los campos obligatorios.')
        return
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert('Por favor, introduce un email válido.')
        return
      }
      
      // Get kit details
      const kitNames = {
        'estetica': 'Kit Estética',
        'performance': 'Kit Performance',
        '4x4': 'Kit 4x4'
      }
      
      const kitName = kitNames[data.kit] || 'Kit desconocido'
      
      // Create email content
      const emailContent = `
Solicitud de Presupuesto - ${kitName}

Datos del Cliente:
- Nombre: ${data.name}
- Email: ${data.email}
- Teléfono: ${data.phone || 'No proporcionado'}
- Vehículo: ${data.vehicle}

Kit Solicitado: ${kitName}

Modificaciones específicas:
${data.modifications || 'No especificadas'}

Información adicional:
${data.notes || 'Ninguna'}

---
Solicitud enviada desde www.flatout.es
Fecha: ${new Date().toLocaleString('es-ES')}
      `.trim()
      
      // Simulate form submission
      const submitButton = kitQuoteForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML
      
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      submitButton.disabled = true
      
      // Simulate API call
      setTimeout(() => {
        alert(`¡Gracias ${data.name}! Tu solicitud para el ${kitName} ha sido enviada correctamente. Te contactaremos pronto con tu presupuesto personalizado.`)
        
        // Log the email content for debugging (in a real app, this would be sent to a server)
        console.log('Email Content:', emailContent)
        
        // Reset form and close modal
        kitQuoteForm.reset()
        closeKitModal()
        
        // Reset button
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }
  
  // Close modal when clicking outside
  const modal = document.getElementById('kitModal')
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeKitModal()
      }
    })
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('kitModal')
      if (modal && modal.style.display === 'block') {
        closeKitModal()
      }
    }
  })
  
  // Add click animation to kit buttons
  const kitButtons = document.querySelectorAll('.btn-kit')
  kitButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)'
      setTimeout(() => {
        this.style.transform = 'scale(1)'
      }, 150)
    })
  })
}
