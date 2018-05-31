(function () {
    'use strict';
    angular.module('schedulingApp').service("categoriesService", categoriesService);

    categoriesService.$inject = ["$http"];

    function categoriesService($http) {
        this.getCategories = function () {
            var request = new Promise(function(resolve, reject) {
                $http.get("api/categories")
                    .then(function(response) {
                        if (response.status === 200) {
                            resolve(response.data.categories);
                        } else {
                            reject(response.statusText);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    }); 
            });
    
            return request;            
        };
    
    };    
})();