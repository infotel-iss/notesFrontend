angular.module("notesApp.rapports.controllers", []).controller("ProcesVerbalController", ["$scope", "$http", "Departement", "Option", "Cours", "Niveau", "Annee", function ($scope, $http, Departement, Option, Cours, Niveau, Annee) {
        var deps = Departement.query(function () {
            $scope.departements = deps;
        });
        var niv = Niveau.query(function () {
            $scope.niveaux = niv;
        });
        var anns = Annee.query(function () {
            $scope.annees = anns;
        });
        var css = Cours.query(function () {
            $scope.cours = css;
        });
        $scope.updateOptions = function () {
            if (($scope.departement) && ($scope.niveau)) {
                $http.get('/api/options/' + $scope.departement.id + '/' + $scope.niveau.id).success(function (data, status, config, headers) {
                    $scope.options = data;
                });
            }
        };
        $scope.produirePV = function () {
            var toto = "/api/rapport/pv/";
            toto = toto + $scope.niveau.id + "/";
            toto = toto + $scope.option.id + "/";
            toto = toto + $scope.cour.id + "/";
            toto = toto + $scope.annee + "/";
            toto = toto + $scope.session;

            $http.get(toto).success(function (data, status, config, headers) {
                var element = angular.element('<a/>');
                element.attr({
                    href: 'data:attachment/pdf;charset=utf-8,' + encodeURI(data),
                    target: '_blank',
                    download: 'pv.pdf'
                })[0].click();
            });
        };
    }]).controller("SyntheseController", ["$scope", function () {

    }]).controller("RelevesNoteController", ["$scope", function () {

    }]);


