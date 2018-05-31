(function () {
    'use strict';
    
    angular.module('schedulingApp').controller('addEventDialogController', addEventDialogController);

    addEventDialogController.$inject = ['$http', '$mdDialog', '$mdToast', 'categoriesService', 'eventsService'];

    function addEventDialogController($http, $mdDialog, $mdToast, categoriesService, eventsService) {
        var vm = this;

        categoriesService.getCategories()
            .then(function (categories) {
                vm.categories = categories;
            });

        vm.event = {
            name: "",
            description: "",
            categories: [],
            locations: []
        };

        vm.eventLocation = {};   
        vm.searchText = "";

        vm.selectedLocation = {
            name: ""
        };
        
    
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.transformChip = function (chip) {
            return chip;
        };

        vm.saveEvent = function () {
            var location = $("#mapsearch").val();
            vm.selectedLocation.name = location;
            vm.event.locations = [];
            vm.event.locations.push(vm.selectedLocation);

            eventsService.addEvent(vm.event)
                .then(function (response) {
                    $mdDialog.hide(response);
                }, function () {
                    vm.openToast("Error");
                });
        };

        vm.openToast = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(2000)
                );
        };
    };
})();