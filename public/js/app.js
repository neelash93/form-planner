var jq = $.noConflict();
var app = angular.module('myApp', ['formvisual']).
controller('ListCtrl', function($scope, $filter, $http) {


//temp variables needed
    $scope.available=false;
    $scope.selected = 0;
    $scope.startindex = 99;
    $scope.looptill = 99;
    $scope.newred='';
    $scope.newwhite='';
    $scope.newblue='';
    $scope.changes = 0;
    $scope.scenario = 0;
    // $scope.getdata();

//get data from files

$scope.getdata = function() {
    $http.get('/ajax/mainlist.json').
        success(function(data, status, headers, config) {
            $scope.wholelist=data;
            $scope.listed = $scope.wholelist[$scope.scenario];
        }).error(function(data, status, headers, config) {
    });

    $http.get('/ajax/graphdata.json').
        success(function(data, status, headers, config) {
            $scope.wholegraphdata=data;
            $scope.graphdata = $scope.wholegraphdata[$scope.scenario];
        }).error(function(data, status, headers, config) {
    });
};

$scope.getdata();
$scope.$watch('scenario', function() {
  $scope.getdata();
});
//Save Progress && Reset
    $scope.saveall = function () {
      $scope.wholelist[$scope.scenario] = $scope.listed;
      $scope.wholegraphdata[$scope.scenario] = $scope.graphdata;
      $scope.param = {
        "list": $scope.wholelist,
        "graph": $scope.wholegraphdata
      };
      $http.post('/', $scope.param).
        success(function(data, status, headers, config) {
          console.log(data)
        }).error(function(data, status, headers, config) {
          console.log("No Post");
        });
        $scope.comparegraph = $scope.graphdata;
        $scope.comparelist = $scope.listed;
        $scope.changes = 0;
        jq('#savemodal').modal('show');
      // console.log(dates);
      // jq('#thisdiv').load(document.URL +  ' #thisdiv');

    };

    $scope.resetall = function() {
      if($scope.newred == '' || $scope.newred == null) {
        $scope.newred = 30;
      }
      if($scope.newblue == '' || $scope.newblue == null) {
        $scope.newblue = 30;
      }
      if($scope.newwhite == '' || $scope.newwhite == null) {
        $scope.newwhite = 30;
      }
      $scope.arr = [$scope.newred,$scope.newblue,$scope.newwhite];
      angular.forEach($scope.listed, function(item) {
        $scope.listed = [];
      });
      for(var i=0;i<$scope.graphdata.length;i++)
      {
        console.log($scope.arr[i])
        angular.forEach($scope.graphdata[i], function(item) {
          item.y = $scope.arr[i];
        });
      }
      $scope.newred='';
      $scope.newwhite='';
      $scope.newblue='';
      jq('#reset').modal('hide');
      $scope.selected = 0;
      $scope.changes = 0;

    };


//Add Functions

    $scope.addToList = function(newact) {
      $scope.item = {
        "name": newact,
        "constraints": []
      };
      $scope.listed.push($scope.item);
      // $scope.disabledlist.push($scope.item);
      $scope.newact='';
      $scope.mkcurrent($scope.listed.indexOf($scope.item));
      console.log($scope.listed[$scope.currindex]);
      // console.log($scope.disabledlist[$scope.currindex]);

      jq('#addact').modal('hide');
      $scope.changes = 1;

    };

    $scope.addcnst = function() {
      $scope.tempfrom = $filter('date')($scope.newfrom, "yyyy-MM");
      $scope.tempto = $filter('date')($scope.newto, "yyyy-MM");
      console.log("add executing available:"+$scope.available);
      if($scope.edit == true) {
        $scope.editcnst($scope.currcnstindex);
      }
      else {
        $scope.tempconst = {
          "fromid": $scope.newfrom,
          "toid": $scope.newto,
          "type": $scope.newtype,
          "from": $scope.tempfrom,
          "to": $scope.tempto,
          "status": true,
          "quantity": $scope.newquant,
          "months" : $scope.getmonthdiff(),
          "typeid": $scope.gettypeid($scope.newtype),
          "available": $scope.available,
          "restock": false
        };
        console.log($scope.gettypeid($scope.newtype));
        // $scope.listed[$scope.currindex].constraints.push($scope.tempconst);
        console.log("new constraint to listed");
        jq('#addcnst').modal('hide');
        $scope.newtype='';
        $scope.newto='';
        $scope.newfrom='';
        $scope.newquant='';
        $scope.available= false;
        $scope.listed[$scope.currindex].constraints.push($scope.tempconst);
        $scope.addtograph($scope.tempconst, $scope.tempconst.quantity);
        $scope.startindex = 99;
        $scope.looptill = 99;
        $scope.changes = 1;

    }
    };

    $scope.addstock = function() {
      $scope.tempfrom = $filter('date')($scope.stockfrom, "yyyy-MM");
      // console.log("available:"+$scope.available);
      $scope.tempconst = {
        "fromid": $scope.stockfrom,
        "toid": "-",
        "type": $scope.stocktype,
        "from": $scope.tempfrom,
        "to": "-",
        "status": true,
        "quantity": $scope.stockquant,
        "months" : "-",
        "typeid": $scope.gettypeid($scope.stocktype),
        "available": false,
        "restock": true
      };
      // console.log($scope.gettypeid($scope.type));
      // $scope.listed[$scope.currindex].constraints.push($scope.tempconst);
      // console.log("new constraint to listed");
      jq('#addstock').modal('hide');
      $scope.stocktype='';
      $scope.stockfrom='';
      $scope.stockquant='';
      $scope.listed[$scope.currindex].constraints.push($scope.tempconst);
      $scope.addtograph($scope.tempconst, $scope.tempconst.quantity);
      $scope.startindex = 99;
      $scope.changes = 1;
      $scope.looptill = 99;
    };



//Delete Functions

    $scope.delact = function(index) {
      console.log($scope.listed[index]);
      $scope.selected = 0;
      angular.forEach($scope.listed[index].constraints, function(item) {
        if(item.status == true) {
          $scope.tempquant = (-1)*(item.quantity);
          $scope.addtograph(item, $scope.tempquant);
          $scope.startindex = 99;
          $scope.looptill = 99;
        }
      });
      $scope.listed.splice(index, 1);
      $scope.currindex = '';  // Have to add more to function. Delete all constraints and free resources
      $scope.changes = 1;

    };

    $scope.delcnst = function(index) {
      // console.log($scope.listed[$scope.currindex].constraints[index]);
      // $scope.tempquant = $scope.listed[$scope.currindex].constraints[index].quantity;
      $scope.tempquant = (-1)*($scope.listed[$scope.currindex].constraints[index].quantity);
      // console.log("tempquant : "+$scope.tempquant);
      if($scope.listed[$scope.currindex].constraints[index].status == true) {
        $scope.addtograph($scope.listed[$scope.currindex].constraints[index], $scope.tempquant);
        $scope.startindex = 99;
        $scope.looptill = 99;
      }
      $scope.listed[$scope.currindex].constraints.splice(index, 1);
      $scope.changes = 1;

    };

//Edit Functions

    $scope.invokeeditcnst = function(index) {
      $scope.currcnstindex = index;
      $scope.edit = true;
      $scope.newtype = $scope.listed[$scope.currindex].constraints[index].type;
      $scope.newfrom = $scope.listed[$scope.currindex].constraints[index].fromid;
      $scope.newto = $scope.listed[$scope.currindex].constraints[index].toid;
      $scope.newquant = $scope.listed[$scope.currindex].constraints[index].quantity;
      $scope.available = $scope.listed[$scope.currindex].constraints[index].available;
      jq('#addcnst').modal('show');
      // $scope.editcnst();
    };

    $scope.editcnst = function(index) {
      if ($scope.listed[$scope.currindex].constraints[index].status == true) {
        $scope.addtograph($scope.listed[$scope.currindex].constraints[index], -$scope.listed[$scope.currindex].constraints[index].quantity);
        $scope.startindex = 99;
        $scope.looptill = 99;
      }
      console.log("edit executing");
      $scope.tempfrom = $filter('date')($scope.newfrom, "yyyy-MM");
      $scope.tempto = $filter('date')($scope.newto, "yyyy-MM");
      $scope.listed[$scope.currindex].constraints[index].fromid = $scope.newfrom;
      $scope.listed[$scope.currindex].constraints[index].toid = $scope.newto;
      $scope.listed[$scope.currindex].constraints[index].type = $scope.newtype;
      $scope.listed[$scope.currindex].constraints[index].from = $scope.tempfrom;
      $scope.listed[$scope.currindex].constraints[index].to = $scope.tempto;
      $scope.listed[$scope.currindex].constraints[index].quantity = $scope.newquant;
      $scope.listed[$scope.currindex].constraints[index].typeid = $scope.gettypeid($scope.newtype);
      $scope.listed[$scope.currindex].constraints[index].months = $scope.getmonthdiff();
      $scope.listed[$scope.currindex].constraints[index].available = $scope.available;
      console.log($scope.listed[$scope.currindex].constraints[index]);
      if ($scope.listed[$scope.currindex].constraints[index].status == true) {
        $scope.addtograph($scope.listed[$scope.currindex].constraints[index], $scope.listed[$scope.currindex].constraints[index].quantity);
        $scope.startindex = 99;
        $scope.looptill = 99;
      }
      jq('#addcnst').modal('hide');
      $scope.newtype='';
      $scope.newto='';
      $scope.newfrom='';
      $scope.newquant='';
      $scope.edit = false;
      $scope.changes = 1;
      $scope.available = false;
    }; // Have to add more code related to graph manipulation



//Enable Disable Functions

    $scope.toggle = function(index) {
      console.log("initila status:" +$scope.listed[$scope.currindex].constraints[index].status);
      if($scope.listed[$scope.currindex].constraints[index].status == true) {
          $scope.listed[$scope.currindex].constraints[index].status = false;
          $scope.tempquant = (-1)*($scope.listed[$scope.currindex].constraints[index].quantity);
          $scope.addtograph($scope.listed[$scope.currindex].constraints[index], $scope.tempquant);
          console.log("removed from graph or disabled");
      }
      else {
        $scope.listed[$scope.currindex].constraints[index].status = true;
        $scope.addtograph($scope.listed[$scope.currindex].constraints[index], $scope.listed[$scope.currindex].constraints[index].quantity);
        console.log("added to graph or enabled");
      }
      $scope.changes = 1;
    };




//Extra Functions

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

    $scope.gettypeid = function(type) {
      if (type == "red") {
        $scope.tempid = 0;
        console.log($scope.tempid)
      }
      else if(type == "blue") {
        $scope.tempid = 1;
        console.log($scope.tempid)
      }
      else {
        $scope.tempid = 2;
        console.log($scope.tempid)
      };
      return $scope.tempid;
    };

    $scope.mkcurrent = function(index) {
      // $scope.curr = $scope.listed[index];
      $scope.currindex = index;
      $scope.selected=$scope.listed[$scope.currindex].name;
    };

    jq("#addcnst").on("hidden.bs.modal", function () {
      // console.log("hey");
      $scope.edit = false;
      $scope.newtype='';
      $scope.newto='';
      $scope.newfrom='';
      $scope.newquant='';
      $scope.available = false;
      // console.log($scope.edit);
    });

    window.onbeforeunload = function () {
    if($scope.changes == 1) {
      return 'Exit without saving?';
    }
  };

  $scope.scenariolist = [
        {
            "id": 0,
            "label": "Scenario 1"
        },
        {
            "id": 1,
            "label": "Scenario 2"
        },
        {
            "id": 2,
            "label": "Scenario 3"
        },
        {
            "id": 3,
            "label": "Scenario 4"
        }
  ];

  $scope.scenariowhole = $scope.scenariolist[0];
  $scope.scenario = $scope.scenariowhole.id

$scope.getscenariotemp = function() {
  // $scope.scenario = $scope.scenariomain.id;
  // $scope.changes = 0;
  if($scope.scenariowhole.id == $scope.scenario) {
    console.log("same page switch");
  }
  else {
    if($scope.changes == 1) {
      jq('#leavescenario').modal({backdrop:'static', keyboard:false, show:true});
    }
    else {
      $scope.nosaveswitch();
    }
  }
//  = $scope.scenario;
// console.log(document.getElementsByName("scenarios").value);

  // $scope.scenario = document.getElementsByName("scenarios").value;
};


$scope.saveswitch = function () {
  $scope.saveall();
  $scope.nosaveswitch();
};

$scope.nosaveswitch = function() {
  $scope.scenario = $scope.scenariowhole.id;
  $scope.changes = 0;
  jq('#leavescenario').modal({backdrop:'static', keyboard:false, show:false});
  jq('#leavescenario').modal('hide');
};

$scope.cancelswitch = function() {
  $scope.scenariowhole = $scope.scenariolist[$scope.scenario];
  jq('#leavescenario').modal({backdrop:'static', keyboard:false, show:false});
  jq('#leavescenario').modal('hide');


};


$scope.tempmethod = function() {
  if($scope.changes == 1) {
    // jq('#leavescenario').modal({
    //     backdrop: 'static',
    //     keyboard: false
    // });
    jq('#leavescenario').modal('hide');

  }
  else {
    $scope.nosaveswitch();
  }
};

$scope.tempnosaveswitch = function() {
  $scope.scenario = document.getElementsByName("scenarios").value;
  console.log($scope.scenario);
};

//Updating Graph Function

    $scope.addtograph = function(record, quantity) {
        angular.forEach($scope.graphdata[record.typeid], function(item) {
          if (item.id == record.from) {
            // console.log(item.id + item.label);
            $scope.startindex = $scope.graphdata[record.typeid].indexOf(item);
            console.log("startindex: "+$scope.startindex);
            if (record.available == true) {
              $scope.looptill = $scope.startindex+record.months;
              console.log("looptill:" +$scope.looptill);
            }
            else {
              $scope.looptill = $scope.graphdata[0].length;
              console.log("looptill:" +$scope.looptill);

            }
          }
          if (($scope.graphdata[record.typeid].indexOf(item) >= $scope.startindex) && ($scope.graphdata[record.typeid].indexOf(item) < $scope.looptill)) {
            if (record.restock == false) {
              item.y = (item.y)-(quantity);
            }
            else {
              item.y = (item.y)+(quantity);
            }
            // item.y = item.y - quantity;
            console.log(item.y);
          }

          if ($scope.graphdata[record.typeid].indexOf(item) >= $scope.looptill) {
            console.log("reached end: "+$scope.graphdata[record.typeid].indexOf(item));
            return true;
          }
        });
        $scope.startindex = 99;
        $scope.looptill = 99;
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
