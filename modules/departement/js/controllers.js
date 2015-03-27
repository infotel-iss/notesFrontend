angular.module("notesApp.departements.controllers", []).controller("DepartementController", ["$scope", "$modal", "$log", "Departement",
    function ($scope, $modal, $log, Departement) {

        var deps = Departement.query(function () {

            $scope.departements = _.sortBy(deps, 'code');
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/departement/views/nouveau.html',
                controller: 'DepartementFenetreController',
                controllerAs: 'depart',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Departement();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id = _.sortedIndex($scope.departements, item, 'code');
                        if (id !== -1) {
                            $scope.departements.splice(id, 1, item);
                        }
                    });
                } else {
                    var toto = Departement.save(item, function () {
                        var tt = _.sortedIndex($scope.departements, toto, 'code');
                        if (tt !== -1) {
                            $scope.departements.splice(tt, 0, toto);
                        }
                    });
                }
            }, function () {

            });
        }
        $scope.supprimerDepartement = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce departement?")) {
                Departement.remove({
                    id: item.id
                }, function () {
                    var id = _.sortedIndex($scope.departements, item, 'code');
                    if (id !== -1) {
                        $scope.departements.splice(id, 1);
                    }
                })
            }
        }
    }]).controller("DepartementFenetreController", ["$scope", "$modalInstance", "element",
    function ($scope, $modalInstance, element) {
        $scope.element = element;
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };
    }]);
