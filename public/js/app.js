var app = angular.module("mailApp", []);

app.factory('Test', function($http){
	return $http.get('/test');
});

app.factory('Mails', function($http){
	return $http.get('/mailapi/folders');
}); 

app.factory('factoryMail', function($http) {
	console.log("Wir sind in der Factory");
	return {
		getFolders: function() {
			console.log("Wir sind in getFolders!");
			return $http.get('/mailapi/folders');
		}
	};
});