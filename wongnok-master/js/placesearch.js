var PlaceSearch = {

    //Search places near PSU Phuket
    Search : function (query, type, radius) {
        var deferred = new $.Deferred();
        var query = "?query=" + query;
        var type = "&type=" + type;
        var location = "&location=7.894878,98.352054";
        var radius = "&radius=" + radius
        var key = "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk";
        var url = "https://maps.googleapis.com/maps/api/place/textsearch/json" + query + type + location + radius + key;        
        fetch(url)
            .then(function (response) {
                response.json().then(function (data) {  
                    console.log(data); 
                    var output = [];
                    data.results.forEach(element => {
                        var photo;
                        if(element.photos){
                            photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + element.photos[0].photo_reference + "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk"
                        }
                        else{
                            photo = "https://vignette.wikia.nocookie.net/janethevirgin/images/4/42/Image-not-available_1.jpg/revision/latest?cb=20150721102313"
                        }                                              
                        var place = {
                            id: element.place_id,
                            name: element.name,
                            address: element.formatted_address,
                            rating : element.rating,
                            photo: photo                           
                        }
                        output.push(place);
                    });
                    deferred.resolve(output);
                });
            })        

        return deferred.promise();
    },

    Detail : function (placeid) {
        var deferred = new $.Deferred();
        var placeid = "?placeid=" + placeid;        
        var key = "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk";
        var url = "https://maps.googleapis.com/maps/api/place/details/json" + placeid + key;        
        fetch(url)
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                    var output = [];
                    var photos = [];
                    data.result.photos.forEach(element => {
                        if(element.photo_reference){
                            photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + element.photo_reference + "&key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk"
                        }
                        else{
                            photo = "https://vignette.wikia.nocookie.net/janethevirgin/images/4/42/Image-not-available_1.jpg/revision/latest?cb=20150721102313"
                        }     
                        photos.push(photo);
                    });
                    var place = {
                        id: data.result.place_id,
                        name: data.result.name,
                        address: data.result.formatted_address,
                        open_now: data.result.opening_hours.open_now,
                        rating : data.result.rating,
                        phone: data.result.formatted_phone_number,
                        photos: photos                         
                    }
                    deferred.resolve(place);                
                });
            })            
        
        return deferred.promise();
    }

}