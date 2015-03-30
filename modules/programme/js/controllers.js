angular.module("notesApp.programme.controllers", []).controller("ProgrammeController", ["$scope", "$modal", "$log", "Programme", "Annee", "Departement", "Niveau", "$http",
    function ($scope, $modal, $log, Programme, Annee, Departement, Niveau, $http) {
        var programmes = Programme.query(function () {
            $scope.programmes = programmes;
        });
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niveaux = Niveau.query(function () {
            $scope.niveaux = niveaux;
        });
        
        $scope.updateOptionsSemestre = function () {
            if (($scope.departement !== null) && ($scope.niveau !== null)) {
                $http.get('/api/options/' + $scope.departement + '/' + $scope.niveau).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
                $http.get('/api/niveaux/'+ $scope.niveau+"/semestres").success(function (data, status, config, headers) {
                    $scope.semestres = data;
                });
            }
        };
        
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
                    var toto = Programme.save(item, function () {
                        $scope.programmes.push(toto);
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
    }]).controller("ProrammeFenetreController", ["$log","$scope", "$modalInstance", "element", "Option", "Niveau", "Annee", "UniteEns", "Departement",
    function ($log, $scope, $modalInstance, element, Option, Niveau, Annee, UniteEns, Departement) {
        
        $scope.element = element;
        
        var opts = Option.query(function () {
            $scope.options = opts;
        });
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });
        
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        var units = UniteEns.query(function () {
            $scope.unites = units;
        });
        
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        
        $log.log(element);
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $log.log("version cancel");
            $modalInstance.dismiss("Cancel");
        };

    }]);
