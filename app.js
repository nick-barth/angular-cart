(function(angular) {
    'use strict';
    var app = angular.module('CartApp', []);

    app.controller('CartCtrl', function($scope) {
      $scope.cartPrice = 0;
      $scope.cartItems = [];
      $scope.items = [{
        id: 'AP1',
        name: 'Apple',
        original_price: 5.00,
        price: 5.00,
        sale: 1,
        sale_price: 4.50,
        total_price: 0,
        sale_text: 'BULK SAVINGS EXTREME LIQUIDATION OUR LOSS IS YOUR GAIN',
        sale_req: 'bulk',
        sale_param: 3,
      }, {
        id: 'FT1',
        name: 'Fruit Tea',
        original_price: 3.11,
        price: 3.11,
        sale: 1,
        sale_price: 0,
        total_price: 0,
        sale_text: 'Buy one get one free, oh my!',
        sale_req: 'buy1get1',
        sale_param: 2,
      }, {
        id: 'CF1',
        name: 'Coffee',
        total_price: 0,
        original_price: 11.23,
        price: 11.23,
        sale: 0,
      }];


      $scope.addItem = function(item) {

        if ($scope.cartItems.length == 0) {
          item['quantity'] = 1;
          $scope.cartItems.push(item);
          $scope.updateTotal();
          return;
        } else {
          for (var i = 0; i < $scope.cartItems.length; i++) {
            if ($scope.cartItems[i].id == item.id) {
              $scope.cartItems[i].quantity++;
              $scope.updateTotal();
              return;
            }
          }
          item['quantity'] = 1;
          $scope.cartItems.push(item);
        }
        $scope.updateTotal();
      };

      $scope.updateTotal = function() {
        for (var i = 0; i < $scope.cartItems.length; i++) {
          //sale item
          if ($scope.cartItems[i].sale == 1) {
            //bulk
            if ($scope.cartItems[i].sale_req == 'bulk') {
              if ($scope.cartItems[i].quantity > $scope.cartItems[i].sale_param) {
                $scope.cartItems[i].price = $scope.cartItems[i].sale_price;
              } else {
                $scope.cartItems[i].price = $scope.cartItems[i].original_price;
              }
              $scope.cartItems[i].total_price = $scope.cartItems[i].price * $scope.cartItems[i].quantity;
            }
            //buy one get one
            else if ($scope.cartItems[i].sale_req == 'buy1get1') {
              if ($scope.cartItems[i].quantity > 1 && ($scope.cartItems[i].quantity % 2 == 0)) {
                $scope.cartItems[i].total_price = $scope.cartItems[i].price * ($scope.cartItems[i].quantity / 2);
              }
              if ($scope.cartItems[i].quantity > 1 && ($scope.cartItems[i].quantity % 2 == 1)) {
                $scope.cartItems[i].total_price = $scope.cartItems[i].price * ((($scope.cartItems[i].quantity-1) / 2) + 1);
              }
              if ($scope.cartItems[i].quantity == 1) {
                $scope.cartItems[i].total_price = $scope.cartItems[i].original_price;
              }
            }
          }
          //no sale item
          else {
            $scope.cartItems[i].total_price = $scope.cartItems[i].original_price * $scope.cartItems[i].quantity;
          }
        }
          //add em up
          $scope.cartPrice = 0;
          for (var i = 0; i < $scope.cartItems.length; i++) {
            $scope.cartPrice += $scope.cartItems[i].total_price;
          }
        };

      });
    })(window.angular);
