angular.module("rss", ['ngMaterial'])
  .controller("RSSController", ["$scope", "$http", "$materialSidenav", "$timeout", function($scope, $http, $materialSidenav, $timeout){

    $scope.feeds = [];
    $scope.selectedTabIndex = 0

    var addSidebar;
    $timeout(function() {
      addSidebar = $materialSidenav('add');
    });

    var viewSidebar;
    $timeout(function() {
      viewSidebar = $materialSidenav('view');
    });

    $scope.tabs = [
      { name: 'Add Feed', sideBar: addSidebar },
      { name: 'View Feed List', sideBar: viewSidebar }
    ]

    // $scope.$watch('selectedTabIndex', function(index, oldIndex) {
    //   console.log('selecting from', oldIndex, 'to', index);
    //   $scope.reverse = index < oldIndex;
    //   $scope.tabs[oldIndex].sidebar.close();
    //   $scope.tabs[index].sidebar.toggle();
    // });

    $scope.toggleViewSidebar = function(){
      viewSidebar.toggle();
    }

    $scope.addFeed = function(url) {
      url = url.trim();
      $scope.error_message = "";
      if(_.where($scope.feeds, { url: url }).length != 0){
        $scope.error_message = "Already added feed";
      }else{
        var feed_object = { url: url };
        $scope.feeds.push(feed_object);
        $http.get("https://ajax.googleapis.com/ajax/services/feed/load", {params: {v: "1.0", q: url }})
          .success(function(data){
            console.log(data);
            if(data.responseStatus === 200 ){
              feed_object.feed = data
            }else {
              $scope.error_message = "Couldn't add feed";
            }

          });
      }
    }
  }]);
