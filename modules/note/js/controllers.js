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
            $scope.cours = cours;
        });

        $scope.department = null;

    }]).controller("NoteImportationController",["$scope", "Annee","Cours", "Evaluation", function($scope,Annee, Cours, Evaluation){
        var ans = Annee.query(function(){
            $scope.annees = ans;
        });
        var cos = Cours.query(function(){
           $scope.cours = cos; 
        });
        var evals = Evaluation.query(function(){
           $scope.evaluations = evals; 
        });
        $scope.cour = {};
        $scope.evaluation = {};
        $scope.annee = {};
    }]);
