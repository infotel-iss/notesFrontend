angular.module("notesApp.cours.controllers", []).controller("CoursController", ["$scope", "$modal", "Cours",
    function ($scope, $modal, Cours) {
        var cours = Cours.query(function () {
            $scope.cours = cours;
            $scope.totalItems = cours.length;
        });
        $scope.itemsPerPage = 15;
        $scope.currentPage = 1;
        $scope.afficherFenetre = function (cle, item) {
            var modelInstance = $modal.open({
                templateUrl: '/modules/cours/views/nouveau.html',
                controller: 'CoursFenetreController',
                controllerAs: 'depart',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt = {};
                        tt.cle = cle;
                        tt.item = item;
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (resultat) {
                var item = resultat.item;
                var cle = resultat.cle;
                if ((item.id !== undefined) && (cle !== undefined)) {
                    item.$update(function () {
                        $scope.cours.splice(cle, 1, item);
                    });
                } else {
                    Cours.save(item, function () {
                        $scope.cours.push(item);
                    });
                }
            }, function () {

            });

        }
        $scope.supprimerCours = function (cle, item) {
            if (confirm("Voulez vous vraiment supprimer ce cours?")) {
                Cours.remove({
                    id: item.id
                }, function () {
                    
                    if (cle !== undefined) {
                        $scope.cours.splice(cle, 1);
                    }
                })
            }
        }
    }]).controller("CoursFenetreController", ["$scope", "$modalInstance", "element", "TypeCours",
    function ($scope, $modalInstance, element, TypeCours) {
        $scope.element = element.item;
        $scope.cle = element.cle;
        var type = TypeCours.query(function () {
            $scope.types = type;
        });
        $scope.valider = function () {
            var resultat = {};
            resultat.item = $scope.element;
            resultat.cle = $scope.cle;
            $modalInstance.close(resultat);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };

    }]);
