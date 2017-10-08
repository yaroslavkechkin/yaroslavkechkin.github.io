// randomize image, between 1 and 5.jpg
var numRand = Math.floor(Math.random() * (6 - 1 + 1)) + 1; 
document.getElementById("imgRand").src = "images/test_images/"+numRand+".jpg";

// JQUERY : Contact
$(document).ready(function() {
    $('#send').click(function () {      
    
    //Get the data from all the fields
    var name = $('input[name=name]');
    var email = $('input[name=email]');
    // var phone = $('input[name=phone]');
    // var subject = $('input[name=subject]');
    var message = $('textarea[name=message]');
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // var phoneRegex = /^\d+$/;
    //Simple validation to make sure user entered something
    //If error found, add error-highlight class to the text field
    
    if (name.val()=='' || name.val()=='Name') {
        name.addClass('error-highlight'); 
        return false;
    } else name.removeClass('error-highlight');
    
    if (email.val()==''  || email.val()=='Email') {
        email.addClass('error-highlight');
        return false;
    }
    
    else if(!email.val().match(emailRegex)) {
         email.addClass('error-highlight');
         return false;
    } 
    else email.removeClass('error-highlight');
    
    // if (phone.val()==''  || phone.val()=='Phone') {
    //     phone.addClass('error-highlight');
    //     return false;
    // }
    
    // else if(!phone.val().match(phoneRegex)) {
    //      phone.addClass('error-highlight');
    //      return false;
    // } 
    // else phone.removeClass('error-highlight');
    
    // if (subject.val()=='' || subject.val()=='Subject') {
    //     subject.addClass('error-highlight');
    //     return false;
    // } else subject.removeClass('error-highlight');
    
    if (message.val()=='' || message.val()=='Message') {
        message.addClass('error-highlight');
        return false;
    } else message.removeClass('error-highlight');
    
    //organize the data properly
    var data = 'name=' + name.val() + '&email=' + email.val() + '&message='  + encodeURIComponent(message.val());    
    //'&phone=' + phone.val() + '&subject=' + subject.val() +
    
    // Disable fields
    //$('.text-label, .textarea-label').attr('disabled','true');
    
    //show the loading sign
    $('.loading-contact').show();
    //start the ajax
    $.ajax({
        //this is the php file that processes the data and send mail
        url: "../contact.php", 
        
        //GET method is used
        type: "GET",

        //pass the data         
        data: data,     
        
        //Do not cache the page
        cache: false,
        
        //success
        success: function (html) {              
            //if process.php returned 1/true (send mail success)
            if (html==1) {                  
                //hide the form
                
                //show the success message
                $('.loading-contact').fadeOut('slow');  
                    
                //show the success message
                $('.success-message').slideDown('slow');
                $('.success-message').delay(1000).slideUp('slow');
                                        
                // Disable send button
                //$('#send').attr('disabled',true);
                
                //if process.php returned 0/false (send mail failed)
                } else
                  {
                  $('.loading-contact').fadeOut('slow')
                  alert('Sorry, unexpected error. Please try again later.');
                 
                  }
            }       
        });
    
        //cancel the submit button default behaviours
        return false;
    }); 
}); 