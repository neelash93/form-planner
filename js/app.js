var jq = $.noConflict();
var app = angular.module('myApp', []).
controller('ListCtrl', function($scope, $filter, $http) {
    // $scope.data = $window.data;
    // console.log(data);
    $scope.listed = [
      {
        "name": "Activity 1",
        "constraints": [
          {
            "from": "2018-03",
            "to": "2019-06",
            "type":"blue",
            "typeid": 2,
            "months": 16,
            "status": "enabled",
            "quantity": 4
          },
          {
            "from": "2018-03",
            "to": "2019-06",
            "type":"red",
            "typeid": 1,
            "months": 16,
            "status": "enabled",
            "quantity": 6
          }
        ]
      },
      {
          "name": "Activity 2",
          "constraints": [
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"white",
              "typeid": 3,
              "months": 16,
              "status": "enabled",
              "quantity": 3
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"red",
              "typeid": 1,
              "months": 16,
              "status": "enabled",
              "quantity": 9

            }
          ]

      },
      {
          "name": "Activity 38",
          "constraints": []

      },
      {
          "name": "Activity 48",
          "constraints": []
      },
      {
          "name": "Activity 36",
          "constraints": []

      },
      {
          "name": "Activity 45",
          "constraints": []
      },
      {
          "name": "Activity 35",
          "constraints": []

      },
      {
          "name": "Activity 46",
          "constraints": []
      },
      {
          "name": "Activity 32",
          "constraints": []

      },
      {
          "name": "Activity 41",
          "constraints": []
      },
      {
          "name": "Activity 31",
          "constraints": []

      },
      {
          "name": "Activity 42",
          "constraints": []
      },
      {
          "name": "Activity 34",
          "constraints": []

      },
      {
          "name": "Activity 43",
          "constraints": []
      },
      {
          "name": "Activity 33",
          "constraints": []

      },
      {
          "name": "Activity 44",
          "constraints": []
      }
    ];

    $scope.disabledlist = [
      {
          "name": "Activity 1",
          "constraints": [
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"blue",
              "typeid": 2,
              "months": 16,
              "status": "enabled",
              "quantity": 4
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"red",
              "typeid": 1,
              "months": 16,
              "status": "enabled",
              "quantity": 6
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"blue",
              "typeid": 2,
              "months": 16,
              "status": "enabled",
              "quantity": 4
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"red",
              "typeid": 1,
              "months": 16,
              "status": "enabled",
              "quantity": 6
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"blue",
              "typeid": 2,
              "months": 16,
              "status": "enabled",
              "quantity": 4
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"red",
              "typeid": 1,
              "months": 16,
              "status": "enabled",
              "quantity": 6
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"blue",
              "typeid": 2,
              "months": 16,
              "status": "enabled",
              "quantity": 4
            },
            {
              "from": "2018-03",
              "to": "2019-06",
              "type":"red",
              "typeid": 1,
              "months": 16,
              "status": "enabled",
              "quantity": 6
            }
          ]

      },
      {
          "name": "Activity 2",
          "constraints": []
      },
      {
          "name": "Activity 3",
          "constraints": []

      },
      {
          "name": "Activity 4",
          "constraints": []
      }
    ];


    $http.get('/ajax/maindata.json').
        success(function(data, status, headers, config) {
            $scope.listedtemp=data;
            // console.log($scope.listedtemp);
        }).error(function(data, status, headers, config) {
    });

    $scope.saveall = function () {
      dates[0] = "Hey"
      console.log(dates);
      // jq('#thisdiv').load(document.URL +  ' #thisdiv');

    };


    // $scope.tempconst={};
    $scope.selected = 0;
    // $scope.toggle = [];

    $scope.delact = function(index) {
      console.log($scope.listed[index]);
      $scope.selected = 0;
      $scope.listed.splice(index, 1);
      $scope.disabledlist.splice(index,1);
      $scope.currindex = '';  // Have to add more to function. Delete all constraints and free resources

    };

    $scope.mkcurrent = function(index) {
      $scope.curr = $scope.listed[index];
      $scope.currindex = index;
      $scope.selected=$scope.curr.name;
    };

    $scope.addToList = function(newact) {
      $scope.item = {"name": newact, "constraints":[]};
      $scope.listed.push($scope.item);
      $scope.disabledlist.push($scope.item);
      $scope.newact='';
      $scope.mkcurrent($scope.listed.indexOf($scope.item));
      jq('#addact').modal('hide');

    };

    $scope.gettypeid = function() {
      if ($scope.newtype == "red") {
        $scope.tempid = 1;
        console.log($scope.tempid)
      }
      else if($scope.newtype == "blue") {
        $scope.tempid = 2;
        console.log($scope.tempid)
      }
      else {
        $scope.tempid = 3;
        console.log($scope.tempid)
      };
      return $scope.tempid;
    };



    $scope.getmonthdiff = function() {
      $scope.tempfromyear=$filter('date')($scope.newfrom, "yyyy");
      $scope.temptoyear=$filter('date')($scope.newto, "yyyy");
      $scope.tempfrommonth=$filter('date')($scope.newfrom, "MM");
      $scope.temptomonth=$filter('date')($scope.newto, "MM");
      console.log($scope.tempfromyear+' '+$scope.temptoyear+' '+$scope.tempfrommonth+' '+$scope.temptomonth);
      $scope.diff = ($scope.temptoyear-$scope.tempfromyear)*12 + ($scope.temptomonth-$scope.tempfrommonth) + 1;
      console.log($scope.diff);
      return $scope.diff;
    };



    $scope.addcnst = function() {
      $scope.tempfrom = $filter('date')($scope.newfrom, "yyyy-MM");
      $scope.tempto = $filter('date')($scope.newto, "yyyy-MM");
      if($scope.edit == true) {
        $scope.editcnst($scope.currcnstindex);
      }
      else {
        $scope.tempconst = {
          "type": $scope.newtype,
          "from": $scope.tempfrom,
          "to": $scope.tempto,
          "status": "enabled",
          "quantity": $scope.newquant,
          "months" : $scope.getmonthdiff(),
          "typeid": $scope.gettypeid()
        };
        $scope.listed[$scope.currindex].constraints.push($scope.tempconst);
        console.log($scope.listed[$scope.currindex].constraints);
        // console.log($scope.listed[$scope.currindex].constraints[0]);
        jq('#addcnst').modal('hide');
        $scope.newtype='';
        $scope.newto='';
        $scope.newfrom='';
        $scope.newquant='';
    }
    };  //Have to add more functionality related to graph.





    $scope.invokeeditcnst = function(index) {
      $scope.currcnstindex = index;
      $scope.edit = true;
      jq('#addcnst').modal('show');

      // $scope.editcnst();
    };

    $scope.editcnst = function(index) {
      $scope.tempfrom = $filter('date')($scope.newfrom, "yyyy-MM");
      $scope.tempto = $filter('date')($scope.newto, "yyyy-MM");
      $scope.listed[$scope.currindex].constraints[index].type = $scope.newtype;
      $scope.listed[$scope.currindex].constraints[index].from = $scope.tempfrom;
      $scope.listed[$scope.currindex].constraints[index].to = $scope.tempto;
      $scope.listed[$scope.currindex].constraints[index].quantity = $scope.newquant;
      $scope.listed[$scope.currindex].constraints[index].typeid = $scope.gettypeid();
      $scope.listed[$scope.currindex].constraints[index].months = $scope.getmonthdiff();
      console.log($scope.listed[$scope.currindex].constraints[index]);
      jq('#addcnst').modal('hide');
      $scope.newtype='';
      $scope.newto='';
      $scope.newfrom='';
      $scope.newquant='';
      $scope.edit = false;
    }; // Have to add more code related to graph manipulation

    $scope.setdisable = function(index) {
        $scope.listed[$scope.currindex].constraints[index].status = 'disabled';
        $scope.disabledlist[$scope.currindex].constraints.push($scope.listed[$scope.currindex].constraints[index]);
        console.log($scope.disabledlist[$scope.currindex].constraints);
        console.log($scope.listed[$scope.currindex].constraints);
        $scope.delcnst(index);
    };


    $scope.setenable = function(index) {
      $scope.disabledlist[$scope.currindex].constraints[index].status = 'enabled';
      $scope.listed[$scope.currindex].constraints.push($scope.disabledlist[$scope.currindex].constraints[index]);
      $scope.disableddelcnst(index);
    };

    $scope.delcnst = function(index) {
      console.log($scope.listed[$scope.currindex].constraints[index]);
      $scope.listed[$scope.currindex].constraints.splice(index, 1)
    };

    $scope.disableddelcnst = function(index) {
      console.log($scope.disabledlist[$scope.currindex].constraints[index]);
      $scope.disabledlist[$scope.currindex].constraints.splice(index, 1)
    };

}). //Directive for confirmation Dialogue
directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
