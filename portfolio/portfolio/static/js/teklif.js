var coffee = {
    title: 'Kahve?',
    offer: 'Devamını kahve içerken dinlemek istiyorum.',
    image: "../../static/images/coffee1.png",
    color: "#AB704B"
}

var wine = {
    title: 'Şarap?',
    offer: 'Devamını şarap içerken dinlemek istiyorum.',
    image: "../../static/images/wine1.svg",
    color: "#A71323"
}

var dinner = {
    title: 'Akşam Yemeği?',
    offer: 'Devamını akşam yemeğinde dinlemek istiyorum.',
    image: "../../static/images/dinner2.svg",
    color: "#100f0d"
}

var teklifler = [coffee, wine, dinner];

var count = 1;

// GET INITIAL CONNECTION TIME
var now = new Date();

// GET IP ADDRESS
var a = $.get("http://ipinfo.io", function (response) {
    return response.ip;
}, "jsonp");

// When the page is load for the first time
$(document).ready(function(){
    init();
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

function init(){
    $('body').prepend('<div id="x" style="position:fixed;overflow:hidden;width:0px;height:0px;"></div>');
    for(k in teklifler) {
        $('#x').append('<img src="'+teklifler[k].image+'">');
    };
    $('#orta-image').toggleClass("fadeInImage");
    $('#title').toggleClass("fadeInTitle");
    $('#offer').toggleClass("fadeInOffer");
    $('#evet').toggleClass("popUpEvet");
    $('#reddet').toggleClass("popUpHayir");
}

// run reddiCevap when animation terminates.
$('#reddet').click(function(){
    var end = new Date().getTime();
	var elName = "reddet: " + $('#title').text();
	postIt(end, elName);
    fadeOut($('main'), reddiCevap);
});

$('#evet').click(function(){
    var end = new Date().getTime();
    var elName = "kabul: " + $('#title').text();
	postIt(end, elName);
});

$('.modal-footer a').click(function(){
    var end = new Date().getTime();
    var elName = $(this).attr('id');
	postIt(end, elName);
});

function reddiCevap(){
    $('#orta-image').attr('src',teklifler[count].image);
    $('#title').text(teklifler[count].title).css('color', teklifler[count].color);
    $('#offer').text(teklifler[count].offer).css('color', teklifler[count].color);
    $('.modal').css('color', teklifler[count].color);
    $('.soru').css('color',teklifler[count].color);
    $('body').css('box-shadow', teklifler[count].color + 70 + " 0px 0px 60px 0px inset");
    console.log($('#orta-image').attr('src'));
    count++;
    console.log(count);
    if (count >= 3){
        // count = 0;
        gameOver();
    };
    fadeIn($('main'));
}

function fadeIn (item) {
    item.animate({
        opacity: 1
    },1000)
}

function fadeOut (item, cb) {
    item.animate({
        opacity: 0
    },1000, cb);
}

function gameOver() {
    var end = new Date().getTime();
	var elName = 'game over';
	postIt(end, elName);
    $('#reddet').unbind('click');
    $('#reddet').attr('data-toggle','modal');
    $('#reddet').attr('data-target',"#hak-bitimi");
}

// AJAX POST FUNCTION
function postIt (end, elName) {
	$.ajax({
		type: 'POST',
		url: 'http://rest.learncode.academy/api/maykIsWatching/activityOfHer',
		data: {
			ip: a.responseJSON.ip,
			act: elName,
			time: now,
			resp: ((end - now.getTime()) / 1000) + " seconds",
		},
	});	 
}