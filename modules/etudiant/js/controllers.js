angular.module("notesApp.etudiants.controllers", []).controller("EtudiantController", ["$scope", "$modal", "$log", "Etudiant","Departement","Niveau","Annee", "Option",
    function ($scope, $modal, $log, Etudiant, Departement, Niveau, Annee, Option) {
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        var ops = Option.query(function () {
            $scope.options = ops;
        });
    }]);
