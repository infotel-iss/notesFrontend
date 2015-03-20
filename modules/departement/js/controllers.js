angular.module("notesApp.departements.controllers", []).controller("DepartementController", ["$timeout","$scope", "$modal", "$log", "Departement",
    function ($timeout, $scope, $modal, $log, Departement) {
        $timeout(function(){
        var deps = Departement.query(function () {
            
                $scope.departements = _.sortBy(deps, 'code');
            });
            
        },1000);
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
                    Departement.save(item, function () {
                        var tt = _.sortedIndex($scope.departements, item, 'code');
                        if (tt !== -1) {
                            $scope.departements.splice(tt, 0, item);
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
