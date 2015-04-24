angular.module("notesApp.notes", ['notesApp.notes.controllers', 'notesApp.notes.services', 'ngAnimate']);
angular.module("notesApp.options").config(function ($stateProvider, $locationProvider) {
    $stateProvider.state("nimportation", {
        url: '/importation',
        controller: 'NoteImportationController',
        templateUrl: 'modules/note/views/importation.html'
    }).state("nexportation", {
        url: '/exportation',
        controller: 'NoteController',
        templateUrl: 'modules/note/views/exportation.html'
    });
});