     
      var topics = ["corvette","lamborghini","ferrari", "porsche"];
      
     
      
      $(document).ready(function () {
      
  
           run();
         $('#input-btn').on("click",function(){ 
         
         var user =  $("#user-input").val();
         topics.push(user);
         $("#topics").empty();
   
           run();
   
         });
   
   
         //function for creating topic buttons taking from the array of topics
         function run(){
       
         topics.forEach(function(t,index){
             
             var button = $('<button>');
             button.html(t);
             button.attr('id', "topic"+index);
             button.attr('class', 'topic-btn');
             button.attr('data-topic', t); 
             button.appendTo("#topics");
            
          });
          
         }
   
           //click a topic button to call giphy api to display images 
           $('#topics').on('click',"button" ,function(){
            var topic = $(this).data("topic");
           console.log('hello');
           
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
                   img.attr('data-pic', index );
                   p.html("Rating: " + r.rating);
                   p2.html("Title: "+ r.title)
                   img.attr('class','images');
                   
                   img.attr('src', r.images.fixed_height_still.url ); 
                  imgDiv.appendTo('#images');
                   img.appendTo(imgDiv);
                   p.appendTo(imgDiv);
                   p2.appendTo(imgDiv);
                   
   
                   //click image to make giph move or still 
               $('img').on('click', function(){
                   var picNum = $(this).data('pic');
                   var picAction = $(this).attr('src');
                   
                   if(picAction === results.data[picNum].images.fixed_height.url){
                       $(this).attr('src', results.data[picNum].images.fixed_height_still.url); 
                         }else{
                       $(this).attr('src', results.data[picNum].images.fixed_height.url);
                     }
     
               });
           
   
             });
   
      
         });
   
         });
   
       });//end doc ready