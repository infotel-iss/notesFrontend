angular.module("notesApp.options.services", []).factory('Option', function($resource) {
	return $resource("/api/options/:id", {
		id : '@id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}); 