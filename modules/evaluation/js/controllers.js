angular.module("notesApp.evaluations.controllers",[]).controller("EvaluationController", ["$scope", "$modal", "Evaluation",
function($scope, $modal, Evaluation) {
	var deps = Evaluation.query(function() {
		$scope.evaluations = deps;
	});
	$scope.afficherFenetre = function(item) {
		var modelInstance = $modal.open({
			templateUrl : '/modules/evaluation/views/nouveau.html',
			controller : 'EvaluationFenetreController',
			controllerAs : 'depart',
			keyboard : true,
			backdrop : false,
			resolve : {
				element : function() {
					var tt;
					if(item)
					   tt = item;
					else
					   tt = {};
					return tt;
				}
			}
		});
		modelInstance.result.then(function(item) {
			if (item.id) {
				item.$update(function(toto) {
					var id;
					for (var i = 0; i < $scope.evaluations.length; i++) {
						if ($scope.evaluations[i].id === item.id) {
							id = i;
							break;
						}
					}
					if (id) {
						$scope.evaluations.splice(id, 1,toto);
					}
				});
			} else {
				var toto = Evaluation.save(item, function() {
					$scope.evaluations.push(toto);
				});
			}
		}, function() {

		});

	};
	$scope.supprimerEvaluation = function(item) {
		if (confirm("Voulez vous vraiment supprimer cette évaluation?")) {
			Evaluation.remove({
				id : item.id
			}, function() {
				var id;
				for (var i = 0; i < $scope.evaluations.length; i++) {
					if ($scope.evaluations[i].id === item.id) {
						id = i;
						break;
					}

				}
				if (id) {
					$scope.evaluations.splice(id, 1);
				}
			});
		};
	};
}]).controller("EvaluationFenetreController", ["$scope", "$modalInstance", "element",
function($scope, $modalInstance, element) {
	$scope.element = element;
	$scope.valider = function() {
		$modalInstance.close($scope.element);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss("Cancel");
	};

}]);
