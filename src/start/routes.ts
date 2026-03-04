/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

// Deck
router.get('/decks', [DecksController, 'index']).as('decks')
router.get('/decks/:id/show', [DecksController, 'show']).as('decks.show')
router.get('/decks/create', [DecksController, 'create']).as('decks.create')
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
router.post('/decks/create', [DecksController, 'store']).as('decks.store')
router.post('/decks/:id/update', [DecksController, 'update']).as('decks.update')
router.post('/decks/:id/destroy', [DecksController, 'destroy']).as('decks.destroy')

// Cards
router.get('/decks/:id/cards/create', [CardsController, 'create']).as('cards.create')
router.post('/decks/:id/cards/create', [CardsController, 'store']).as('cards.store')
router.get('/decks/:deckId/cards/:cardId/show', [CardsController, 'show']).as('cards.show')
router.post('/decks/:deckId/cards/:cardId/destroy', [CardsController, 'destroy']).as('cards.destroy')
