var app = angular.module('app', ['ui.bootstrap']);
 
function TodoCtrl($scope, $modal, $filter) {
	$scope.tasks = angular.fromJson(localStorage.tasks);

	$scope.finishedCount = function() {
		return $filter('filter')($scope.tasks, {done: true}).length;
	}

	$scope.addTask = function() {
		var modalInstance = $modal.open({
			templateUrl: 'task_dialog.html',
			controller: 'TaskDialogCtrl'
		});

		modalInstance.result.then(function(title) {
			$scope.tasks.unshift({'title': title, done: false});
			$scope.save();
		});
	}

	$scope.removeTask = function(taskIndex) {
		$scope.tasks.splice(taskIndex, 1);
		$scope.save();
	}

	$scope.removeFinished = function() {
		$scope.tasks = $filter('filter')($scope.tasks, {done: false});
		$scope.save();
	}

	$scope.save = function() {
		localStorage.tasks = angular.toJson($scope.tasks);
	}
};

function TaskDialogCtrl($scope, $modalInstance) {
	$scope.close = function(){
		$modalInstance.dismiss('cancel');
	};
	$scope.submit = function(){
		$modalInstance.close($scope.title);
	};
};
