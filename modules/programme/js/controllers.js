angular.module("notesApp.programme.controllers", []).controller("ProgrammeController", ["$scope", "$modal", "$log", "Programme",
    function ($scope, $modal, $log, Programme) {
        var deps = Programme.query(function () {
            $scope.programmes = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/programme/views/nouveau.html',
                controller: 'ProrammeFenetreController',
                controllerAs: 'programme',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Programme();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.programmes.length; i++) {
                            if ($scope.programmes[i].id === item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.programmes.splice(id, 1, item);
                        }
                    });
                } else {
                    Programme.save(item, function () {
                        $scope.programmes.push(item);
                    });
                }
            }, function () {

            });

        };
        $scope.supprimerProgramme = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce programme?")) {
                Programme.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.programmes.length; i++) {
                        if ($scope.programmes[i].id === item.id) {
                            id = i;
                            break;
                        }
                    }
                    if (id) {
                        $scope.programmes.splice(id, 1);
                    }
                });
            }
        };
    }]).controller("ProrammeFenetreController", ["$log","$scope", "$modalInstance", "element", "Option", "Niveau", "Annee", "UniteEns",
    function ($log, $scope, $modalInstance, element, Option, Niveau, Annee, UniteEns) {
        
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });
        var opts = Option.query(function () {
            $scope.options = opts;
        });
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        var deps = UniteEns.query(function () {
            $scope.unites = deps;
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
