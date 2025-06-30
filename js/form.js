// init
// disable default form submission
document.getElementsByTagName('form')[0]
      .addEventListener('submit', (event) => {
        event.preventDefault()
      })

// get form elements
const emailDom = document.getElementById("email")
const passwordDom = document.getElementById("password")
const buttonDom = document.getElementById("login")
let isEmailValid = isPasswordValid = false

// change outline
emailDom.style.outline = 'none'
passwordDom.style.outline = 'none'

// disable button
buttonDom.disabled = true

// add email event listener
emailDom.addEventListener('keyup', (event) => {
  const email = event.target.value
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
    emailDom.style.border = '2px solid lightgreen'
    isEmailValid = true
  } else {
    emailDom.style.border = "1px solid red"
    isEmailValid = false
  }
  if (isEmailValid && isPasswordValid) {
    // enable button
    buttonDom.disabled = false
  } else {
    buttonDom.disabled = true
  }
})

// add pwd event listener
passwordDom.addEventListener('keyup', (event) => {
  const password = event.target.value
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,}).*$/.test(password)) {
    passwordDom.style.border = '2px solid lightgreen'
    isPasswordValid = true
  } else {
    passwordDom.style.border = '1px solid red'
    isPasswordValid = false
  }
  if (isEmailValid && isPasswordValid) {
    // enable button
    buttonDom.disabled = false
  } else {
    buttonDom.disabled = true
  }
})

buttonDom.addEventListener('click', (event) => {
  if (!isEmailValid || !isPasswordValid) {
    return
  }
  const email = emailDom.value
  const password = passwordDom.value
  const data = JSON.stringify({email, password})
  console.log("data:", data)
})