/**
 * Created by Administrator on 2016/12/22.
 */
 $(function(){
     $('#username input').focus(function(){
         $('#username span').css('display','none')
     });
     $('#username input').focusout(function(){
         if($('#username input').val()==''){
             $('#username span').css('display','block')
         }
     });
     $('.password input').focus(function(){
         $('.password span').css('display','none')
     });
     $('.password input').focusout(function(){
         if($('.password input').val()==''){
             $('.password span').css('display','block')
         }
     });
     //ajax
     $('.btn').click(function(){
         $.get(
             "user.php",
             {
                 act:"login",
                 user:$('#username input').val(),
                 pass:$('.password input').val()
             },
             function(data){
                 alert(data);
             }
         )
     });





























 });
