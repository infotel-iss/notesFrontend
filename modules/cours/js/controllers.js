angular.module("notesApp.cours.controllers", []).controller("CoursController", ["$scope", "$modal", "$log", "Cours",
    function ($scope, $modal, $log, Cours) {
        var cours = Cours.query(function () {
            $scope.cours = cours;
        });
        $scope.afficherFenetre = function (item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/cours/views/nouveau.html',
                controller: 'CoursFenetreController',
                controllerAs: 'depart',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (item)
                            tt = item;
                        else
                            tt = new Cours();
                        $log.log(tt);
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function () {
                        var id;
                        for (var i = 0; i < $scope.cours.length; i++) {
                            if ($scope.cours[i].id == item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.cours.splice(id, 1, item);
                        }
                    });
                } else {
                    Cours.save(item, function () {
                        $scope.cours.push(item);
                    });
                }
            }, function () {

            });

        }
        $scope.supprimerCours = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce cours?")) {
                Cours.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.cours.length; i++) {
                        if ($scope.cours[i].id == item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.cours.splice(id, 1);
                    }
                })
            }
        }
    }]).controller("CoursFenetreController", ["$log", "$scope", "$modalInstance", "element","TypeCours",
    function ($log, $scope, $modalInstance, element, TypeCours) {
        $scope.element = element;
        var type = TypeCours.query(function () {
            $scope.types = type;
        });
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
