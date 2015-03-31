angular.module("notesApp", ["notesApp.filters","ngResource", "ui.bootstrap", "ui.router", "notesApp.uniteenseignements", "notesApp.controllers", "notesApp.directives", "notesApp.etudiants", "notesApp.cours", "notesApp.parcours", "notesApp.typecours", "notesApp.semestres", "notesApp.services", "notesApp.options", "notesApp.departements", "notesApp.enseignants", "notesApp.cycles", "notesApp.niveaux","notesApp.evaluations", "notesApp.annees", "notesApp.notes", "notesApp.programme"]);
angular.module("notesApp").run(function($log,$rootScope) {
    $rootScope.isViewLoading = false;
    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.isViewLoading = true;
        $rootScope.isError = false;
    });
    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.isViewLoading = false;
        $rootScope.isError = false;
    });
    $rootScope.$on('$stateChangeError', function () {
        $rootScope.isError = true;
        $rootScope.isViewLoading = false;
        $log.log("Je suis en chemin");
    });
});
