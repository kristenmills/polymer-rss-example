angular.module("rss", [])
  .controller("RSSController", ["$scope", "$http", function($scope, $http){

    $scope.feeds = [];

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
