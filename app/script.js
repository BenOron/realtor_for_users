/**
 * Created by I075528 on 4/21/2017.
 */
$(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#odBtn').click(function(e) {
        $(".hideOd").css("display","block")
        e.preventDefault();
    });
    
  

    $('#userBtn').click(function(e) {
        $(".hideOd").css("display","none")
        e.preventDefault();
    });

});
