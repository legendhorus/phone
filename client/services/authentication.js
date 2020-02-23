angular.module('phone').service('authentication', authentication);
function authentication ($window, $http) {

    var defaultAvatar = "avatar/default_user.png";
    
    
    var saveToken = function(token) {
        $window.localStorage['token'] = token;
    }
    var getToken = function () {
        return $window.localStorage['token'];
    }

    var saveUserName = function(username) {
        $window.localStorage['username'] = username;
    }
    var getUsername = function () {
        return $window.localStorage['username'];
    }

    
    var login = function(user) {
        return $http.post('/action/login', user)
                    .then(function (userdata){
                        saveToken(userdata.data.token);
                        saveUserName(userdata.data.user.username);
                    })
    }
    var register = function(user) {
        user.avatar = defaultAvatar;
        return $http.post('/action/register', user)
                    .then(function(user){
                        saveToken(user.data);
                    })
    }
    var logout = function(){
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('username');
    }
    var isLoggedIn = function() {
        var token = getToken();
        if(token){
            // console.log('token',token)
            // var payload = JSON.parse($window.atob(token.split('.')[1]));
            // return payload.exp > Date.now() / 1000;
            return true;
        } else {
            console.log('no token');
            return false;
        }
    }
    return {
        login: login,
        logout: logout,
        register: register,
        getToken: getToken,
        getUsername: getUsername
    }
}
