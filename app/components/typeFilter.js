cjs.filter('typeFilter', [function () {
    return function (items, selectedItem) {
        console.log(selectedItem);
        if (!angular.isUndefined(items) && !angular.isUndefined(selectedItem) && selectedItem != '') {
            var filteredItems = [];
            angular.forEach(items, function (item) {
                angular.forEach(item.types,function(val){
                    if(!!(val.name.indexOf(selectedItem)+1)){
                        filteredItems.push(item);
                    };
                })
            });
            return filteredItems;
        } else {
            return items;
        }
    };
}]);