var myApp=angular.module('myApp', []);
// controller for add pet view
myApp.controller('heroController', ['$scope', '$http', function($scope, $http){
  $scope.allTheRecords =[];
  // get call on page load to load all heroes in DB onto DOM
  $http({
      method: 'GET',
      url: '/getHeroes',
    }).then( function( response ){
      $scope.allTheRecords = response.data;
      console.log( $scope.allTheRecords );
    }, function myError( response ){
      console.log( response.statusText );
    });
    // submit button to add hero post creating object out of inputs
    $scope.addHero = function(){
    var objectToSend = {
      alias: $scope.aliasIn,
      first_name: $scope.firstIn,
      last_name: $scope.lastIn,
      city: $scope.cityIn,
      power_name: $scope.powerIn
    };
    $http({
       method: 'POST',
       url: '/addHero',
       data: objectToSend
    }); //end http post call
    $http({
        method: 'GET',
        url: '/getHeroes',
      }).then( function( response ){
        $scope.allTheRecords = response.data;
        console.log( $scope.allTheRecords );
      }, function myError( response ){
        console.log( response.statusText );
      });
    // clears inputs
    $scope.aliasIn='';
    $scope.firstIn='';
    $scope.lastIn='';
    $scope.cityIn='';
  }; // end addHero
  $scope.deleteHero = function(index){
    // Initially was using $index to delete but had to change to record because sorting crewed up the $index

    var idx = $scope.allTheRecords[index];

    //console.log(petToDelete._id);
    var heroId = {id: idx._id};
    $http({
      method: 'POST',
      url: '/deleteHero',
      data: heroId
    });
    $scope.allTheRecords.splice(index, 1);
  };
}]); // end heroController
