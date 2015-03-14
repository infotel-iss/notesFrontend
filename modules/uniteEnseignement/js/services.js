angular.module("notesApp.uniteenseignements.services", []).factory('UniteEns', function($resource) {
	return $resource("/api/uniteEns/:id", {
		id : '@id'
	}, {
		update : {
			method : 'PUT'
		}
	});
}); 