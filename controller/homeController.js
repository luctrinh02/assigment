app.controller("homeController", function ($scope, $http) {
    $scope.subjects = [];
    $scope.subject = { Id: "", Name: "", Logo: "" };
    $scope.begin = 0;
    $scope.maxPage = 0;
    $scope.page = 0;
    $http.get("https://621322cdf43692c9c6faeb5b.mockapi.io/Subjects").then(function (response) {
        $scope.subjects = response.data;
        $scope.maxPage = Math.ceil($scope.subjects.length / 4) - 1;
    });
    $scope.first = function () {
        $scope.page = 0;
        $scope.begin = 0;
    }
    $scope.prev = function () {
        $scope.page -= 1;
        $scope.begin = $scope.page * 4;
    }
    $scope.next = function () {
        $scope.page += 1;
        $scope.begin = $scope.page * 4;
    }
    $scope.last = function () {
        $scope.page = $scope.maxPage;
        $scope.begin = $scope.page * 4;
    }
});