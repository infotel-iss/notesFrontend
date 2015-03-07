angular.module("notesApp.annees.services", []).factory('Annees', function ($resource) {
    return $resource("/api/annees/:id", {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});

