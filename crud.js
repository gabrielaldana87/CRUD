var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

fs.readFile("pets.json",function(e,data)
{

var parsed = JSON.parse(data);
console.log(parsed);
var app = express();
var array = [];

parsed.forEach(function(animals)
{
  array.push(animals);
})
var msg = {
  "status":"Success!"
          }

app.get('/:method/:name/:pet',function(req,res)
{
    if(req.params.method==="create")
      {
        var data =
            {
              "name": req.params.name,
              "type": req.params.pet
            }
        array.push(data);
        console.log(array);
        res.json(data)

        fs.writeFile("pets.json",JSON.stringify(array),function(e)
        {
          console.log('done');
        })
      }

    if(req.params.method==="update")
        {
          array.forEach(function(animals)
          {
            if(req.params.name===animals.name)
              {
                animals.name=req.params.pet;
                console.log(array);
                res.send("animal changed to name: "+animals.name+"!")

                fs.writeFile("pets.json",JSON.stringify(array),function(e)
                {
                  console.log('done');
                })
              }
          })
        }
});

app.get('/:method/:name',function(req,res)
{
  if(req.params.method==="read")
    {
      array.forEach(function(animals)
      {
        if(req.params.name===animals.name)
          {
            res.send(animals.name);
          }
        else
          {
            res.send("pet does not exist!");
          }
      });
    }

  if(req.params.method==="destroy")
    {
      array.forEach(function(animals)
      {
        if(req.params.name===animals.name)
          {
            var index = array.indexOf(animals)
            array.splice(index,1);
            res.json(msg);

            fs.writeFile("pets.json",JSON.stringify(array),function(e)
            {
              console.log('done');
            })
           }
        else
          {
            res.send("pet does not exist!");
          }
      });
    };
});

app.get('/:method',function(req,res)
{
  if(req.params.method==="all_pets")
    {
      res.json(array);
    }
})
app.listen(3000);
});



console.log('listening on port 3000!');
