angular.module("notesApp.notes.controllers", []).controller("NoteController", ["$scope", "$modal", "$log", "Option", "Departement",
    function ($scope, Option, Departement, Niveau,Cours) {
        var op = Option.query(function () {
            $scope.optionss = op;
        }); 

        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });
        
        var cours = Cours.query(function () {
            $scope.courss = cours;
        });

        $scope.department = null;

    }]);
