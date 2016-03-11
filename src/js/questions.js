/**
 * Created by an5ra on 3/10/2016.
 */
/**
 ANGULAR APP
 **/
var app = angular.module('questionsApp',[]);
var numberOfquestions = 3;

app.controller('questionsController', ['$scope', '$http', function ($scope, $http) {
    $http.get('./js/data.json').success(function (data) {
        var questions = data.data;
        var question1 = questions[0];
        $scope.questionNumber = 1;
        $scope.question = question1.questionText;
        $scope.options = question1.optionsText;
        $scope.hint = question1.hintText;
        $scope.rightAnswer = question1.correctAnswerText;
    })
}]);