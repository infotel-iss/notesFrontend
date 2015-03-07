angular.module("notesApp.options.services", []).factory('Options', function($resource) {
	return $resource("/api/options/:id", {
		id : '@id'
	}, {
		update : {
			method : 'PUT'
		}
	});
});