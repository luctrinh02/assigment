app.controller("tkController", function ($scope, $http) {
  $scope.new = {
    id: "",
    username: "",
    password: "",
    role: "1",
    fullname: "",
    email: "",
    gender: "true",
    birthday: "",
    schoolfee: "",
    marks: [],
  };
  let id = "";
  $scope.isSua = false;
  $scope.them = function () {
    if ($scope.checkTrungMoi()) {
      $scope.$parent.isLoading = true;
      $scope.new.id =
        $scope.$parent.users[$scope.$parent.users.length - 1].id + 1;
      $http
        .post("https://621322cdf43692c9c6faeb5b.mockapi.io/User", $scope.new)
        .then(function (response) {
          alert("Thêm mới thành công");
          $scope.$parent.isLoading = false;
          $scope.$parent.users.push(angular.copy(response.data));
          console.log(response.data);
          $scope.moi();
        });
    } else {
      alert("Đã tồn tại tài khoản này!");
    }
  };
  $scope.sua = function () {
    if ($scope.checkTrung()) {
      $scope.$parent.isLoading = true;
      $http
        .put(
          "https://621322cdf43692c9c6faeb5b.mockapi.io/User/" + $scope.new.id,
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
    } else {
      alert("Đã tồn tại tài khoản này!");
    }
  };
  $scope.moi = function () {
    $scope.new = {
      username: "",
      password: "",
      role: "1",
      fullname: "",
      email: "",
      gender: "true",
      birthday: "",
      schoolfee: "",
      marks: [],
    };
    id = "";
    $scope.isSua = false;
  };
  let indexSua = 0;
  $scope.suaDoi = function (index) {
    $scope.new = angular.copy($scope.$parent.users[index]);
    console.log($scope.new);
    indexSua = index;
    $scope.isSua = true;
  };
  $scope.xoa = function () {
    if (id == $scope.$parent.student.id) {
      alert("Không thể tự xoá chính mình");
    } else {
      $scope.$parent.isLoading = true;
      $http
        .delete("https://621322cdf43692c9c6faeb5b.mockapi.io/User/" + id)
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
    }
  };
  $scope.getId = function (value) {
    id = value;
  };
  $scope.checkTrung = function () {
    let count = 0;
    let isNotHave = true;
    let isChangeUsername = false;
    if ($scope.new.username === $scope.$parent.users[indexSua].username) {
      isChangeUsername = false;
    } else {
      isChangeUsername = true;
    }
    if ($scope.new.username)
      for (let i = 0; i < $scope.$parent.users.length; i++) {
        if ($scope.new.username === $scope.$parent.users[i].username) {
          count++;
        }
      }
    if (count == 1 && isChangeUsername == true) {
      isNotHave = false;
    }
    if (count == 2 && isChangeUsername == false) {
      isNotHave = false;
    }
    console.log(isNotHave + "/" + count);
    return isNotHave;
  };
  $scope.checkTrungMoi = function () {
    let isNotHave = true;
    for (let i = 0; i < $scope.$parent.users.length; i++) {
      if ($scope.new.username === $scope.$parent.users[i].username) {
        isNotHave = false;
      }
    }
    return isNotHave;
  };
});
