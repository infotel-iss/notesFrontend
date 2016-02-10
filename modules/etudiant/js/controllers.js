angular.module("notesApp.etudiants.controllers", []).controller("EtudiantController", ["$http", "$scope", "Etudiant", "Annee", "Departement", "Niveau", "Option",
    function ($http, $scope, Etudiant, Annee, Departement, Niveau, Option) {
        $scope.taille = 15;
        $scope.etudiants = [];
        var etds = Etudiant.query(function () {
            for (var i = 0; i < $scope.taille; i++) {
                $scope.etudiants.push(etds[i]);
            };
            //$scope.etudiants = etds;
            $scope.totalItems = $scope.etudiants.length;
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
        $scope.itemsPerPage = 15;
        $scope.currentPage = 1;
        
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
// on teste les infitt liste
        $scope.loadMore = function() {
            console.log('je suis ici' + 'la taille est de '+$scope.taille);
            for (var i = $scope.taille; i < $scope.taille + 10; i++) {
                $scope.etudiants.push(etds[i]);
            };
            $scope.taille = $scope.taille + 10;
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
        };

    }]).controller('EtudiantImportController', ["$scope", "$http", "Annee", "$log", "FileUploader", function ($scope, $http, Annee, $log, FileUploader) {
        $scope.fichier = null;
        $scope.annee = null;
        $scope.files = null;
        $scope.uploadFile = function (fs) {
            $scope.files = fs;
        };
        var ans = Annee.query(function () {
            $scope.annees = ans;
        });
        $scope.valider = function () {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("fichier", $scope.files[0]);
            fd.append("annee", $scope.annee);
            $http.post('/api/etudiants/import', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function () {
                
            }).error(function () {
               
            });
        };

        //je suis en train de tester 

        var uploader = $scope.uploader = new FileUploader({
            url: '/api/etudiants/import'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        //fin de mes teste
    }]);
