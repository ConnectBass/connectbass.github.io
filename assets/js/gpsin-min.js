var APPROOT="https://api.connectbass.com";
angular.module("cbSin",["ngResource","directive.g+signin"]).config(function(){}).controller("sinCtrl",["$scope","$http","$window",function(a,d,e){a.errorMsg=!1;var c=function(b){return $.param(b)},f=jstz.determine();a.tzName=f.name();d.jsonp(APPROOT+"/sso/google/start?callback\x3dJSON_CALLBACK").success(function(b,c){"ok"==b.status?a.state=b.state:e.location.href="/docs/#/error/internalError"}).error(function(b,e){a.errorMsg="Network error..."});a.$on("event:google-plus-signin-success",function(b,
f){a.progress=!0;d({method:"POST",cache:!1,url:APPROOT+"/sso/google/callback",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded; charset\x3dUTF-8"},transformRequest:c,data:{code:f.code,state:a.state,tz:a.tzName}}).success(function(b,a,c,d){"ok"==b.status?e.location.href="/cc/":angular.isDefined(b.url)?e.location.href=b.url:e.location.href="/docs/#/error/internalError"}).error(function(b,a,e,c){modalService.errorHandler(a)})})}]);"use strict";
angular.module("directive.g+signin",[]).directive("googlePlusSignin",function(){var a=/\.apps\.googleusercontent\.com$/;return{restrict:"E",template:'\x3cspan class\x3d"g-signin"\x3e\x3c/span\x3e',replace:!0,link:function(d,e,c){c.clientid+=a.test(c.clientid)?"":".apps.googleusercontent.com";c.$set("data-clientid",c.clientid);var f={callback:"signinCallback",cookiepolicy:"single_host_origin",requestvisibleactions:"http://schemas.google.com/AddActivity",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
width:"wide",accesstype:"online",approvalprompt:"force"};angular.forEach(Object.getOwnPropertyNames(f),function(b){c.hasOwnProperty(b)||c.$set("data-"+b,f[b])});(function(){var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src="https://apis.google.com/js/client:plusone.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})()}}}).run(["$window","$rootScope",function(a,d){a.signinCallback=function(a){a&&a.access_token?d.$broadcast("event:google-plus-signin-success",
a):d.$broadcast("event:google-plus-signin-failure",a)}}]);
