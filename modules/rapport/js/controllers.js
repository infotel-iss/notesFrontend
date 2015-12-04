angular.module("notesApp.rapports.controllers", []).controller("ProcesVerbalController", ["$scope", "$http", "Departement", "Niveau", "Annee",
    function ($scope, $http, Departement, Niveau, Annee) {
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niv = Niveau.query(function () {
            $scope.niveaux = niv;
        });
        var anns = Annee.query(function () {
            $scope.annees = anns;
        });
        $scope.updateOptions = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement.id + '/' + $scope.niveau.id).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
            }
        };
        $scope.changerOption = function () {
            if (($scope.option) && ($scope.niveau)) {
                $http.get('/api/cours/' + $scope.niveau.id + '/' + $scope.option.id).success(function (data, status, config, headers) {
                    $scope.cours = data;
                });
            }
        }
        $scope.produirePV = function () {
            var toto = "/api/rapport/pv/";
            toto = toto + $scope.niveau.id + "/";
            toto = toto + $scope.option.id + "/";
            toto = toto + $scope.cour.id + "/";
            toto = toto + $scope.annee + "/";
            toto = toto + $scope.session;
            $http.get(toto).success(function (data, status, headers, config) {
                if ((status === 200) && (headers('content-type') == 'text/pdf')) {
                    var element = angular.element('<a>');
                    element.attr({
                        href: config.url,
                        target: '_blank',
                        download: 'pv.pdf'
                    })[0].click();
                }
            });
        };
    }]).controller("SyntheseController", ["$log","$scope", "$http", "Departement", "Niveau", "Annee",
    function ($log,$scope, $http, Departement, Niveau, Annee) {
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niv = Niveau.query(function () {
            $scope.niveaux = niv;
        });
        var anns = Annee.query(function () {
            $scope.annees = anns;
        });
        $scope.updateOptions = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement.id + '/' + $scope.niveau.id).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
                $http.get('/api/niveaux/' + $scope.niveau.id + '/semestres').success(function (data, status, config, headers) {
                    $scope.semestres = data;
                });
            }
        };
        $scope.produireSynthese = function () {
            var toto;
            $log.log($scope.semestre);
            $log.log($scope.semestre !== undefined);
            $log.log(!$scope.semestre);
            if (($scope.semestre !== undefined) && ($scope.semestre)) {
                toto = "/api/rapport/synthese/semestre/";
                toto = toto + $scope.niveau.id + "/";
                toto = toto + $scope.option.id + "/";
                toto = toto + $scope.annee + "/";
                toto = toto + $scope.semestre;
            } else {
                toto = "/api/rapport/synthese/annuelle/";
                toto = toto + $scope.niveau.id + "/";
                toto = toto + $scope.option.id + "/";
                toto = toto + $scope.annee;
            }
            $http.get(toto).success(function (data, status, headers, config) {
                if ((status === 200) && (headers('content-type') === 'text/pdf')) {
                    var element = angular.element('<a>');
                    element.attr({
                        href: config.url,
                        target: '_blank',
                        download: 'synthese.pdf'
                    })[0].click();
                }
            });
        };
    }]).controller("RelevesNoteController", ["$scope", function () {

    }]);


