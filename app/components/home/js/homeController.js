cjs.controller('homeController', function ($scope, $timeout, apiFactory) {
    var promisePokemons,
        count = 0;
    $scope.show = false;
    $scope.showMoreButton = true;
    $scope.loader = false;

    // Hiding description
    $scope.hide = function(){
        $scope.show = false;
    }

    // Loading first 12 pokemons
    promisePokemons = apiFactory.loadPokemons(count);
    promisePokemons.then(function (data) {
        $scope.pokemonList = data.objects;
    });

    // Get all info about one pokemon
    $scope.getInfo = function (id) {
        $scope.loader = true;
        var selectedPokemon = apiFactory.getOnePokemon(id);
        selectedPokemon.then(function (data) {
            $scope.selectedPokemon = data;
            $scope.show = true;
            $scope.loader = false;
        });
    }

    // Load 12 more pokemons
    $scope.loadMore = function () {
        count +=12;
        $scope.loader = true;
        var promisePokemons = apiFactory.loadPokemons(count);
        promisePokemons.then(function (data) {
            for(var i = 0;i < data.objects.length; i++){
                $scope.pokemonList.push(data.objects[i]);
            }
            if(count>778){
                $scope.showMoreButton = false;
            }
            $scope.loader = false;
        });
    }
});