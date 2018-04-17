// get titles
var titles = [];
var x = document.getElementsByTagName("Span");
for (var i = 0; i < x.length; i++) {
    if (x[i].style.display == "inline" && x[i].style.maxWidth == "235px") {
        titles.push(x[i].innerHTML);
    }
}
copy(titles);

// get pictures
var images = [];
var x = document.getElementsByClassName("default class2 class4");
for (var i = 0; i < x.length; i++) {
    if(x[i].style.backgroundImage && x[i].style.width == "280px") {
        images.push(x[i].style.backgroundImage);
    }
}
copy(images);

// get watch url
var links = []
var x = document.getElementsByTagName("a");
for (var i = 0; i < x.length; i++) {
    if((x[i].className == "default class2 class4" || x[i].className == "default class2 class1") && x[i].style.width == "280px") {
        links.push(x[i].href);
    }
}
copy(links);