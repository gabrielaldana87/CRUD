
var body = document.getElementById("test");
var div = document.createElement("div");
body.appendChild(div);
div.id="container";
var div2 = document.createElement("div");
div.appendChild(div2);
div2.id="leftdiv";
var div3 = document.createElement("div");
div.appendChild(div3);
div3.id="rightdiv";
var div4 = document.createElement("div");
div3.appendChild(div4);
div4.id="inputbar";
//var form = document.createElement("form")
//div4.appendChild(form);
var input = document.createElement("input");
div4.appendChild(input);
input.type="text";
input.placeholder="search for something!";
input.id="textbox";

var input2 = document.createElement("input");
div4.appendChild(input2);
input2.type="submit";
input2.value="Add";
input2.id="button";

input2.addEventListener("click",function()
{
  var safeURL = encodeURI(input.value);
  var method_look = safeURL;
  var key = "&api_key=dc6zaTOxFJmzC";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://api.giphy.com/v1/gifs/search?q="+method_look+key)
  xhr.addEventListener("load", function(e)
  {
    var d=xhr.responseText;
    var parsed=JSON.parse(d);
    var div5 = document.createElement("div")
    div3.appendChild(div5);
    div5.id="floats";
    var h1= document.createElement("h1");
    div5.appendChild(h1);
    h1.innerText=parsed.data[0].caption;

    var img = document.createElement("img");
    div5.appendChild(img);
    img.src=parsed.data[0].images.original.url;
  })
  xhr.send();
})

var counter = 1;
window.addEventListener("keydown",function(evt)
{
  if(evt.keyCode===39)
    {
      var safeURL = encodeURI(input.value);
      var method_look = safeURL;
      var key = "&api_key=dc6zaTOxFJmzC";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://api.giphy.com/v1/gifs/search?q="+method_look+key)
      xhr.addEventListener("load", function(e)
      {
        var d=xhr.responseText;
        var parsed=JSON.parse(d);

        var h1= document.querySelector("h1");
        h1.innerText=parsed.data[counter].caption;

        var img = document.querySelector("img");
        img.src=parsed.data[counter].images.original.url;
        counter++;
      })
      xhr.send();
    }
})
