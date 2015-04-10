angular.module("notesApp.typecours.controllers", []).controller("TypecoursController", ["$scope", "$modal", "$log", "TypeCours",
    function ($scope, $modal, $log, TypeCours) {
        var deps = TypeCours.query(function () {
            $scope.typecours = deps;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/typecours/views/nouveau.html',
                controller: 'TypecoursFenetreController',
                controllerAs: 'semestre',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new TypeCours();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.typecours.length; i++) {
                            if ($scope.typecours[i].id == item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.typecours.splice(id, 1, item);
                        }
                    });
                } else {
                    TypeCours.save(item, function () {
                        $scope.typecours.push(item);
                    });
                }
            }, function () {

            });

        }
        $scope.supprimerTypecours = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce type de cours?")) {
                $log.log("l'element a pour id ="+ item.id);
                TypeCours.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.typecours.length; i++) {
                        if ($scope.typecours[i].id == item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.typecours.splice(id, 1);
                    }
                })
            }
        }
    }]).controller("TypecoursFenetreController", ["$log", "$scope", "$modalInstance", "element",
    function ($log, $scope, $modalInstance, element) {
        $scope.element = element;
        $log.log(element);
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };

    }]);
