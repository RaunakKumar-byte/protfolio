const express = require("express")
const router = express.Router()
const Contact = require("../models/Contact")

// Home page
router.get("/", (req, res) => {
  res.render("index", {
    title: "Raunak Kumar - Portfolio",
    page: "home",
  })
})

// About page
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About - Raunak Kumar",
    page: "about",
  })
})

// Skills page
router.get("/skills", (req, res) => {
  res.render("skills", {
    title: "Skills - Raunak Kumar",
    page: "skills",
  })
})

// Projects page
router.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects - Raunak Kumar",
    page: "projects",
  })
})

// Experience page
router.get("/experience", (req, res) => {
  res.render("experience", {
    title: "Experience - Raunak Kumar",
    page: "experience",
  })
})

// Contact page
router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact - Raunak Kumar",
    page: "contact",
    success: false,
    error: false,
  })
})

// Certifications page
router.get("/certificates", (req, res) => {
  res.render("certificates", {
    title: "Certificates - Raunak Kumar",
    page: "certificates",
  })
})

// Handle contact form submission
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    })

    await newContact.save()

    res.render("contact", {
      title: "Contact - Raunak Kumar",
      page: "contact",
      success: "Thank you for your message! I will get back to you soon.",
      error: false,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    res.render("contact", {
      title: "Contact - Raunak Kumar",
      page: "contact",
      success: false,
      error: "Sorry, there was an error sending your message. Please try again.",
    })
  }
})

module.exports = router
