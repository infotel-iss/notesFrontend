angular.module("notesApp.etudiants.controllers", []).controller("EtudiantController", ["$log", "$http", "$scope", "Etudiant", "Annee", "Departement", "Niveau", "Option",
    function ($log, $http, $scope, Etudiant, Annee, Departement, Niveau, Option) {
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niveaux = Niveau.query(function () {
            $scope.niveaux = niveaux;
        });
        $scope.annee = null;
        $scope.departement = null;
        $scope.niveau = null;
        $scope.option = null;
        $scope.currentPage = 1;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.updateOptions = function () {
            if (($scope.departement !== null) && ($scope.niveau !== null)) {
                $http.get('/api/options/' + $scope.departement + '/' + $scope.niveau).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
            }
        };

        $scope.filtrer = function () {
            var queries = {};
            if ($scope.annee !== null) {
                queries['anneeId'] = $scope.annee;
            }
            if ($scope.departement !== null) {
                queries['departementId'] = $scope.departement;
            }
            if ($scope.niveau !== null) {
                queries['niveauId'] = $scope.niveau;
            }
            if ($scope.option !== null) {
                queries['optionId'] = $scope.option;
            }
            $http.get('/api/etudiants/inscrits', {params: queries}).success(function (data, status, config, headers) {
                $scope.etudiants = data;
                $scope.totalItems = data.length;
            });
        }

    }]);
