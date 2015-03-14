angular.module("notesApp.uniteenseignements.controllers", []).controller("UniteEnseignementController", ["$scope", "$modal", "$log", "UniteEns",
    function ($scope, $modal, $log, UniteEns) {
        var deps = UniteEns.query(function () {
            $scope.unites = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/uniteEnseignement/views/nouveau.html',
                controller: 'UniteEnsFenetreController',
                controllerAs: 'unite',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new UniteEns();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.unites.length; i++) {
                            if ($scope.unites[i].id === item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.unites.splice(id, 1, item);
                        }
                    });
                } else {
                    UniteEns.save(item, function () {
                        $scope.unites.push(item);
                    });
                }
            }, function () {

            });

        };
        $scope.supprimerUniteEns = function (item) {
            if (confirm("Voulez vous vraiment supprimer cet enseinant ?")) {
                UniteEns.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.unites.length; i++) {
                        if ($scope.unites[i].id === item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.unites.splice(id, 1);
                    }
                });
            }
        };
    }]).controller("UniteEnsFenetreController", ["$log", "$scope", "$modalInstance", "element",
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
