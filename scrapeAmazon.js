// lee angioletti
// get titles
var titles = []
var x = document.getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")
for (i = 0; i < x.length; i++) { titles.push(x[i].title) }
copy(titles)

// get watch links
var links = []
var x = document.getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")
for (i = 0; i < x.length; i++) { links.push(x[i].href) }
copy(links)

// get image links
var images = []
var x = document.getElementsByClassName("s-access-image cfMarker")
for (i = 0; i < x.length; i++) { images.push(x[i].src) }
copy(images)