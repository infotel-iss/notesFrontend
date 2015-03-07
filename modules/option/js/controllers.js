angular.module("notesApp.options.controllers", []).controller("OptionController", ["$scope", "$modal", "$log", "Options",
    function ($scope, $modal, $log, Options) {
        var op = Options.query(function () {
            $scope.optionss = op;
        });

        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/option/views/nouveau.html',
                controller: 'OptionFenetreController',
                controllerAs: 'opt',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Options();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.optionss.length; i++) {
                            if ($scope.optionss[i].id == item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.optionss.splice(id, 1, item);
                        }
                    });
                } else {
                    Options.save(item, function () {
                        $scope.optionss.push(item);
                    });
                }
            }, function () {

            });

        }
        $scope.supprimerOption = function (item) {
            if (confirm("Voulez vous vraiment supprimer cette option ?")) {
                Options.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.optionss.length; i++) {
                        if ($scope.optionss[i].id == item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $log.log("l id a supprimer est " + id);
                        $scope.optionss.splice(id, 1);

                    }
                })
            }
        }
    }]).controller("OptionFenetreController", ["$log", "$scope", "$modalInstance", "element", "Departement",
    function ($log, $scope, $modalInstance, element, Departement) {
        $scope.element = element;
        var dep = Departement.query(function () {
            $scope.departements = dep;
        });
        $log.log(element);
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };

    }]);
