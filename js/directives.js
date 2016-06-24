
function headerDirective(){
	return{
		restrict: "A",
		templateUrl: "./views/header.html"
	};
};

function footerDirective(){
	return{
		restrict: "A",
		templateUrl: "./views/footer.html"
	};
};

(function(){
	var app = angular.module("myApp.directives",[]);
	app.directive("headerDirective", headerDirective)
	app.directive("footerDirective", footerDirective)
})();