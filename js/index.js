var app = angular.module("myApp", ["myApp.directives", "ngRoute"]);

function setConfig($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        controller: "indexController",
        templateUrl: "./views/index.html",
    })
    .when('/images', {
        controller: 'imageController',
        templateUrl: './views/iGallery.html'
    })
    .when('/videos', {
        controller: 'videoController',
        templateUrl: './views/vGallery.html'
    })
    .when('/register', {
        controller: 'registerController',
        templateUrl: './views/register.html'
    })
    .when('/login', {
        controller: 'loginController',
        templateUrl: './views/login.html'
    })
    .when('/coments', {
        controller: 'comentController',
        templateUrl: './views/coment.html'
    })
    .when('/user', {
        controller: 'userController',
        templateUrl: './views/user.html'
    })
    .when('/settings', {
        controller: 'settingsController',
        templateUrl: './views/settings.html'
    })
    .when('/uImages', {
        controller: 'uImagesController',
        templateUrl: './views/userImages.html'
    })
    .when('/mapsUser', {
        controller: 'mapsUserController',
        templateUrl: './views/mapsUser.html'
    })
    .when('/maps', {
        controller: 'mapsController',
        templateUrl: './views/maps.html'
    })
    .when('/temp', {
        controller: 'tempController',
        templateUrl: './views/temp.html'
    })
    .when('/store', {
        controller: 'storeController',
        templateUrl: './views/store.html'
    })

};

app.config(["$locationProvider", "$routeProvider", setConfig]);

function indexController() {
    styleIndex();
};

function imageController() {
    styleUser();

};


function comentController() {};

function mapsController() {
    showListMaps();
    styleUser();

};

function uImagesController() {
    chargeImg();
    styleUser();
};

function loginController() {
    $(".incorrectUser").hide();

};

function userController() {
    styleUser();
    var actualUser = JSON.parse(window.sessionStorage.getItem('user'));
    $(".welcomeUser").empty();
    $(".welcomeUser").append('<h1 class="hello">Hola '+actualUser.user+'</h1>' +
        '<h2 class="question">¿Preparad@ para ir a correr?</h2>');
    startTime();
};

function registerController() {
    $(".incorrectUser").hide();
};

function settingsController() {
    settingsUser();
    styleUser();
    $(".changesUser").hide();
    $(".invalidData").hide();

};

function videoController() {
    search();
    styleIndex();
};

function tempController() {

};

function mapsUserController(){
    styleUser();
    styleUmaps();
    mapsLoad();
        $(".routeSaved").hide();

};

function storeController() {
    storeProducts()
}

app.controller("indexController", indexController)
app.controller("imageController", imageController)
app.controller("videoController", videoController)
app.controller("loginController", loginController)
app.controller("comentController", comentController)
app.controller("userController", userController)
app.controller("settingsController", settingsController)
app.controller("uImagesController", uImagesController)
app.controller("mapsUserController", mapsUserController)
app.controller("mapsController", mapsController)
app.controller("tempController", tempController)
app.controller("registerController", registerController)

app.controller("storeController", storeController)


/*var Product = function(container, img, coin, msg, description) {
    this.container = container;
    this.img = img;
    this.coin = coin;
    this.msg = msg;
    this.description = description;
}

app.controller("storeController", function($scope) {
    $scope.products = [
    product1 = new Product("cajaSoporte", "soporte", "moneda30", "msgSoporte", "Soporte para móviles"),
    product2 = new Product("cajaCascos", "cascos", "moneda", "msgCascos", "Cascos Running"),
    product3 = new Product("cajaCamiseta", "camiseta", "moneda20", "msgCamiseta", "Camiseta Térmica"),
    product4 = new Product("cajaPulso", "pulsometro", "moneda20", "msgPulso", "Pulsómetro"),
    product5 = new Product("cajaReloj", "reloj", "moneda30", "msgReloj", "Reloj Running"),
    product6 = new Product("cajaGuantes", "guantes", "moneda", "msgGuantes", "Guantes"),
    product7 = new Product("cajaCalcetines", "calcetines", "moneda", "msgCalcetines", "Calcetines Térmicos"),
    product8 = new Product("cajaRino", "riñonera", "moneda20", "msgRino", "Riñonera Running"),
    product9 = new Product("cajaZapas", "zapas", "moneda30", "msgZapas", "Zapatillas Running")
    ]
    storeProducts();
});*/


var url = './files/races.jsonp';

app.controller('TodoCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get(url)
    .then(function(res) {
        $scope.races = res.data;
    });
}]);

function search() {
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet',
        channelId: 'UCOTNmYFXoW3t2vxPciV9JTQ',
        type: 'video',
        maxResults: 8,
        key: 'AIzaSyA3bHU_wyQrcrZP3hFw4hGF1DxIc4UbPfo',
    },
    function(data) {
        $("#results").empty();
        $.each(data.items, function(i, item) {
            var output = getOutPut(item);
            $('#results').append(output);
        });
    }
    );
}

function getOutPut(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    // var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    // var channelTitle = item.snippet.channelTitle;
    // var videoDate = item.snippet.publishedAt;
    var output =
    '<a  class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + videoId + '">' +
    '<div class="col-md-3">' +
    '<div class="list-left">' +
    '<img src="' + thumb + '">' +
    '</div>' +
    '</div>' +
    '</a>';
    return output;
}

$(document).on("click", "#closeSession", closeUser);

function closeUser(){
  $("#userUnregistered").empty();
  $("#userUnregistered").append('<li><a href="/register" class="register">' +
      '<span class="glyphicon glyphicon-user"></span>&nbsp' + 
      'Registrarse' +
      '</li>' +
      '<li><a href="/login" class="login"><span class="glyphicon glyphicon-log-in">' +
      '</span>&nbsp Iniciar Sesión</a></li>')
}

$(document).on("click", "#btnUser", openUser);

function openUser(){
    var actualUser = JSON.parse(window.sessionStorage.getItem('user'));
    $("#userUnregistered").empty();
    $("#userUnregistered").append('<li><a id="abc" href="/user" class="register">' +
        '<span class="glyphicon glyphicon-user"></span>&nbsp' + 
        actualUser.user +
        '</a></li>' +
        '<li><a href="/store"><span class="glyphicon glyphicon-piggy-bank"></span>' + "&nbsp&nbsp" + actualUser.coins  +
        '<li><a href="/" id="closeSession" class="login"><span class="glyphicon glyphicon-log-in">' +
        '</span>&nbsp Cerrar Sesión</a></li>');
}

function startTime(){
  today=new Date();
  h=today.getHours();
  m=today.getMinutes();
  s=today.getSeconds();
  m=checkTime(m);
  s=checkTime(s); 
  document.getElementById('reloj').innerHTML=h+":"+m+":"+s;
  t=setTimeout('startTime()',500);
}

function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
} 

function storeProducts(){
    $(".cajaSoporte").mouseover(function(){
        $(".msgSoporte").css("visibility", "visible");
    });
    $(".cajaSoporte").mouseout(function(){
        $(".msgSoporte").css("visibility", "hidden");
    });
    $(".cajaCascos").mouseover(function(){
        $(".msgCascos").css("visibility", "visible");
    });
    $(".cajaCascos").mouseout(function(){
        $(".msgCascos").css("visibility", "hidden");
    });
    $(".cajaCamiseta").mouseover(function(){
        $(".msgCamiseta").css("visibility", "visible");
    });
    $(".cajaCamiseta").mouseout(function(){
        $(".msgCamiseta").css("visibility", "hidden");
    });
    $(".cajaPulso").mouseover(function(){
        $(".msgPulso").css("visibility", "visible");
    });
    $(".cajaPulso").mouseout(function(){
        $(".msgPulso").css("visibility", "hidden");
    });
    $(".cajaReloj").mouseover(function(){
        $(".msgReloj").css("visibility", "visible");
    });
    $(".cajaReloj").mouseout(function(){
        $(".msgReloj").css("visibility", "hidden");
    });
    $(".cajaGuantes").mouseover(function(){
        $(".msgGuantes").css("visibility", "visible");
    });
    $(".cajaGuantes").mouseout(function(){
        $(".msgGuantes").css("visibility", "hidden");
    });
    $(".cajaCalcetines").mouseover(function(){
        $(".msgCalcetines").css("visibility", "visible");
    });
    $(".cajaCalcetines").mouseout(function(){
        $(".msgCalcetines").css("visibility", "hidden");
    });
    $(".cajaRino").mouseover(function(){
        $(".msgRino").css("visibility", "visible");
    });
    $(".cajaRino").mouseout(function(){
        $(".msgRino").css("visibility", "hidden");
    });
    $(".cajaZapas").mouseover(function(){
        $(".msgZapas").css("visibility", "visible");
    });
    $(".cajaZapas").mouseout(function(){
        $(".msgZapas").css("visibility", "hidden");
    });
}
function styleUser(){
    $('.navGeneral').attr('style', ' margin-bottom: 0px !important');
    $('.colGeneral').attr('style', ' padding-right: 0px !important');
    $('.colGeneral').attr('style', ' padding-left: 0px !important');
}

function styleIndex(){
    $('.navGeneral').attr('style', ' margin-bottom: 20px !important');

}

function styleUmaps(){
    $('.nopadding').attr('style', 'padding-left: 0px !important');
}