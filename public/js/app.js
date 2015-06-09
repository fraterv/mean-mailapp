var app = angular.module("mailApp", ["ui.bootstrap"]);

app.factory('factoryMail', function($http) {
	console.log("Wir sind in der Factory");
	return {
		getFolders: function() {
			console.log("Wir sind in factoryMail.getFolders!");
			return $http.get('/mailapi/folders');
		},
		getMailsFromFolder: function (folder) {
			return $http.get('http://localhost:3000/mailapi/shbyfolder/' + folder);
		},
		selectMail: function (mail) {
			var url = 'http://localhost:3000/mailapi/show/' + mail._id;
			return $http.get(url);
		},
		deleteMail: function (mail) {
			return $http.delete('http://localhost:3000/mailapi/deletemail/' + mail._id);
		},
		deleteFolder: function (folder) {
			return $http.delete('http://localhost:3000/mailapi/deletefolder/' + folder);
		},
		renameFolder: function (folder, newName) {
			return $http.put('http://localhost:3000/mailapi/updfoldername/' + folder, {folder: newName});
		},
		moveFolder: function (mail, newName) {
			return $http.put('http://localhost:3000/mailapi/movemail/' + mail._id, {folder: newName});
		},
		newMail: function (mail) {
			var recipients = mail.rec.split(';');
			var paras = {
				sender: mail.sender,
				recipients: recipients,
				text: mail.text,
				subject: mail.subject,
				date: mail.date,
				folder: mail.folder
			};
			console.log("create mail:" );
			console.log(paras);
			return $http.post('http://localhost:3000/mailapi/createmail', paras);
		}
	};
});