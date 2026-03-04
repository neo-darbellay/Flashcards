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
  async store({ params, request, session, response }: HttpContext) {
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

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `La carte a été créée avec succès !`
    )

    // Rediriger vers le bon deck
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }
  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    // Sélectionner la carte (et le deck qui va avec) dont on veut afficher
    const deck = await Deck.findOrFail(params.deckId)
    const card = await Card.findOrFail(params.cardId)

    return view.render('pages/cards/show', { deck, card })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    // Sélectionner la carte (et le deck qui va avec) dont on veut mettre à jour des informations
    const deck = await Deck.findOrFail(params.deckId)
    const card = await Card.findOrFail(params.cardId)

    // Afficher la vue
    return view.render('pages/cards/edit', { card, deck })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const requete = {
      ...request.all(),
      deckId: params.deckId
    }

    // Validation des données saisies par l'utilisateur
    const { question, reponse } = await request.validateUsing(cardValidator, { data: requete })

    // Sélectionner la carte dont on veut mettre à jour des informations
    const card = await Card.findOrFail(params.cardId)

    // Met à jour les infos de la carte
    card.merge({
      question,
      reponse
    })

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `La carte a été modifié avec succès !`
    )

    await card.save()

    // Redirige l'utilisateur sur le bon deck
    return response.redirect().toRoute('decks.show', { id: params.deckId })
  }
  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // Sélectionne la carte à supprimer
    const card = await Card.findOrFail(params.cardId)

    // Supprime la carte
    await card.delete()

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `La carte a été retirée avec succès !`
    )

    // Redirige l'utilsiateur
    return response.redirect().toRoute('decks.show', { id: params.deckId })
  }
}