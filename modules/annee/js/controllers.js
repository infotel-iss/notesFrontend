angular.module("notesApp.annees.controllers", []).controller("AnneeController", ["$scope", "$modal", "$log", "Annees",
    function ($scope, $modal, $log, Annees) {
        var deps = Annees.query(function () {
            $scope.annees = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/annee/views/nouveau.html',
                controller: 'AnneeFenetreController',
                controllerAs: 'depart',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Annee();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.annees.length; i++) {
                            if ($scope.annees[i].id == item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.annees.splice(id, 1, item);
                        }
                    });
                } else {
                    var tt = Annee.save(item, function () {
                        $scope.annees.push(tt);
                    });
                }
            }, function () {

            });

        }
        $scope.supprimerAnnee = function (item) {
            if (confirm("Voulez vous vraiment supprimer cette annee?")) {
               Annee.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.annees.length; i++) {
                        if ($scope.annees[i].id == item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.annees.splice(id, 1);
                    }
                })
            }
        }
    }]).controller("AnneeFenetreController", ["$log", "$scope", "$modalInstance", "element",
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
