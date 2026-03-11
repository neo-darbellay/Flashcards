import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

const uniqueDeckTitle = vine.createRule(async (value, _, field) => {
    const deck = await db
        .from('decks')
        .where('titre', value)
        .first()

    if (deck) {
        field.report('Ce deck existe déjà', field + '.unique', field)
    }
})

const deckValidator = vine.compile(
    vine.object({
        titre: vine.string().trim().minLength(3).use(uniqueDeckTitle()),
        description: vine.string().trim().minLength(10),
    })
)

export { deckValidator }