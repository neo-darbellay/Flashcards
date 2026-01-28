/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/
import SectionsController from '#controllers/sections_controller'
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [TeachersController, 'index']).as('home')

// Route permettant de voir les détails d'un enseignant
router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')

// Route permettant de supprimer un enseignant
router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')

// Route permettant d'afficher le formulaire permettant l'ajout d'un enseignant
router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')

// Route permettant l'ajout de l'enseignant
router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')

// Route permettant d'afficher le formulaire permettant la mise à jour d'un enseignant
router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')

// Route permettant la modification de l'enseignant
router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')



/* SECTIONS */

// Route permettant de voir les sections
router.get('/sections', [SectionsController, 'index']).as('sections.home')

// Route permettant de supprimer une section
router.delete('/sections/:id/destroy', [SectionsController, 'destroy']).as('sections.destroy')

// Route permettant d'afficher le formulaire permettant l'ajout d'une section
router.get('/sections/add', [SectionsController, 'create']).as('sections.create')

// Route permettant l'ajout d'une section
router.post('/sections/add', [SectionsController, 'store']).as('sections.store')
