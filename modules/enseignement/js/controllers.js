angular.module("notesApp.enseignements.controllers", []).controller("EnseignementController", ["$scope", "$modal", "$log", "Enseignement",
    function ($scope, $modal, $log, Enseignement) {

        var deps = Enseignement.query(function () {

            $scope.enseignements = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/enseignement/views/nouveau.html',
                controller: 'EnseignementFenetreController',
                controllerAs: 'depart',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Enseignement();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id = _.sortedIndex($scope.enseignants, item, 'code');
                        if (id !== -1) {
                            $scope.enseignants.splice(id, 1, item);
                        }
                    });
                } else {
                    var toto = Enseignement.save(item, function () {
                        var tt = _.sortedIndex($scope.enseignants, toto, 'code');
                        if (tt !== -1) {
                            $scope.enseignants.splice(tt, 0, toto);
                        }
                    });
                }
            }, function () {

            });
        };
        $scope.supprimerEnseignement = function (item) {
            if (confirm("Voulez vous vraiment supprimer cet enseignant?")) {
                Enseignement.remove({
                    id: item.id
                }, function () {
                    var id = _.sortedIndex($scope.enseignants, item, 'code');
                    if (id !== -1) {
                        $scope.enseignants.splice(id, 1);
                    }
                });
            }
        };
    }]).controller("EnseignementFenetreController", ["$scope", "$modalInstance", "element", "Cours","Enseignant", "Annee",
    function ($scope, $modalInstance, element, Cours, Enseignant, Annee) {
        $scope.element = element;
        var cours = Cours.query(function () {
            $scope.cours = cours;
        });
        var enseignants = Enseignant.query(function () {
            $scope.enseignants = enseignants;
        });
        var annees = Annee.query(function () {
            $scope.annees = annees;
        });
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };
    }]).controller('TagInputController', ['ngTagsInput',
    function ($scope, $http) {
        $scope.tags = [
            {text: 'just'},
            {text: 'some'},
            {text: 'cool'},
            {text: 'tags'}
        ];
        $scope.loadTags = function (query) {
            return $http.get('/tags?query=' + query);
        };
    }]);
