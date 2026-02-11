import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        titre: 'Capitale Europe',
        description: 'Questions sur les capitales européennes',
      },
      {
        titre: 'Mathématiques',
        description: 'Questions de base en mathématiques',
      },
      {
        titre: 'Culture Générale',
        description: 'Questions variées de culture générale',
      },
      {
        titre: 'Histoire',
        description: 'Questions sur l’histoire mondiale',
      },
      {
        titre: 'Sciences',
        description: 'Questions sur la biologie, la physique et la chimie',
      },
    ])
  }
}