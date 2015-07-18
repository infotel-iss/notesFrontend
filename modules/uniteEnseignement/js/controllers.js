angular.module("notesApp.uniteenseignements.controllers", []).controller("UniteEnseignementController", ["$scope", "$modal", "$log", "UniteEns", "Departement", "Niveau", "$http",
    function ($scope, $modal, $log, UniteEns, Departement, Niveau, $http) {

        var deps = Departement.query(function () {
            $scope.departements = deps;
        });

        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });

        $scope.modificationDepartement = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement + '/' + $scope.niveau).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
                $scope.option = null;
            }
        };
        $scope.filtrer = function () {
            if (($scope.niveau) && ($scope.option)) {
                $http.get('/api/uniteEns/' + $scope.niveau + '/' + $scope.option).success(function (data, status, config, headers) {
                    $scope.unites = data;
                });
            }
        };
        $scope.departement = null;
        $scope.niveau = null;
        $scope.option = null;

        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/uniteEnseignement/views/nouveau.html',
                controller: 'UniteEnsFenetreController',
                controllerAs: 'unite',
                keyboard: true,
                backdrop: false,
                resolve: {
                    valeurs: function () {
                        var ret = {};
                        ret.element = item ? item : {hasOptionalChoices:false};
                        ret.departement = $scope.departement;
                        ret.option = $scope.option;
                        ret.niveau = $scope.niveau;
                        ret.modificationDepartement = $scope.modificationDepartement;
                        return ret;
                    }
                }
            });
            modelInstance.result.then(function (resultat) {
                var item = resultat.element;
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
                    $http.post('/api/uniteEns/'+resultat.niveau+'/'+resultat.option, item).success(function (data, status, config, headers) {
                        $scope.unites.push(data);
                    });
//                    var fd = new FormData();
//                    //Take the first selected file
//                    fd.append("niveau", resultat.niveau);
//                    fd.append("option", resultat.option);
//                    fd.append("unite", JSON.stringify(item));
//                    $http.post('/api/uniteEns/ajout/', fd, {
//                        withCredentials: true,
//                        headers: {'Content-Type': undefined},
//                        transformRequest: angular.identity
//                    }).success(function (data) {
//                        $scope.unites.push(data);                    
//
//                    }).error(function () {
//
//                    });
                }
            });

        };
        // la boite modal qui s'occupe de la liste de des cours

        $scope.listerCoursUe = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/uniteEnseignement/views/listeCours.html',
                controller: 'UniteEnsFenetreController',
                controllerAs: 'unite',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        tt = item;
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                } else {
                }
            }, function () {

            });

        };


        $scope.supprimerUniteEns = function (item) {
            if (confirm("Voulez vous vraiment supprimer cette unité d'enseignement?")) {
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
    }]).controller("UniteEnsFenetreController", ["$log", "$scope", "$modalInstance", "valeurs", "Departement", "Niveau", "Cours", "$http",
    function ($log, $scope, $modalInstance, valeurs, Departement, Niveau, Cours, $http) {
        $scope.element = valeurs.element;
        $scope.departement = valeurs.departement;
        $scope.niveau = valeurs.niveau;
        
        $scope.modificationDepartement = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement + '/' + $scope.niveau).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
                $scope.option = {};
            }
        };
        $scope.modificationDepartement();
        $scope.option = valeurs.option;
        $scope.tags = valeurs.element.cours;
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var cours = Cours.query(function () {
            $scope.cours = cours;
        });
        var nivs = Niveau.query(function () {
            $scope.niveaux = nivs;
        });

        $scope.loadItems = function (start) {
            return _.filter($scope.cours, function (hello) {
                return hello.intitule.indexOf(start) > -1;
            });
        };
//        ListeCours.getCoursUe($scope.element.id).then(function (data) {
//            $scope.cours = data;
//        });
//
//        $log.log(element);
        $scope.valider = function () {
            var result = {};
            result.element = $scope.element;
            result.niveau = $scope.niveau;
            result.option = $scope.option;
            result.element.cours = $scope.tags;
            $modalInstance.close(result);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };

    }]);
