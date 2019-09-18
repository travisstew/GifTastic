     
      var topics = ["corvette","lamborghini","ferrari", "porsche"];
      
     
      
      $(document).ready(function () {
      
  
           addBtn();
         $('#input-btn').on("click",function(){ 
         
         var user =  $("#user-input").val();
          
         topics.push(user);
         $("#topics").empty();
           addBtn();
          var clear = document.querySelector("#user-input");
          clear.value = "";

         });
   
   
         //function for creating topic buttons taking from the array of topics
         function addBtn(){
       
         topics.forEach(function(t,index){
             
             var button = $('<button>');
             button.html(t);
             button.attr('id', "topic"+index);
             button.attr('class', 'topic-btn');
             button.attr('data-topic', t); 

             button.appendTo("#topics");
            
          });
          
         }
        var dataPicCount =0;
     
           //click a topic button to call giphy api to display images 
           $('#topics').on('click',"button" ,function(){
            var topic = $(this).data("topic");
          

            var url = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=Jb3ttdnYHru0VwVp3pTkk1thutShY83T&limit=10`;
   
            $.ajax({
             method: 'GET',
             url: url,
             
             }).then(function(results){
              
               console.log(results);

             results.data.forEach(function(r,index){
                 var imgDiv = $('<div>');
                 var img  = $('<img>');
                 var p = $('<p>');
                 var p2 = $('<p>');
                   imgDiv.attr('class','grid-item');
                   //adding a image data-pic after buttons are updated//
                   img.attr('data-pic', index);//
                   img.attr('data-pic-number', (index + dataPicCount)-10 );
                   img.attr('data-name', topic)
                   p.html("Rating: " + r.rating);
                   p2.html("Title: "+ r.title)
                   img.attr('class','images');
                   
                   img.attr('src', r.images.fixed_height_still.url ); 
                    imgDiv.appendTo('#images');
                   img.appendTo(imgDiv);
                   p.appendTo(imgDiv);
                   p2.appendTo(imgDiv);
                
             });

         }); 
       
         dataPicCount +=10;
       });

        //click image to make giph move or still 
        $('#images').on('click','img',function(){
    
          var search = $(this).data('name');
          var picNum = $(this).data('pic');
          var picAction = $(this).attr('src')
          var picSelect = $(this).data('pic-number');

         
            var url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=Jb3ttdnYHru0VwVp3pTkk1thutShY83T&limit=10`;
   
            $.ajax({
             method: 'GET',
             url: url,
             
             }).then(function(r){

                if(picAction === r.data[picNum].images.fixed_height.url){
               
                  $("[data-pic-number=" + picSelect + "]").attr('src',r.data[picNum].images.fixed_height_still.url);
                }else{
                   $("[data-pic-number=" + picSelect + "]").attr('src',r.data[picNum].images.fixed_height.url);
                }
    

             });
              
                
            



     

      });//end pic click

       });//end doc ready