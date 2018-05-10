$(function () {

    var placeid = getUrlParameter('placeid');

    PlaceSearch.Detail(placeid).then(function(data){
        console.log(data);
        $('#gallery').empty();
        $('#placename').html(data.name);        
        $('#address').html(data.address);
        $('#opennow').html(data.open_now);
        $('#rating').html(data.rating);
        $('#phone').html(data.phone);
        
        for(var i=0;i<data.photos.length;i++){
           if(i==0){var row =     '<div class="carousel-item active">'+

          
           '<img  class=" mySlides "style="height:300px"src=' + data.photos[i] + ' class="thumbnail" />' +
   
            '</div>';

          
           
       
            $('#gallery').append(row) ;}else{var row = '<div class="carousel-item ">'+

          
            '<img  class=" mySlides "style="height:300px"src=' + data.photos[i] + ' class="thumbnail" />' +
       
             '</div>';
 
           
            
        
             $('#gallery').append(row) ;}}
             $('#carousel-example-generic').on('slid.bs.carousel', function () {
                $(".carousel-item.active:nth-child(" + ($(".carousel-inner .carousel-item").length -1) + ") + .carousel-item").insertBefore($(".carousel-item:first-child"));
                $(".carousel-item.active:last-child").insertBefore($(".carousel-item:first-child"));
            });  
           
    });


    //Get URL parameter
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

});