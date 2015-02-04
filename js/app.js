angular.module("notesApp", ["ngResource", "ui.bootstrap","ui.router","notesApp.controllers","notesApp.directives","notesApp.directives","notesApp.services", "notesApp.departements", "notesApp.cycles", "notesApp.niveaux"]);
angular.module("notesApp").config(function($stateProvider,$locationProvider){
	$stateProvider.state("annees", {
		url: '/annees',
		controller:'AnneeController',
		templateUrl:'/views/annee/liste.html'
	}).state("type_cours", {
		url: '/type_cours',
		controller:'TypeCoursController',
		templateUrl:'/views/type_cours/liste.html'
	}).state("unites", {
		url: '/unites',
		controller:'UniteController',
		templateUrl:'/views/unite_enseignement/liste.html'
	}).state("programmes", {
		url: '/programmes',
		controller:'ProgrammeController',
		templateUrl:'/views/programme_enseignement/liste.html'
	}).state("eimportation", {
		url: '/eimportation',
		controller:'ImportationEtudiantController',
		templateUrl:'/views/importation_etudiant/liste.html'
	}).state("eexportation", {
		url: '/eexportation',
		controller:'ExportationEtudiantController',
		templateUrl:'/views/exportation_etudiant/liste.html'
	}).state("importation", {
		url: '/nimportation',
		controller:'ImportationNoteController',
		templateUrl:'/views/importation_note/liste.html'
	}).state("pv", {
		url: '/pv',
		controller:'ProcesVerbalController',
		templateUrl:'/views/proces_verbal/liste.html'
	}).state("synthese", {
		url: '/synthese',
		controller:'SyntheseController',
		templateUrl:'/views/synthese/liste.html'
	}).state("releves", {
		url: '/releves',
		controller:'ReleveController',
		templateUrl:'/views/releve/liste.html'
	}).state("statistiques", {
		url: '/statistiques',
		controller:'StatistiqueController',
		templateUrl:'/views/statistique/liste.html'
	}).state("passage", {
		url: '/passage',
		controller:'PassageController',
		templateUrl:'/views/passage_niveau/liste.html'
	}).state("/error", {
		templateUrl:'/views/error.html'
	});
});
