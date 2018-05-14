function slide_in_myproj() { 
    $('body').addClass('geek-background');
    $('#home').addClass('zoomOut').one("webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd",
    function(event) {
        $('#showcase').addClass('slideInRight');
        $('#home').removeClass('zoomOut');
        $('#showcase').show().one("webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd",
        function(event) {
            $('body').removeClass('geek-background')
            $('#showcase').removeClass('slideInRight');
        });
        $('#home').hide();
});
 }
function show_home() { 
    $('body').addClass('geek-background');
    $('#showcase').addClass('slideOutRight').one("webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd",
    function(event) {
        $('#home').addClass('zoomIn');
        $('.fadeIn').removeClass('fadeIn');
        $('#showcase').removeClass('slideOutRight');
        $('#greeter_message').removeClass('jackInTheBox');
        $('#home').show().one("webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd",
        function(event) {
            $('body').removeClass('geek-background')
            $('#home').removeClass('zoomIn');
        });
        $('#showcase').hide();
});
 }