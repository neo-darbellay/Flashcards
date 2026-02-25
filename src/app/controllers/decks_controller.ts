import type { HttpContext } from '@adonisjs/core/http'
import { deckValidator } from '#validators/deck'
import Deck from '#models/deck'

export default class DecksController {
  /**
   * Display a list of resource
   */

  async index({ view }: HttpContext) {
    const decks = await Deck.query().preload('cards')

    return view.render('pages/decks/show', { decks })
  }


  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { titre, description } = await request.validateUsing(deckValidator)

    // Création du nouveau deck
    await Deck.create({
      titre, description
    })

    // Rediriger vers la homepage
    return response.redirect().toRoute('decks')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = (await Deck.query().where('id', params.id).preload('cards').firstOrFail())

    return view.render('pages/decks/individual', { deck })
  }

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
  async destroy({ params, response }: HttpContext) {
    // Sélectionne le deck à supprimer
    // Erreur: ne marche pas
    const deck = await Deck.findOrFail(params.id)

    // Supprime le deck
    await deck.delete()

    // Redirige l'utilsiateur
    return response.redirect().toRoute('deck')
  }
}