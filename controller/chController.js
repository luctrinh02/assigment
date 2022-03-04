app.controller("chController", function ($scope, $http) {
  let id = 0;

  $scope.id = "ADAV";
  $scope.soLuong = 2;
  $scope.cauHois = [];
  $scope.dapAn = 1;
  $scope.page = 0;
  $scope.maxPage = 0;
  $scope.begin = 0;
  $scope.isSua = false;
  $scope.quiz = {
    Id: 0,
    Text: "",
    Marks: "1",
    AnswerId: 1,
    Answers: [
      { Id: 0, Text: "" },
      { Id: 1, Text: "" },
    ],
  };
  const api = "https://621322cdf43692c9c6faeb5b.mockapi.io/";
  $http.get(api + $scope.id).then(function (response) {
    $scope.cauHois = response.data;
    $scope.maxPage = Math.ceil(response.data.length / 10);
    console.log(response.data);
  });
  $scope.changeSoLuong = function () {
    $scope.quiz.Answers = [];
    for (let i = 0; i < $scope.soLuong; i++) {
      $scope.quiz.Answers.push({ Id: i, Text: "" });
    }
  };
  $scope.changeId = function () {
    $scope.$parent.isLoading = true;
    $http.get(api + $scope.id).then(function (response) {
      $scope.cauHois = response.data;
      $scope.maxPage = Math.ceil(response.data.length / 10);
      console.log(response.data);
      $scope.$parent.isLoading = false;
    });
    $scope.quiz = {
      Id: 0,
      Text: "",
      Marks: "1",
      AnswerId: 1,
      Answers: [
        { Id: 0, Text: "" },
        { Id: 1, Text: "" },
      ],
    };
    $scope.soLuong = 2;
  };
  $scope.first = function () {
    $scope.page = 0;
    $scope.begin = 0;
  };
  $scope.prev = function () {
    $scope.page -= 1;
    $scope.begin = $scope.page * 10;
  };
  $scope.next = function () {
    $scope.page += 1;
    $scope.begin = $scope.page * 10;
  };
  $scope.last = function () {
    $scope.page = $scope.maxPage - 1;
    $scope.begin = $scope.page * 10;
  };
  $scope.them=function(){
    $scope.quiz.Id=$scope.cauHois[$scope.cauHois.length-1].Id+1;
    $scope.quiz.AnswerId=$scope.dapAn-1;
    $scope.$parent.isLoading=true;
    $http.post(api+$scope.id,$scope.quiz).then(function(response){
      $scope.cauHois.push(response.data);
      alert("Thêm thành công");
      $scope.$parent.isLoading=false;
      $scope.moi();
    })
  };
  $scope.sua = function () {
    $scope.quiz.AnswerId=$scope.dapAn-1;
    $scope.$parent.isLoading=true;
    $http.put(api+$scope.id+"/"+$scope.quiz.Id,$scope.quiz).then(function(response){
      $scope.cauHois[id]=response.data;
      alert("Sửa thành công");
      $scope.$parent.isLoading=false;
      $scope.moi();
    })
  };
  $scope.xoa = function () {
    $scope.$parent.isLoading=true;
    $http.delete(api+$scope.id+"/"+$scope.cauHois[id].Id).then(function(response){
      $scope.cauHois.splice(id,1);
      alert("Xoá thành công");
      $scope.$parent.isLoading=false;
    })
  };
  $scope.moi = function () {
    $scope.quiz = {
      Id: 0,
      Text: "",
      Marks: "1",
      AnswerId: 1,
      Answers: [
        { Id: 0, Text: "" },
        { Id: 1, Text: "" },
      ],
    };
    $scope.soLuong = 2;
    $scope.isSua = false;
    $scope.dapAn = 1;
    id=0;
  };
  $scope.suaDoi = function (index) {
    index=10*$scope.page+index;
    $scope.dapAn = 1;
    $scope.quiz = angular.copy($scope.cauHois[index]);
    $scope.soLuong = $scope.cauHois[index].Answers.length;
    $scope.dapAn = $scope.findFlag(index);
    id=index;
    $scope.isSua=true;
  };
  $scope.getId = function (index) {
      id=index=10*$scope.page+index;;
  };
  $scope.findFlag = function (index) {
    for (let i = 0; i < $scope.quiz.Answers.length; i++) {
      if (
        $scope.cauHois[index].AnswerId == $scope.cauHois[index].Answers[i].Id
      ) {
        return i + 1;
      }
    }
  };
});
