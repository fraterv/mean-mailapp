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
			return $http.get('/mailapi/folders');
		},
		//Show mails by folder
		selectFolder: function (folder) {
			return $http.get('mailapi/shbyfolder/' + folder);
		},
		//Show mail by _id
		selectMail: function (mail) {
			var url = 'mailapi/show/' + mail._id;
			return $http.get(url);
		},
		//Delete mail by _id
		deleteMail: function (mail) {
			return $http.delete('mailapi/deletemail/' + mail._id);
		},
		//Delete folder by foldername
		deleteFolder: function (folder) {
			return $http.delete('/mailapi/deletefolder/' + folder);
		},
		//Rename folder by foldername
		renameFolder: function (folder, newName) {
			return $http.put('/mailapi/updfoldername/' + folder, {folder: newName});
		},
		//Move folder by foldername
		moveFolder: function (mail, newName) {
			return $http.put('/mailapi/movemail/' + mail._id, {folder: newName});
		},
		//Create new mail
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
			return $http.post('/mailapi/createmail', paras);
		}	};
});