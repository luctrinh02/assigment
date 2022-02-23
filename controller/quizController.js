app.controller(
  "quizController",
  function ($scope, $http, $routeParams, $timeout) {
    $scope.dapAns = []; //lưu các câu trả lời
    $scope.dapAn = {
      index: $scope.page, //vị trí của câu hỏi
      // isCorrect:false,//đúng hay sai
      isAnswer: false, //đã trả lời hay chưa
      //answer:""//đáp ấn đã chọn
    }; //lưu câu trả lời vị trí index=page+1
    $scope.isStart = false;
    $scope.m = 30;
    $scope.s = 0;
    $scope.monHocs = [];
    $scope.monhoc = {};
    $scope.page = 0;
    $scope.maxPage = 0;
    $scope.begin = 0;
    $scope.cauHoi = {};
    $scope.cauHois = [];
    $scope.diem = 0;
    let timeout = null;
    let maxPage = 0;
    $scope.Start = function () {
      $scope.m = 30;
      $scope.s = 0;
      $scope.dapAns = [];
      $scope.dapAn = {
        index: $scope.page,
        isAnswer: false,
      };
      $scope.isKetThuc=false;
      $scope.isStart = true;
      $scope.dongHo();
      $http
        .get("../db/Quizs/" + $routeParams.name + ".js")
        .then(function (response) {
          $scope.cauHois = response.data;
          $scope.maxPage = angular.copy($scope.cauHois.length) - 1;
          maxPage = angular.copy($scope.cauHois.length) - 1;
          console.log(response.data.length);
          begin = 0;
        });
      $http
        .get("https://621322cdf43692c9c6faeb5b.mockapi.io/subjects")
        .then(function (response) {
          $scope.monHocs = response.data;
          for (let i = 0; i < $scope.monHocs.length; i++) {
            if ($scope.monHocs[i].Id === $routeParams.name) {
              $scope.monhoc = $scope.monHocs[i];
              break;
            }
          }
        });
    };
    $scope.first = function () {
      $scope.page = 0;
      $scope.begin = 0;
      $scope.getDapAn();
    };
    $scope.prev = function () {
      $scope.page -= 1;
      $scope.begin -= 1;
      $scope.getDapAn();
    };
    $scope.next = function () {
      $scope.page += 1;
      $scope.begin += 1;
      $scope.getDapAn();
    };
    $scope.last = function () {
      $scope.page = maxPage;
      $scope.begin = maxPage;
      $scope.getDapAn();
    };
    $scope.dongHo = function () {
      if ($scope.s === -1) {
        $scope.m -= 1;
        $scope.s = 59;
      }
      if ($scope.m == -1) {
        $timeout.cancel(timeout);
        $scope.ketThuc();
      }
      timeout = $timeout(function () {
        $scope.s = $scope.s - 1;
        $scope.dongHo();
      }, 1000);
    };
    $scope.check = function () {
      $scope.dapAn.isAnswer = true;
      $scope.dapAn.isCorrect =
        Number($scope.dapAn.answer) == $scope.cauHois[$scope.page].AnswerId;
      $scope.dapAn.index = $scope.page;
      $scope.dapAns.push(angular.copy($scope.dapAn));
      if ($scope.dapAn.isCorrect) {
        $scope.diem += 1;
      }
    };
    $scope.getDapAn = function () {
      for (let i = 0; i < $scope.dapAns.length; i++) {
        if ($scope.dapAns[i].index == $scope.page) {
          $scope.dapAn = angular.copy($scope.dapAns[i]);
          break;
        } else {
          $scope.dapAn = {
            index: $scope.page,
            isAnswer: false,
          };
        }
      }
    };
    $scope.isKetThuc = false;
    $scope.ketThuc = function () {
      let d = new Date();
      $scope.mark = {
        name: $scope.monhoc.Name,
        mark: $scope.diem + "/" + (maxPage + 1),
        date:
          d.getDate() +
          "/" +
          d.getMonth() +
          "/" +
          d.getFullYear() +
          "   " +
          d.getHours() +
          ":" +
          d.getMinutes(),
      };
      $scope.$parent.student.marks.push($scope.mark);
      $scope.$parent.isLoading = true;
      $http
        .put(
          "https://621322cdf43692c9c6faeb5b.mockapi.io/Students/" +
            $scope.$parent.student.id,
          $scope.$parent.student
        )
        .then(function (response) {
          $scope.isLoading = false;
          $scope.isKetThuc = true;
          $("#ketThucModel").modal("hide");
          $timeout.cancel(timeout);
          $scope.isStart = false;
        });
    };
  }
);
