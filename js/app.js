const app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/home", {
      templateUrl: "html/home.html",
      controller: "homeController",
    })
    .when("/info", {
      templateUrl: "html/info.html",
    })
    .when("/contact", {
      templateUrl: "html/contact.html",
    })
    .when("/mail", {
      templateUrl: "html/mail.html",
    })
    .when("/", {
      templateUrl: "html/home.html",
      controller: "homeController",
    })
    .when("/quiz/:name",{
      templateUrl: "html/quiz.html",
      controller: "quizController",
    })
    .when("/lichSu",{
      templateUrl: "html/lichSu.html",
      controller:"hisController",
    })
    .when("/taiKhoan",{
      templateUrl: "html/taiKhoan.html",
      controller:"tkController",
    })
    .otherwise({
      redirectTo: "/home",
    });
});
app.controller("control", function ($scope, $http,$rootScope) {
  $scope.taiKhoan = "Tài khoản";
  $scope.xacNhanDangKy = "";
  $scope.subjects = [];
  $scope.tt={};
  $scope.users = [];
  $scope.newAcc = {
    username: "",
    password: "",
    role: "1",
    fullname: "",
    email: "",
    gender: "true",
    birthday: "",
    schoolfee: "",
    marks: [],
  }; //thêm mới
  $scope.student = {
    //dùng để gán
    username: "",
    password: "",
    role: "1",
    fullname: "",
    email: "",
    gender: "",
    birthday: "",
    schoolfee: "",
    marks: [],
  };
  $scope.account = { name: "", pass: "" }; //dùng khi đăng nhập
  $scope.isLoading = true;
  $http
    .get("https://621322cdf43692c9c6faeb5b.mockapi.io/subjects")
    .then(function (response) {
      $scope.subjects = response.data;
      $scope.isLoading = false;
    });
  $scope.isLogin = false;
  let isLogged = false;
  $scope.login = function () {
    $scope.isLoading = true;
    $http
      .get("https://621322cdf43692c9c6faeb5b.mockapi.io/Students")
      .then(function (response) {
        console.log(response.data);
        $scope.users = response.data;
        for (let i = 0; i < $scope.users.length; i++) {
          if (
            $scope.account.name == $scope.users[i].username &&
            $scope.account.pass == $scope.users[i].password
          ) {
            $scope.student = $scope.users[i];
            $scope.tt=angular.copy($scope.student);
            isLogged = true;
            break;
          } else {
            isLogged = false;
          }
        }
        $scope.isLogin = isLogged;
        if ($scope.isLogin == false) {
          alert("Tài khoản hoặc mật khẩu chưa chính xác!");
        } else {
          alert("Đăng nhập thành công");
          $scope.taiKhoan = "Chào, " + $scope.student.username;
          $scope.account.name = "";
          $scope.account.pass = "";
          $("#dangNhap").modal("hide");
        }
        $scope.isLoading = false;
      });
  };
  $scope.dangKy = function (event) {
    event.preventDefault();
    if ($scope.xacNhanDangKy !== $scope.newAcc.password) {
      alert("Mật khẩu xác nhận không chính xác");
    } else {
      $scope.isLoading = true;
      $http
        .get("https://621322cdf43692c9c6faeb5b.mockapi.io/Students")
        .then(function (response) {
          $scope.users = response.data;
          $scope.isLoading = false;
          let isHave = false;
          for (let i = 0; i < $scope.users.length; i++) {
            if ($scope.newAcc.username === $scope.users[i].username) {
              alert("Tài khoản đã tồn tại");
              isHave = true;
              break;
            }
          }
          if (!isHave) {
            $scope.isLoading = true;
            $http
              .post(
                "https://621322cdf43692c9c6faeb5b.mockapi.io/Students",
                $scope.newAcc
              )
              .then(function (response) {
                alert("Đăng ký thành công");
                $scope.newAcc = {
                  username: "",
                  password: "",
                  role: "1",
                  fullname: "",
                  email: "",
                  gender: "",
                  birthday: "",
                  schoolfee: "",
                  marks: [],
                };
                $scope.isLoading = false;
              });
            $("#dangKy").modal("hide");
            $("#dangNhap").modal("show");
          }
        });
    }
  };
  $scope.dangXuat = function () {
    $scope.isLogin = false;
    $scope.taiKhoan = "Tài Khoản";
    $scope.student = {};
    $scope.tt={};
  };
  $scope.huyDangKy = function () {
    $scope.newAcc = {
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
  };
  $scope.qmk = { email: "", user: "", pass: "" };
  $scope.quenMatKhau = function (event) {
    event.preventDefault();
    $scope.isLoading = true;
    let isQMK = false;
    $http
      .get("https://621322cdf43692c9c6faeb5b.mockapi.io/Students")
      .then(function (response) {
        $scope.users = response.data;
        $scope.isLoading = false;
        for (let i = 0; i < $scope.users.length; i++) {
          if (
            $scope.qmk.user == $scope.users[i].username &&
            $scope.qmk.email == $scope.users[i].email
          ) {
            $scope.qmk.pass = $scope.users[i].password;
            isQMK = true;
            break;
          }
        }
        if (!isQMK) {
          alert("Email hoặc tài khoản không chính xác");
        }
      });
  };
  $scope.dmk = { passCu: "", passMoi: "", xnPassMoi: "" };
  $scope.doiMatKhau = function (event) {
    event.preventDefault();
    if ($scope.dmk.xnPassMoi !== $scope.dmk.passMoi) {
      alert("Xác nhận không trùng khớp");
    } else {
      $scope.student.password = $scope.dmk.passMoi;
      $scope.isLoading = true;
      $http
        .put(
          "https://621322cdf43692c9c6faeb5b.mockapi.io/Students/" +
            $scope.student.id,
          $scope.student
        )
        .then(function (response) {
          $scope.isLoading = false;
          alert("Đổi mật khẩu thành công. Hãy đăng nhập lại");
          $scope.dangXuat();
          $("#doiMatKhau").modal("hide");
          $("#dangNhap").modal("show");
        });
    }
  };
  $scope.capNhat=function(event){
    event.preventDefault();
    $scope.isLoading = true;
    $scope.student=angular.copy($scope.tt);
    $http
        .put(
          "https://621322cdf43692c9c6faeb5b.mockapi.io/Students/" +
            $scope.student.id,
          $scope.student
        )
        .then(function (response) {
          $scope.isLoading = false;
          alert("Đổi thông tin thành công");
        });
  }
});
