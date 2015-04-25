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

    }]).controller("NoteImportationController",["Annee","Cours", "Evaluation", "$scope", "$http","$log",
    function(Annee, Cours, Evaluation, $scope, $http, $log){
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
        $scope.valider = function () {
            var fd = new FormData();
            //Take the first selected file
            fd.append("fichier", $scope.files[0]);
            fd.append("courId", $scope.cour.id);
            fd.append("evaluationId", $scope.evaluation.id);
            fd.append("anneeId", $scope.annee);
            fd.append("session", $scope.session);
            $http.post('/api/notes/import', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function () {
                $log.log("Importation reussie");
            }).error(function () {
                $log.log("Erreur lors de l'importation");
            });
        };
    }]);
