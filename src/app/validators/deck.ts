import vine from '@vinejs/vine'
const deckValidator = vine.compile(
    vine.object({
        titre: vine.string().trim().minLength(2).unique({ table: "decks", column: "titre" }),
        description: vine.string().trim().minLength(5).optional(),
    })
)
export { deckValidator }