angular.module("notesApp.typecours.services", []).factory('TypeCours', function ($resource) {
    return $resource("/api/typeCours/:id", {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}); 