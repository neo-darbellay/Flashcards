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
router.get('/decks/create', [DecksController, 'create']).as('decks.create')
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
router.post('/decks/create', [DecksController, 'store']).as('decks.store')
router.post('/decks/:id/update', [DecksController, 'update']).as('decks.update')
router.post('/decks/:id/destroy', [DecksController, 'destroy']).as('decks.destroy')