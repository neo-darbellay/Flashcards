import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

const uniqueCard = vine.createRule(async (value, _, field) => {
    const deckId = field.parent.deckId

    const card = await db
        .from('cards')
        .where('question', value)
        .where('deck_id', deckId)
        .first()

    if (card) {
        field.report('Cette question existe déjà', field + '.unique', field)
    }
})

const cardValidator = vine.compile(
    vine.object({
        question: vine.string().trim().minLength(10).use(uniqueCard()),

        reponse: vine.string().trim().minLength(1),

        deckId: vine.number().positive().exists(async (db, value) => {
            const deck = await db.from('decks').where('id', value).first()
            return !!deck
        }),
    })
)

export { cardValidator }