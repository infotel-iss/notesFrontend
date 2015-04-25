angular.module("notesApp.typecours.controllers", []).controller("TypecoursController", ["$scope", "$modal", "TypeCours",
    function ($scope, $modal,TypeCours) {
        var deps = TypeCours.query(function () {
            $scope.typecours = deps;
        });
        $scope.ajouterEvaluation = function(typ,eva){
            var modelInstance = $modal.open({
                templateUrl: '/modules/typecours/views/nouveau_evaluation.html',
                controller: 'EvaluationDetailController',
                controllerAs: 'evaluation',
                keyboard: true,
                backdrop: false,
                resolve: {
                    element: function () {
                        var tt;
                        if (eva){
                            tt = eva;
                            tt.typecours = typ;
                        }
                        else{
                            tt = {};
                            tt.typecours = typ;
                        }
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function(item){
                if(item.id){
                    // I'm updating
                }else{
                    // I'm creating a new value
                    $http.post()
                }
            }, function(){
                
            });
        };
        $scope.modifierEvaluation = function(){
            
        };
        $scope.supprimerEvaluation = function(){
            
        };
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
                            tt ={};
                        return tt;
                    }
                }
            });
            modelInstance.result.then(function (item) {
                if (item.id) {
                    item.$update(function (toto) {
                        var id;
                        for (var i = 0; i < $scope.typecours.length; i++) {
                            if ($scope.typecours[i].id === item.id) {
                                id = i;
                                break;
                            }
                        }
                        if (id) {
                            $scope.typecours.splice(id, 1, toto);
                        }
                    });
                } else {
                    TypeCours.save(item, function () {
                        $scope.typecours.push(item);
                    });
                }
            }, function () {

            });

        };
        $scope.supprimerTypecours = function (item) {
            if (confirm("Voulez vous vraiment supprimer ce type de cours?")) {
                TypeCours.remove({
                    id: item.id
                }, function () {
                    var id;
                    for (var i = 0; i < $scope.typecours.length; i++) {
                        if ($scope.typecours[i].id === item.id) {
                            id = i;
                            break;
                        }

                    }
                    if (id) {
                        $scope.typecours.splice(id, 1);
                    }
                });
            };
        };
    }]).controller("TypecoursFenetreController", ["$scope", "$modalInstance", "element",
    function ($scope, $modalInstance, element) {
        $scope.element = element;
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };

    }]).controller("EvaluationDetailController", ["$scope", "Evaluation","$modalInstance","element", function($scope, Evaluation,$modalInstance,element){
        var ops = Evaluation.query(function(){
            $scope.evaluations = ops;
        });
        $scope.element = element;
        $scope.valider = function () {
            $modalInstance.close($scope.element);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("Cancel");
        };
    }]);
