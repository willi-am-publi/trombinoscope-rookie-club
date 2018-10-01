'use strict'

const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

const removeOverlay = () => {
  $('body').removeChild($('.overlay'))
}

const createModal = (text) => {
  const overlay = document.createElement('div')
  const popin = document.createElement('div')

  popin.innerHTML = text
  popin.className = 'modal'
  overlay.className = 'overlay'
  overlay.appendChild(popin)
  overlay.addEventListener('click', removeOverlay)
  $('body').insertBefore(overlay, $('main'))
}

const displayMember = async (event) => {
  const element = event.currentTarget

  event.preventDefault()

  try {
    const response = await fetch(`${element.href}?raw=1`)

    if (response.ok) {
      const text = await response.text()
      createModal(text)
    }
  }
  catch (error) {
    console.error(error)
  }
}

$$('.member').forEach((a) => {
  a.addEventListener('click', displayMember)
})
