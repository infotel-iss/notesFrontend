angular.module("notesApp.notes.controllers", []).controller("NoteController", ["$scope", "$modal", "$log", "Cours", "Evaluation","Annee",
    function ($scope, Option, Departement, Niveau,Cours) {
        var cours = Cours.query(function () {
            $scope.courss = cours;
        }); 

        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });
        
        

        $scope.department = null;

    }]).controller("NoteImportationController",["Annee","Cours", "Evaluation", "$scope", 
    function(Annee, Cours, Evaluation, $scope){
        var ans = Annee.query(function(){
            $scope.annees = ans;
        });
        var cos = Cours.query(function(){
           $scope.cours = cos; 
        });
        var evals = Evaluation.query(function(){
           $scope.evaluations = evals; 
        });
        $scope.uploadFile = function (fs) {
            $scope.files = fs;
        };
        $scope.cour = {};
        $scope.evaluation = {};
        $scope.annee = {};
    }]);
