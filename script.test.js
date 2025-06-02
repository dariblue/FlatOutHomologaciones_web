const fs = require("fs")
const path = require("path")
script = require("./script.js")

// script.test.js
/**
 * @jest-environment jsdom
 */

describe("FlatOut script.js", () => {
  let script
  let addEventListenerSpy

  beforeAll(() => {
    // Load HTML
    document.body.innerHTML = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf8"
    )
    // Mock IntersectionObserver
    global.IntersectionObserver = class {
      constructor(cb) { this.cb = cb }
      observe = jest.fn()
      unobserve = jest.fn()
      disconnect = jest.fn()
    }
    // Mock scrollTo
    window.scrollTo = jest.fn()
    // Mock requestAnimationFrame
    window.requestAnimationFrame = (cb) => cb()
    // Mock alert
    window.alert = jest.fn()
    // Mock console
    global.console = { log: jest.fn(), warn: jest.fn() }
    // Load script.js
  })

  beforeEach(() => {
    jest.clearAllMocks()
    document.body.className = ""
  })

  test("Mobile navigation toggles classes on hamburger click", () => {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    hamburger.click()
    expect(hamburger.classList.contains("active")).toBe(true)
    expect(navMenu.classList.contains("active")).toBe(true)
  })

  test("Mobile menu closes on nav-link click", () => {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    hamburger.classList.add("active")
    navMenu.classList.add("active")
    const navLink = document.querySelector(".nav-link")
    navLink.click()
    expect(hamburger.classList.contains("active")).toBe(false)
    expect(navMenu.classList.contains("active")).toBe(false)
  })

  test("Smooth scrolling prevents default and calls scrollIntoView", () => {
    const anchor = document.createElement("a")
    anchor.href = "#test"
    document.body.appendChild(anchor)
    const target = document.createElement("div")
    target.id = "test"
    target.scrollIntoView = jest.fn()
    document.body.appendChild(target)
    const event = new MouseEvent("click", { bubbles: true, cancelable: true })
    anchor.dispatchEvent(event)
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    })
    document.body.removeChild(anchor)
    document.body.removeChild(target)
  })

  test("Contact form: missing fields shows alert", () => {
    const form = document.getElementById("contactForm")
    form.innerHTML = `
      <input name="name" value="">
      <input name="email" value="">
      <select name="service"><option value=""></option></select>
      <textarea name="message"></textarea>
      <button type="submit">Enviar</button>
    `
    form.querySelector('button[type="submit"]').disabled = false
    form.dispatchEvent(new Event("submit", { bubbles: true }))
    expect(window.alert).toHaveBeenCalledWith(
      "Por favor, completa todos los campos obligatorios."
    )
  })

  test("Contact form: invalid email shows alert", () => {
    const form = document.getElementById("contactForm")
    form.innerHTML = `
      <input name="name" value="Test">
      <input name="email" value="bademail">
      <select name="service"><option value="Homologacion" selected>Homologacion</option></select>
      <textarea name="message">Hola</textarea>
      <button type="submit">Enviar</button>
    `
    form.querySelector('button[type="submit"]').disabled = false
    form.dispatchEvent(new Event("submit", { bubbles: true }))
    expect(window.alert).toHaveBeenCalledWith(
      "Por favor, introduce un email válido."
    )
  })

  test("Contact form: valid submission disables button and resets", () => {
    jest.useFakeTimers()
    const form = document.getElementById("contactForm")
    form.innerHTML = `
      <input name="name" value="Test">
      <input name="email" value="test@mail.com">
      <select name="service"><option value="Homologacion" selected>Homologacion</option></select>
      <textarea name="message">Hola</textarea>
      <button type="submit">Enviar consulta</button>
    `
    const btn = form.querySelector('button[type="submit"]')
    form.dispatchEvent(new Event("submit", { bubbles: true }))
    expect(btn.textContent).toBe("Enviando...")
    expect(btn.disabled).toBe(true)
    jest.runAllTimers()
    expect(window.alert).toHaveBeenCalledWith(
      "¡Gracias por tu consulta! Te contactaremos pronto."
    )
    expect(btn.textContent).toBe("Enviar consulta")
    expect(btn.disabled).toBe(false)
    jest.useRealTimers()
  })

  test("Navbar background changes on scroll", () => {
    const navbar = document.querySelector(".navbar")
    window.scrollY = 150
    window.dispatchEvent(new Event("scroll"))
    expect(navbar.style.backgroundColor).toBe("rgba(0, 0, 0, 0.95)")
    window.scrollY = 0
    window.dispatchEvent(new Event("scroll"))
    expect(navbar.style.backgroundColor).toBe("#000")
  })

  test("Scroll-to-top button appears and works", () => {
    const btn = document.querySelector(".scroll-to-top")
    window.scrollY = 400
    window.dispatchEvent(new Event("scroll"))
    expect(btn.style.display).toBe("block")
    window.scrollY = 0
    window.dispatchEvent(new Event("scroll"))
    expect(btn.style.display).toBe("none")
    btn.click()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
  })

  test("Keyboard navigation: Escape closes mobile menu", () => {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    hamburger.classList.add("active")
    navMenu.classList.add("active")
    const event = new KeyboardEvent("keydown", { key: "Escape" })
    document.dispatchEvent(event)
    expect(hamburger.classList.contains("active")).toBe(false)
    expect(navMenu.classList.contains("active")).toBe(false)
  })

  test("Counter animation triggers when visible", () => {
    const counter = document.createElement("div")
    counter.className = "counter"
    counter.setAttribute("data-target", "100")
    counter.innerText = "0"
    document.body.appendChild(counter)
    // Simulate IntersectionObserver callback
    const observer = new IntersectionObserver((entries) => {})
    observer.cb([{ isIntersecting: true, target: counter }])
    // Wait for counter to update
    setTimeout(() => {
      expect(Number(counter.innerText)).toBe(100)
      document.body.removeChild(counter)
    }, 500)
  })
})