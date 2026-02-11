import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupération dynamique des IDs des decks par titre
    const Deck = (await import('#models/deck')).default

    const tab_decks: Record<string, number> = {}
    const deckTitles = [
      'Capitale Europe',
      'Mathématiques',
      'Culture Générale',
      'Histoire',
      'Sciences',
    ]
    for (const titre of deckTitles) {
      const deck = await Deck.findBy('titre', titre)
      if (deck) tab_decks[titre] = deck.id
    }

    await Card.createMany([
      // Deck: Capitales Europe
      {
        question: 'Quelle est la capitale de la France ?',
        reponse: 'Paris',
        deck_fk: tab_decks['Capitale Europe'],
      },
      {
        question: 'Quelle est la capitale de l\'Espagne ?',
        reponse: 'Madrid',
        deck_fk: tab_decks['Capitale Europe'],
      },
      {
        question: 'Quelle est la capitale de l\'Italie ?',
        reponse: 'Rome',
        deck_fk: tab_decks['Capitale Europe'],
      },
      {
        question: 'Quelle est la capitale de l\'Allemagne ?',
        reponse: 'Berlin',
        deck_fk: tab_decks['Capitale Europe'],
      },
      // Deck: Mathématiques
      {
        question: 'Combien font 2 + 2 ?',
        reponse: '4',
        deck_fk: tab_decks['Mathématiques'],
      },
      {
        question: 'Combien font 5 x 6 ?',
        reponse: '30',
        deck_fk: tab_decks['Mathématiques'],
      },
      {
        question: 'Quelle est la racine carrée de 9 ?',
        reponse: '3',
        deck_fk: tab_decks['Mathématiques'],
      },
      // Deck: Culture Générale
      {
        question: 'Qui a peint la Joconde ?',
        reponse: 'Léonard de Vinci',
        deck_fk: tab_decks['Culture Générale'],
      },
      {
        question: 'Quel est le plus grand océan du monde ?',
        reponse: 'Océan Pacifique',
        deck_fk: tab_decks['Culture Générale'],
      },
      // Deck: Histoire
      {
        question: 'En quelle année a eu lieu la Révolution française ?',
        reponse: '1789',
        deck_fk: tab_decks['Histoire'],
      },
      {
        question: 'Qui était le premier président des États-Unis ?',
        reponse: 'George Washington',
        deck_fk: tab_decks['Histoire'],
      },
      // Deck: Sciences
      {
        question: 'Quel est l’organe principal de la respiration ?',
        reponse: 'Les poumons',
        deck_fk: tab_decks['Sciences'],
      },
      {
        question: 'Quel est l’état de l’eau à 100°C ?',
        reponse: 'Gazeux (vapeur)',
        deck_fk: tab_decks['Sciences'],
      },
    ])
  }
}