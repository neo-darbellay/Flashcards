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
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { titre, description } = await request.validateUsing(deckValidator)

    // Création du nouveau deck
    const deck = await Deck.create({
      titre, description
    })

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le deck  ${deck.titre} a été créé avec succès !`
    )

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
  async edit({ params, view }: HttpContext) {
    // Sélectionner le deck dont on veut mettre à jour des informations
    const deck = await Deck.findOrFail(params.id)

    // Afficher la vue
    return view.render('pages/decks/edit', { deck })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { titre, description } = await request.validateUsing(deckValidator)

    // Sélectionner le deck dont on veut mettre à jour des informations
    const deck = await Deck.findOrFail(params.id)

    // Met à jour les infos du deck
    deck.merge({
      titre,
      description,
    })

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le deck  ${deck.titre} a été mis à jour avec succès !`
    )

    await deck.save()

    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('decks')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // Sélectionne le deck à supprimer
    const deck = await Deck.findOrFail(params.id)

    const titre = deck.titre

    // Supprime le deck
    await deck.delete()

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le deck  ${titre} a été effacé avec succès !`
    )


    // Redirige l'utilsiateur
    return response.redirect().toRoute('decks')
  }

  /**
   * Display the start of a game
   */
  async start({ params, view }: HttpContext) {
    const deck = (await Deck.query().where('id', params.id).preload('cards').firstOrFail())

    // Lance la partie
    return view.render('pages/decks/start', { deck })
  }

  /**
   * Start the game
   */
  async play({ params, request, view }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .preload('cards')
      .firstOrFail()

    // Récupération du mode de jeu
    const mode = request.input('mode', 'Basique')

    let cards

    // Si le mode de jeu est "aleatoire", rendre les cartes aléatoire
    if (mode == 'Aleatoire')
      cards = deck.cards.sort(() => Math.random() - 0.5)
    else if (mode == 'Basique')
      cards = deck.cards

    return view.render('pages/decks/play', {
      deck,
      mode,
      cards: cards,
    })
  }

  /**
   * Display the end of a game
   */
  async stopGame() {

  }
}