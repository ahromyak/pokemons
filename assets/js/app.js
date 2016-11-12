
var cjs=angular.module('myApp',['ui.router']);cjs.controller('mainController',["$scope",function($scope){$scope.loadMoreRecords=function(){$scope.$broadcast('loadMoreEmails',{count:20})}}]);cjs.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/home");var homeState={name:'home',url:'/home',controller:'homeController',templateUrl:'app/components/home/html/home.html'};$stateProvider.state(homeState);}]);cjs.factory('apiFactory',["$q","$http",function($q,$http){function _loadPokemons(count){var deferred=$q.defer();$http.get("http://pokeapi.co/api/v1/pokemon/?limit=12&offset="+count).then(function(response){response.data.objects.map(function(val){var id=val.resource_uri.split('/');val.id=id[id.length-2];return val;});deferred.resolve(response.data);});return deferred.promise;}
function _getOnePokemon(id){var deferred=$q.defer();$http.get("http://pokeapi.co/api/v1/pokemon/"+id).then(function(response){deferred.resolve(response.data);});return deferred.promise;}
return{loadPokemons:_loadPokemons,getOnePokemon:_getOnePokemon}}]);cjs.controller('homeController',["$scope","$timeout","apiFactory",function($scope,$timeout,apiFactory){var promisePokemons,count=0;$scope.show=false;$scope.showMoreButton=true;$scope.hide=function(){$scope.show=false;}
promisePokemons=apiFactory.loadPokemons(count);promisePokemons.then(function(data){$scope.pokemonList=data.objects;});$scope.getInfo=function(id){var selectedPokemon=apiFactory.getOnePokemon(id);selectedPokemon.then(function(data){$scope.selectedPokemon=data;$scope.show=true;});}
$scope.loadMore=function(){count+=12;var promisePokemons=apiFactory.loadPokemons(count);promisePokemons.then(function(data){for(var i=0;i<data.objects.length;i++){$scope.pokemonList.push(data.objects[i]);}
if(count>778){$scope.showMoreButton=false;}});}}]);