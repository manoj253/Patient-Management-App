'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider','$httpProvider',
      function ($stateProvider,   $urlRouterProvider, $httpProvider) {
        //$httpProvider.interceptors.push('authInterceptor');

        var layout = "tpl/app.html";

            $urlRouterProvider
              .otherwise('/home');

          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('home', {
                  url: '/home',
                  templateUrl: 'tpl/home.html'
              })
              .state('home.main', {
                  url: '/about',
                  templateUrl: 'tpl/main.html'
              })
              .state('home.add', {
                  url: '/add',
                  templateUrl: 'tpl/add.html'
              })
              .state('home.view', {
                  url: '/view',
                  templateUrl: 'tpl/view.html'
              })
              .state('home.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/contact.html'
              })


      }
    ]
  );
