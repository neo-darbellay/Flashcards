import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.all()
    const cards = await Card.query()

    // Créer un dictionnaire qui contient le nombre de cartes par deck
    const tab_counts: Record<number, number> = {}

    for (const card of cards) {
      if (tab_counts[card.deck_fk] == null) {
        tab_counts[card.deck_fk] = 1;
      } else {
        tab_counts[card.deck_fk]++;
      }
    }

    return view.render('pages/decks/index', { decks, tab_counts })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).firstOrFail()

    const cards = await Card.query().where('deck_fk', deck.id)

    // Rendre aléatoire l'ordre des cartes
    let currentIndex = cards.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }

    return view.render('pages/decks/show', { deck, cards })
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
  async destroy({ params }: HttpContext) { }
}