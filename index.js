let oldSchool = angular.module('oldSchool', []);

oldSchool.controller('oldSchoolController', function oldSchoolController($scope, $http) {
    let scope = $scope
        , http = $http;

    scope.message = {
        value: "",
    };
    scope.auth = {
        login: "",
        password: "",
    };
    scope.btn = {
        text: "Включить регистрацию",
        style: "btn-primary",
        isOn: false,
    };

    scope.typing = (value) => {
        scope.message.value = value;
    };

    scope.turnRegistration = (sw) => {
        console.log("HHHHH ", scope.message.value);
        let url = ["http://127.0.0.1:3000", !sw ? "start" : "stop"].join('/');

        let params = {
            msg: scope.message.value,
            login: scope.auth.login,
            password: scope.auth.password
        };
        http({
            method: "GET",
            url,
            params
        }).then((res) => {
            console.log("resp is ", res.data);
            console.log("resp code is ", res.status);
            console.log("resp  ", res);
            if (!!res && !!res.status && res.status === 200) {
                scope.btn.style = !sw ? 'btn-danger' : "btn-primary";
                scope.btn.text = !sw ? 'Выключить' : "Включить регистрацию";
                scope.btn.isOn = !scope.btn.isOn;
            }
        }).catch((err) => {
            console.log("err ", err)
        })
    };


});