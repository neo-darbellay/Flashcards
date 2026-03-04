import vine from '@vinejs/vine'

const cardValidator = vine.compile(
    vine.object({
        question: vine.string().trim().minLength(5).maxLength(500),

        reponse: vine.string().trim().minLength(1).maxLength(1000),

        deckId: vine.number().positive().exists(async (db, value) => {
            const deck = await db.from('decks').where('id', value).first()
            return !!deck
        }),
    })
)
export { cardValidator }