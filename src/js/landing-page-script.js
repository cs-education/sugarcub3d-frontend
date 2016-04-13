
// make sure the video loops
$('video').on('ended', function () {
    this.load();
    this.play();
});


//if(screen.width/screen.height<1.7)
//{
//    $('video').remove();
//}
