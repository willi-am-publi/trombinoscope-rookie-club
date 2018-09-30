import express from 'express'
import fs from 'fs'

const router = express.Router()

const displayTrombinoscope = async (request, response) => {
  await fs.promises.readFile('src/data/rookies.json', 'utf8')
    .then(async (rawData) => {
      const data = JSON.parse(rawData)

      response.render('layout', {
        view: 'home',
        title: 'Home',
        data,
      })
    })
    .catch(error => console.log(error))
}

const displayMember = async (request, response) => {
  await fs.promises.readFile('src/data/rookies.json', 'utf8')
    .then(async (rawData) => {
      const data = JSON.parse(rawData)

      const [member] = data.filter(member => member.pseudo === request.params.pseudo)

      if (request.query.raw) {
        response.render('member', {
          member,
        })
      }
      else {
        response.render('layout', {
          view: 'member',
          title: member.pseudo,
          member,
        })
      }
    })
    .catch(error => console.log(error))
}

router.get('/', (request, response) => {
  displayTrombinoscope(request, response)
})

router.get('/member/:pseudo', (request, response) => {
  displayMember(request, response)
})

export default router
