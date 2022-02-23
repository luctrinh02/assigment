app.controller("tkController", function ($scope, $http) {
  $scope.new = {
    username: "",
    password: "",
    role: 1,
    fullname: "",
    email: "",
    gender: true,
    birthday: "",
    schoolfee: "",
    marks: [],
  };
  let id = "";
  $scope.isSua = false;
  $scope.them = function () {
    $scope.$parent.isLoading = true;
    $http
      .post("https://621322cdf43692c9c6faeb5b.mockapi.io/Students", $scope.new)
      .then(function (response) {
        alert("Thêm mới thành công");
        $scope.$parent.isLoading = false;
        $scope.$parent.users.push(angular.copy($scope.new));
        $scope.moi();
      });
  };
  $scope.sua = function () {
    $scope.$parent.isLoading = true;
    $http
      .put(
        "https://621322cdf43692c9c6faeb5b.mockapi.io/Students/" + $scope.new.id,
        $scope.new
      )
      .then(function (response) {
        $scope.$parent.isLoading = false;
        let flag = $scope.$parent.users
          .map(function (e) {
            return e.id;
          })
          .indexOf($scope.new.id);
        $scope.$parent.users[flag] = angular.copy($scope.new);
        alert("Sửa thành công");
        $scope.$parent.isLoading = false;
        $scope.moi();
      });
  };
  $scope.moi = function () {
    $scope.new = {
      username: "",
      password: "",
      role: 1,
      fullname: "",
      email: "",
      gender: true,
      birthday: "",
      schoolfee: "",
      marks: [],
    };
    id = "";
    $scope.isSua = false;
  };
  $scope.suaDoi = function (index) {
    $scope.new = angular.copy($scope.$parent.users[index]);
    console.log($scope.new)
    $scope.isSua = true;
  };
  $scope.xoa = function () {
    $scope.$parent.isLoading = true;
    $http
      .delete("https://621322cdf43692c9c6faeb5b.mockapi.io/Students/" + id)
      .then(function (response) {
        $scope.$parent.isLoading = false;
        let flag = $scope.$parent.users
          .map(function (e) {
            return e.id;
          })
          .indexOf(id);
        $scope.$parent.users.splice(flag, 1);
        alert("Xoá thành công");
        $scope.moi();
      });
  };
  $scope.getId = function (value) {
    id = value;
  };
});
