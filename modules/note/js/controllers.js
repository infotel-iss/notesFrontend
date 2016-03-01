angular.module("notesApp.notes.controllers", []).controller("NoteController", ["Departement","Cours", "Evaluation","Annee",  "$scope", 
    function (Departement,Cours, Evaluation, Annee,  $scope) {
        var ans = Annee.query(function(){
            $scope.annees = ans;
        });
        var cos = Cours.query(function(){
           $scope.cours = cos; 
        });
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var evals = Evaluation.query(function(){
           $scope.evaluations = evals; 
        });
        $scope.uploadFile = function (fs) {
            $scope.files = fs;
        };

        $scope.department = null;

    }]).controller("NoteImportationController", ["Departement","Niveau", "Annee", "Cours", "Evaluation", "$scope", "$http", "$log",
    function (Departement, Niveau, Annee, Cours, Evaluation, $scope, $http, $log) {
        var deps = Departement.query(function(){
            $scope.departements = deps;
        });
        
        var nivs = Niveau.query(function(){
            $scope.niveaux = nivs;
        });
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        
        $scope.uploadFile = function (fs) {
            $scope.files = fs;
        };
        $scope.changerDepartement = function(){
            if(($scope.departement !== undefined) && ($scope.niveau !== undefined)){
                $http.get('/api/options/' + $scope.departement + '/' + $scope.niveau).success(function(data){
                    $scope.options = data;
                });
            }
        };
        $scope.changerOption = function(){
            if(($scope.option !== undefined) && ($scope.niveau !== undefined)){
                $http.get('/api/cours/' + $scope.niveau + '/' + $scope.option).success(function (data, status, config, headers) {
                    $scope.cours = data;
                });
            }
        };
        $scope.changerCours = function(){
            if($scope.cour){
                $http.get('/api/cours/'+$scope.cour+'/evaluations').success(function(data){
                   $scope.evaluations = data; 
                });
            }
        };
        
        $scope.valider = function () {
            var fd = new FormData();
            //Take the first selected file
            fd.append("fichier", $scope.files[0]);
            fd.append("courId", $scope.cour);
            fd.append("evaluationId", $scope.evaluation.id);
            fd.append("anneeId", $scope.annee);
            if ($scope.session)
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
    }]).controller("NoteModificationController", ["$scope", "$http", "Departement", "Niveau", "Annee","Note",
    function ($scope, $http, Departement, Niveau, Annee, Note) {
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niv = Niveau.query(function () {
            $scope.niveaux = niv;
        });
        var anns = Annee.query(function () {
            $scope.annees = anns;
        });
        $scope.cours;
        $scope.updateOptions = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement.id + '/' + $scope.niveau.id).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
            }
        };
        $scope.changerOption = function () {
            console.log('/api/cours/' + $scope.niveau.id + '/' + $scope.option.id);
            if (($scope.option) && ($scope.niveau)) {
                $http.get('/api/cours/' + $scope.niveau.id + '/' + $scope.option.id).success(function (data, status, config, headers) {
                    $scope.cours = data;
                });
            }
        }
        $scope.afficher = function(){
            if($scope.matricule){
                $http.get('/api/notes/'+$scope.matricule+'/'+$scope.cour.id+'/'+$scope.annee).success(function(data){
                   $scope.notes = data; 
                });
            }
        };
        $scope.supprimerNote = function (key, item) {
            if (confirm("Voulez vous vraiment supprimer ce departement?")) {
                Note.remove({
                    id: item.id
                }, function () {
                      $scope.notes.splice(key, 1);                    
                });
            }
        };
        $scope.modifierNote = function (key, item) {
            
        };
    }]);
