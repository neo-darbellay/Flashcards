import Card from '#models/card'
import Deck from '#models/deck'
import { cardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }

  /**
   * Display form to create a new record
   */
  async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    return view.render('pages/cards/create', { deck })
  }
  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const requete = {
      ...request.all(),
      deckId: params.id
    }

    // Validation des données saisies par l'utilisateur
    const { question, reponse } = await request.validateUsing(cardValidator, { data: requete })
    const deck = await Deck.findOrFail(params.id)

    // Création du nouveau deck
    await Card.create({
      question, reponse, deckId: deck.id
    })

    // Rediriger vers la homepage
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }
  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}