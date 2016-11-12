/**
 * Created by deepwest83 on 10/23/2016.
 */

cjs.factory('apiFactory', function ($q, $http) {

    //Loads first 20 emails list
    function _loadPokemons(count) {
        var deferred = $q.defer();

        $http.get("http://pokeapi.co/api/v1/pokemon/?limit=12&offset=" + count)
            .then(function(response) {

                response.data.objects.map(function(val){
                    var id = val.resource_uri.split('/');
                    val.id = id[id.length-2];
                    return val;
                });

                deferred.resolve(response.data);
            });

        return deferred.promise;
    }

    function _getOnePokemon(id){
        var deferred = $q.defer();
        $http.get("http://pokeapi.co/api/v1/pokemon/" + id)
            .then(function(response) {
                deferred.resolve(response.data);
            });
        return deferred.promise;
    }

    //Returns single email snippet
    // function _loadSingleEmail(threadId){
    //     var deferred = $q.defer();
    //     gapi.client.load('gmail', 'v1', function () {
    //         request = gapi.client.gmail.users.threads.get({
    //             'userId': 'me',
    //             'id':threadId
    //         });
    //
    //         request.execute(function (resp) {
    //             deferred.resolve(resp.messages[0]);console.log(resp);
    //         });
    //     });
    //
    //     return deferred.promise;
    // }

    return {
        loadPokemons: _loadPokemons,
        getOnePokemon: _getOnePokemon
        // loadSingleEmail:_loadSingleEmail
    }
});