import vine from '@vinejs/vine'

const cardValidator = vine.compile(
    vine.object({
        question: vine.string().trim().minLength(10).maxLength(500).unique(async (db, value, field) => {
            const deckId = field.parent.deckId

            const card = await db
                .from('cards')
                .where('question', value)
                .where('deck_id', deckId)
                .first()

            return !card
        }),

        reponse: vine.string().trim().minLength(1).maxLength(1000),

        deckId: vine.number().positive().exists(async (db, value) => {
            const deck = await db.from('decks').where('id', value).first()
            return !!deck
        }),
    })
)
export { cardValidator }