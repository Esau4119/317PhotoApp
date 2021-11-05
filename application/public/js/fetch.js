
document.getElementById("FAKEAPIBUTTON").onclick = getEVERYTHING;
var counter = 0;
function getEVERYTHING(ev) {
    ev.preventDefault();
    function buildImageDiv(imgLink, Title) {
        counter += 1;
        //console.log(counter);
        let div = document.createElement('div');
        let img = document.createElement('img');
        let title = document.createElement('div');
        let br = document.createElement('br');
        img.src = imgLink;
        title.innerText = Title;
        img.width = "200";
        img.height = "150";
        title.height = "50";
        title.width = "200";
        title.style.fontSize = "8";
        title.setAttribute("class", "neonText");
        div.setAttribute("class", "bor");
        div.appendChild(img);
        div.appendChild(br)
        div.appendChild(title);
        
        document.getElementById('counter').innerHTML =
            `<div class = "neonText">Number of pictures: ${counter}</div>`;
        div.onclick = fadeout;

        function fadeout() {
            let opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"))
            let a = setInterval(() => {
                if (opacity > 0) {
                    opacity = opacity - 0.2;
                    div.style.opacity = opacity;

                } else {
                    clearInterval(a);
                    div.remove();
                    counter = counter - 1;
                    document.getElementById('counter').innerHTML = `<div class = "neonText">Number of pictures: ${counter}</div>`;

                }

            }, 100);

        }

        return div;
    }

    ev.preventDefault();
    var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    if (window.offset) {
        url = url.replace("{offset}", "&offset=" + window.offset);
    } else {
        url = url.replace("{offset}", "");
    }

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data_json) => {
            let pics = data_json;
            
            var div = document.getElementById("container-for-all-of-the-fake-api-pictures-and-titles-that-are-probrably-in-a-different-language");
            [...pics].forEach((element) => { 
                div.appendChild(buildImageDiv(element.url,element.title));
            });

            if (window.offset) {
                window.offset = window.offset + 25;
            } else {
                window.offset = 25;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

