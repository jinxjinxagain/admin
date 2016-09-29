// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var template = angular.module('template', ['ng-admin']);

// declare a function to run when the module bootstraps (during the 'config' phase)
template.config(['RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
      if (operation == "getList") {
        // custom filters
        if (params._filters) {
          for (var filter in params._filters) {
            params[filter] = params._filters[filter];
          }
          delete params._filters;
        }
      }
      return { params: params };
    });
  }
]);

template.config(['NgAdminConfigurationProvider',
  function(nga) {
    var admin = nga.application('template').baseApiUrl('/');
    
    nga.configure(admin);
  }
]);
