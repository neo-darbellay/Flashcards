import Section from '#models/section'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectionsController {
  /**
    * Afficher la liste des sections
    */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
    const sections = await Section.query().orderBy('name', 'asc')

    // Appel de la vue
    return view.render('pages/sections/home', { sections })
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
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
 * Supprimer une section
 */
  async destroy({ params, session, response }: HttpContext) {
    // Sélectionne la section à supprimer
    const section = await Section.findOrFail(params.id)

    // Supprime la section
    await section.delete()

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `La section ${section.name} a été supprimé avec succès !`
    )

    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('sections.home')
  }
}