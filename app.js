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
      sale_calculation: function() {
        if (this.quantity > 3) {
          this.price = this.sale_price;
        } else {
          this.price = this.original_price;
        }
        this.total_price = this.price * this.quantity;
      },
    }, {
      id: 'FT1',
      name: 'Fruit Tea',
      original_price: 3.11,
      price: 3.11,
      sale: 1,
      sale_price: 0,
      total_price: 0,
      sale_text: 'Buy one get one free, oh my!',
      sale_calculation: function() {
        if (this.quantity > 1 && (this.quantity % 2 == 0)) {
          this.total_price = this.price * (this.quantity / 2);
        }
        if (this.quantity > 1 && (this.quantity % 2 == 1)) {
          this.total_price = this.price * (((this.quantity - 1) / 2) + 1);
        }
        if (this.quantity == 1) {
          this.total_price = this.original_price;
        }
      },
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

    $scope.removeItem = function(item) {
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if ($scope.cartItems[i].id == item.id) {
          if ($scope.cartItems[i].quantity < 2) {
            $scope.cartItems.pop(i);
          } else {
            $scope.cartItems[i].quantity--;
          }
        }
      }
      $scope.updateTotal();
    };

    $scope.resetCart = function(){
      $scope.cartItems = [];
      for (var i = 0; i < $scope.items.length; i++){
        if($scope.items[i].sale == 1){
          $scope.items[i].price = $scope.items[i].original_price;
        }
      }
      $scope.updateTotal();
    }

    $scope.updateTotal = function() {
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if($scope.cartItems[i].quantity < 1){
          $scope.cartItems.pop(i);
        }
        else if ($scope.cartItems[i].sale == 1) {
          $scope.cartItems[i].sale_calculation();
        } else {
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
