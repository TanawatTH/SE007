$(function () {

    PlaceSearch.Search("", "cafe", "500").then(function(data){
        console.log(data);
    });

    PlaceSearch.Detail("ChIJWU0h9E0wUDARtQguw23h5UM").then(function(data){
        console.log(data);
    });
    
});