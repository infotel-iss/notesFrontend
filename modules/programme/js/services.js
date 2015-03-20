angular.module("notesApp.programme.services", []).factory('Programme', function ($resource) {
    return $resource("/api/programmes/:id", {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}); 