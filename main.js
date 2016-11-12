/**
 * Created by deepwest83 on 9/5/2016.
 */
var cjs = angular.module('myApp', ['ui.router']);

cjs.controller('mainController', function ($scope) {
    $scope.loadMoreRecords = function(){
        $scope.$broadcast('loadMoreEmails',{count:20})
    }
});