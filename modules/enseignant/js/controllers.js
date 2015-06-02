angular.module("notesApp.enseignants.controllers", []).controller("EnseignantController", ["$scope", "$modal", "$log", "Enseignant",
    function ($scope, $modal, $log, Enseignant) {
        var deps = Enseignant.query(function () {
            $scope.enseignants = deps;
            $scope.totalItems = $scope.enseignants.length;
            $log.log("version cancel"+$scope.totalItems);
        });
        
        //debut de la pagination
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

      

        // fin de la pagination
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/enseignant/views/nouveau.html',
                controller: 'EnseignantFenetreController',
                controllerAs: 'enseignant',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Enseignant();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.enseignants.length; i++) {
                            if ($scope.enseignants[i].id === item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.enseignants.splice(id, 1, item);
                        }
                    });
                } else {
                    Enseignant.save(item, function () {
                        $scope.enseignants.push(item);
                    });
                }
            }, function () {

            });

        };
        $scope.supprimerEnseignant = function (item) {
            if (confirm("Voulez vous vraiment supprimer cet enseinant ?")) {
                Enseignant.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.enseignants.length; i++) {
                        if ($scope.enseignants[i].id === item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.enseignants.splice(id, 1);
                    }
                });
            }
        };
    }]).controller("EnseignantFenetreController", ["$log", "$scope", "$modalInstance", "element",
    function ($log, $scope, $modalInstance, element) {
        $scope.element = element;
        $log.log(element);
        $scope.valider = function () {
            $log.log("version ok");
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $log.log("version cancel");
            $modalInstance.dismiss("Cancel");
        };

    }]);
