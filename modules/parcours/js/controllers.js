angular.module("notesApp.parcours.controllers", []).controller("ParcoursController", ["$scope", "$modal", "$log", "Parcours",
    function ($scope, $modal, $log, Parcours) {
        var deps = Parcours.query(function () {
            $scope.parcours = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/parcours/views/nouveau.html',
                controller: 'ParcoursFenetreController',
                controllerAs: 'parcours',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Parcours();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.parcours.length; i++) {
                            if ($scope.parcours[i].id === item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.parcours.splice(id, 1, item);
                        }
                    });
                } else {
                    Parcours.save(item, function () {
                        $scope.parcours.push(item);
                    });
                }
            }, function () {

            });

        };
        $scope.supprimerParcours = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce parcours?")) {
                Parcours.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.parcours.length; i++) {
                        if ($scope.parcours[i].id === item.id) {
                            id = i;
                            break;
                        }
                    }
                    if (id) {
                        $scope.parcours.splice(id, 1);
                    }
                });
            }
        };
    }]).controller("ParcoursFenetreController", ["$log","$scope", "$modalInstance", "element", "Options",
    function ($log, $scope, $modalInstance, element, Options) {
        var ops = Options.query(function () {
            $scope.options = ops;
        });
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
