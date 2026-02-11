/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')
router.get('/decks', [DecksController, 'index']).as('decks')
router.get('/decks/:id/show', [DecksController, 'show']).as('decks.show')
