// jordan barkley
// images (tv)
var image = ""
var images = []
var x = []
x = document.getElementsByClassName("thumbnail")
for (i = 0; i < x.length; i++) {
    image = x[i].src

    if (x[i].src != undefined) {
        images.push(image)
    }
}
copy(images)

// title (tv)
var title = ""
var titles = []
var x = []
x = document.getElementsByClassName("title")
for (i = 0; i < x.length; i++) {
    title = x[i].innerHTML

    titles.push(title)
}
copy(titles)

// watch link(tv)
var link = ""
var links = []
var x = []
x = document.getElementsByClassName("beacon-click")
for (i = 0; i < x.length; i++) {
    title = x[i].href
    titles.push(title)
}
copy(titles)
