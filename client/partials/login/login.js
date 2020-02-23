angular.module('phone').controller("loginCtrl", loginCtrl);

function loginCtrl($location, $emit, $on, $timeout, authentication) {
    let self = this;
    self.formError = ""
    self.user = {
        usernmae: "",
        password: ""
    }
    self.login = function () {
        if (!self.user.username || !self.user.password) {
            self.formError = "All fields required, please try again!";
        } else {
            self.doLoggin()
        }
    };

    self.doLoggin = function () {

        authentication.login(self.user)
            .then(function (user) {
                self.formError = "";
                $location.path('/admin');
            }).catch(function (err) {
                self.formError = "Username or password is incorrect!";
                console.log('err', err);
            })
    }
}