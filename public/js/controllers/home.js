'use strict';
app.controller('HomeController', ['$scope','$rootScope', '$http', '$state',function($scope,$rootScope, $http, $state) {
    console.log("Inside Home Controller");
    $scope.p={};
    $scope.init = function () {
      $http.get('/api/v1/view')
        .success(function (res) {
          console.log("Got patient data");
          console.log(res);
          $scope.data = res.data;
        })
        .error(function (err,data) {
          console.log("No data found");
        })
    }
    $scope.validate = function () {
      var emailRegEx = /\S+@\S+\.\S+/;
      var phoneRegEx = new RegExp("^\d{10}$");
      console.log($scope.p);
      console.log(emailRegEx.test($scope.p.email));
      if(emailRegEx.test($scope.p.email)){
        if(phoneRegEx.test($scope.p.phoneNumber)){
          return true;
        }
        else{
          alert("Something is wrong with the Phone Number.");
          return false;
        }
      }
      else{
        alert("Please provide a valid email address.")
        return false;
      }
    }
    $scope.init();
    $scope.add =function () {
      if($scope.validate()){
        console.log($scope.p);
        $http.post('/api/v1/add',$scope.p)
            .success(function(res){
              console.log("Data saved successfully.");
              $scope.init();
              $scope.p={};
            })
            .error(function (err,data) {
              console.log("error saving data");
            })
      }

    }

  }])
