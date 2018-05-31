!function(){"use strict";angular.module("schedulingApp",["ngRoute","ngMaterial","ngMdIcons","ngMessages"]).config(["$mdIconProvider","$mdThemingProvider","$routeProvider","$locationProvider",function(a,b,c,d){a.iconSet("menu","/icons/svg/menu.svg",24),b.theme("default").primaryPalette("blue").accentPalette("red"),c.when("/",{templateUrl:"views/pages/events.html",controller:"mainController"}).when("/members",{templateUrl:"views/pages/members.html"}),d.html5Mode(!0)}])}(),function(){"use strict";function a(a,b,c,d,e){var f=this;d.getCategories().then(function(a){f.categories=a}),f.event={name:"",description:"",categories:[],locations:[]},f.eventLocation={},f.searchText="",f.selectedLocation={name:""},f.cancel=function(){b.cancel()},f.transformChip=function(a){return a},f.saveEvent=function(){var a=$("#mapsearch").val();f.selectedLocation.name=a,f.event.locations=[],f.event.locations.push(f.selectedLocation),e.addEvent(f.event).then(function(a){b.hide(a)},function(){f.openToast("Error")})},f.openToast=function(a){c.show(c.simple().textContent(a).position("top right").hideDelay(2e3))}}angular.module("schedulingApp").controller("addEventDialogController",a),a.$inject=["$http","$mdDialog","$mdToast","categoriesService","eventsService"]}(),function(){"use strict";function a(a,b,c,d){var e=this;e.member={},e.genders=[{value:"male",text:"Male"},{value:"female",text:"Female"}],e.cancel=function(){b.cancel()},e.submit=function(){d.addMember(e.member).then(function(a){b.hide(a)},function(){e.openToast("Error while adding new member")})},e.openToast=function(a){c.show(c.simple().textContent(a).position("top right").hideDelay(2e3))}}angular.module("schedulingApp").controller("addMemberDialogController",a),a.$inject=["$http","$mdDialog","$mdToast","membersService"]}(),function(){"use strict";function a(a,b){}angular.module("schedulingApp").controller("eventController",a),a.$inject=["$scope","eventsService"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){var l=this;c.getEvents().then(function(b){a.$apply(function(){l.events=b,l.selectedEvent=l.events[l.events.length-1]})}),h.getAllMembers().then(function(a){l.allMembers=a}),l.searchMemberText="",l.pageHeader="Pasākumu apraksts",l.allMembers=[],l.selectedMember="",l.searchText="",l.selectedEvent=null,l.tabId=0,l.addNewEvent=function(){},l.selectEvent=function(a){l.selectedEvent=a;var c=b("left");c.isOpen()&&c.close(),l.tabId=0},l.addEvent=function(a){var b=g("sm")||g("xs");f.show({templateUrl:"../views/partials/addEvent.html",parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!0,fullscreen:b}).then(function(a){l.events.push(a.data),l.selectEvent(a.data),l.openToast("Pasākums pievienots")})},l.formScope={},l.setFormScope=function(a){l.formScope=a},l.addMemberToEvent=function(){l.selectedMember?h.addMemberToEvent(l.selectedMember.id,l.selectedEvent.id).then(function(a){l.selectedEvent.members.push(l.selectedMember),l.formScope.memberForm.$setUntouched(),l.formScope.memberForm.$setPristine(),l.selectedMember=null,l.searchMemberText="",l.openToast("Dalībnieks tika pievienots.")},function(a){l.openToast("Kļūda: ",a.data)}):l.openToast("Dalībnieks netika atrasts.")},l.removeMember=function(a){var b=l.selectedEvent.members.indexOf(a);h.deleteMemberFromEvent(a.id,l.selectedEvent.id).then(function(a){l.selectedEvent.members.splice(b,1),l.openToast("Dalībnieks tika noņemts")},function(a){l.openToast("Failed to delete member")})},l.removeAllMembers=function(a){var b=f.confirm().title("Jūs tiešam gribāt nodzēst visus dalībniekus?").textContent("Visi dalībnieki būs noņemti.").targetEvent(a).ok("Nodzēst").cancel("Nē");f.show(b).then(function(){h.deleteAllMembersFromEvent(l.selectedEvent.id).then(function(a){l.selectedEvent.members=[],l.openToast("Visi dalībnieki tika nodzēsti")},function(a){l.openToast("Failed to delete all members")})})},l.newLocation={},l.formScope2={},l.setFormScope2=function(a){l.formScope2=a},l.addLocationToEvent=function(){var a=$("#locationName").val();l.newLocation.name=a,l.newLocation.name?d.addLocationToEvent(l.selectedEvent.id,l.newLocation).then(function(){d.getEventLocations(l.selectedEvent.id),l.formScope2.formLocation.$setUntouched(),l.formScope2.formLocation.$setPristine(),l.newLocation=null,l.openToast("Lokācija bija pievienota.")},function(a){l.openToast(a.data)}):l.openToast("Lokācija nebija atrasta.")},l.filterMembers=function(a){for(var b=angular.copy(l.allMembers),c=b.length-1;c>=0;c--)for(var d=b[c],e=0,f=l.selectedEvent.members.length;e<f;e++){var g=l.selectedEvent.members[e];d&&d.id===g.id&&b.splice(c,1)}return b=i(b,a)},l.toggleSideNav=function(){b("left").toggle()},l.openToast=function(a){e.show(e.simple().textContent(a).position("top right").hideDelay(3e3))}}angular.module("schedulingApp").controller("mainController",a),a.$inject=["$scope","$mdSidenav","eventsService","locationService","$mdToast","$mdDialog","$mdMedia","membersService","filterFilter"]}(),function(){"use strict";function a(a,b,c,d,e){var f=this;f.pageHeader="Dalībnieki",f.customFullscreen=c("xs")||c("sm"),f.getAllMembers=function(){e.getAllMembers().then(function(b){a.$apply(function(){f.members=b})})},f.getAllMembers(),f.openToast=function(a){d.show(d.simple().textContent(a).position("top right").hideDelay(3e3))},f.addMember=function(a){var d=c("sm")||c("xs");b.show({templateUrl:"../views/partials/addMember.html",parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!1,fullscreen:d}).then(function(a){f.getAllMembers(),f.openToast("New member successfully added")})},f.deleteMember=function(a,c){var d=b.confirm().title("Do you want to delete member?").textContent("Please confirm to delete "+c.name).ariaLabel("Delete member").targetEvent(a).ok("Delete").cancel("Cancel");b.show(d).then(function(){e.deleteMember(c.id).then(function(a){f.getAllMembers(),f.openToast("Member removed")})})}}angular.module("schedulingApp").controller("membersController",a),a.$inject=["$scope","$mdDialog","$mdMedia","$mdToast","membersService"]}(),function(){"use strict";function a(a,b){}angular.module("schedulingApp").controller("sideNavController",a),a.$inject=["$scope","eventsService"]}(),function(){"use strict";function a(){return{scope:{displayWhen:"=displayWhen"},restrict:"E",templateUrl:"views/partials/waitLoader.html"}}function b(){return{restrict:"A",link:function(a,b,c){new google.maps.places.SearchBox(b[0])}}}function c(){return{restrict:"A",transclude:!0,scope:{location:"=googleMaps"},link:function(a,b,c){var d={lat:a.location.latitude,lng:a.location.longitude},e=new google.maps.Map(b[0],{zoom:15,center:d});new google.maps.Marker({position:d,map:e})}}}angular.module("schedulingApp").directive("waitLoader",a).directive("googleAddresses",b).directive("googleMaps",c)}(),function(){"use strict";function a(a){this.getCategories=function(){var b=new Promise(function(b,c){a.get("api/categories").then(function(a){200===a.status?b(a.data.categories):c(a.statusText)})["catch"](function(a){c(a)})});return b}}angular.module("schedulingApp").service("categoriesService",a),a.$inject=["$http"]}(),function(){"use strict";function a(a){this.getEvents=function(){var b=new Promise(function(b,c){a.get("api/events").then(function(a){200===a.status?b(a.data.events):c(a.statusText)})["catch"](function(a){c(a)})});return b},this.addEvent=function(b){var c=new Promise(function(c,d){a.post("api/events",b).then(function(a){200===a.status?c():d(a.statusText)})["catch"](function(a){d(a)})});return c},this.deleteEvent=function(b){var c=new Promise(function(c,d){a["delete"]("api/events/"+b).then(function(a){204===a.status?c():d(a.statusText)})["catch"](function(a){d(a)})});return c}}angular.module("schedulingApp").service("eventsService",a),a.$inject=["$http"]}(),function(){"use strict";function a(a){this.addLocationToEvent=function(b,c){var d=new Promise(function(d,e){a.post("/api/events/"+b+"/locations",c).then(function(a){console.log(a),200===a.status?d(a.data.events):e(a.statusText)})["catch"](function(a){e(a)})});return d},this.getEventLocations=function(b){var c=new Promise(function(c,d){a.get("/api/events/"+b+"/locations").then(function(a){200===a.status?c(a.data.events):d(a.statusText)})["catch"](function(a){d(a)})});return c}}angular.module("schedulingApp").service("locationService",a),a.$inject=["$http"]}(),function(){"use strict";function a(a){this.getAllMembers=function(){var b=new Promise(function(b,c){a.get("api/members").then(function(a){200===a.status?b(a.data.members):c(a.statusText)})["catch"](function(a){c(a)})});return b},this.getAllMembersForEvent=function(b){var c=new Promise(function(c,d){a.get("api/events/"+b).then(function(a){200===a.status?c(a.data.members):d(a.statusText)})["catch"](function(a){d(a)})});return c},this.addMember=function(b){var c=new Promise(function(c,d){a.post("api/members",b).then(function(a){200===a.status?c():d(a.statusText)})["catch"](function(a){d(a)})});return c},this.addMemberToEvent=function(b,c){var d=new Promise(function(d,e){a.put("api/events/"+c+"/members",{memberId:b}).then(function(a){200===a.status?d():e(a.statusText)})["catch"](function(a){e(a)})});return d},this.deleteMember=function(b){var c=new Promise(function(c,d){a["delete"]("api/members/"+b).then(function(a){204===a.status?c():d(a.statusText)})["catch"](function(a){d(a)})});return c},this.deleteMemberFromEvent=function(b,c){var d=new Promise(function(d,e){a["delete"]("api/events/"+c+"/members/"+b).then(function(a){204===a.status?d():e(a.statusText)})["catch"](function(a){e(a)})});return d},this.deleteAllMembersFromEvent=function(b){var c=new Promise(function(c,d){a["delete"]("api/events/"+b+"/members").then(function(a){204===a.status?c():d(a.statusText)})["catch"](function(a){d(a)})});return c}}angular.module("schedulingApp").service("membersService",a),a.$inject=["$http"]}();