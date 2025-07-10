document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar")
      bars.forEach((bar) => bar.classList.toggle("active"))
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        const bars = navToggle.querySelectorAll(".bar")
        bars.forEach((bar) => bar.classList.remove("active"))
      })
    })
  }

  // Smooth scroll for navigation links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
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

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress")
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.style.animation = "fillBar 2s ease-in-out forwards"
      }
    })
  }

  // Add CSS animation for skill bars
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fillBar {
            from { width: 0; }
            to { width: var(--target-width, 0); }
        }
    `
  document.head.appendChild(style)

  // Set target width for each skill bar
  skillBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.setProperty("--target-width", width)
    bar.style.width = "0"
  })

  // Trigger animation on scroll
  window.addEventListener("scroll", animateSkillBars)
  animateSkillBars() // Check on load

  // Form validation
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = this.querySelector("#name").value.trim()
      const email = this.querySelector("#email").value.trim()
      const subject = this.querySelector("#subject").value.trim()
      const message = this.querySelector("#message").value.trim()

      if (!name || !email || !subject || !message) {
        e.preventDefault()
        alert("Please fill in all fields")
        return
      }

      if (!isValidEmail(email)) {
        e.preventDefault()
        alert("Please enter a valid email address")
        return
      }
    })
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Add loading animation to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type === "submit") {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        this.disabled = true
      }
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .timeline-item, .stat-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Section reveal on scroll
  const revealSections = document.querySelectorAll("section, .reveal")
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  revealSections.forEach((section) => {
    section.classList.add("reveal")
    revealObserver.observe(section)
  })

  // Animated counters for stats
  const statItems = document.querySelectorAll(".stat-item h3")
  statItems.forEach((item) => {
    const target = parseInt(item.textContent.replace(/\D/g, ""))
    if (!isNaN(target)) {
      item.textContent = "0+"
      let count = 0
      const updateCounter = () => {
        if (count < target) {
          count += Math.ceil(target / 40)
          if (count > target) count = target
          item.textContent = count + "+"
          requestAnimationFrame(updateCounter)
        } else {
          item.textContent = target + "+"
        }
      }
      // Animate when visible
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter()
            counterObserver.unobserve(item)
          }
        })
      }, { threshold: 0.7 })
      counterObserver.observe(item)
    }
  })

  // Certificate card expand/collapse
  const certificateCards = document.querySelectorAll('.collapsible-certificate');
  certificateCards.forEach(card => {
    const header = card.querySelector('.certificate-header.certificate-toggle');
    const readMore = card.querySelector('.read-more.certificate-toggle');
    const details = card.querySelector('.certificate-details');
    if (header && details) {
      header.addEventListener('click', () => {
        if (details.style.display === 'none' || details.style.display === '') {
          details.style.display = 'block';
        } else {
          details.style.display = 'none';
        }
      });
    }
    if (readMore && details) {
      readMore.addEventListener('click', () => {
        if (details.style.display === 'none' || details.style.display === '') {
          details.style.display = 'block';
        } else {
          details.style.display = 'none';
        }
      });
    }
  });
})
