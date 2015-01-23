var express = require('express');
var ejs = require('ejs');
//var bodyParser = require('body-parser');

var app = express();
// app.use(bodyParser.urlencoded({extended: true}));
var array = [];
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
          }
        else
          {
            res.send("pet does not exist!");
          }
      })
    }
});

app.get('/:method',function(req,res)
{
  if(req.params.method==="all_pets")
    {
      res.json(array);
    }
})

// app.get('/:method/:oldname/:newname',function(req,res)
// {
//   if(req.params.method==="update")
//     {
//       res.send("hello");
//       console.log("45");
//       // array.forEach(function(animals)
//       // {
//       //   if(req.params.name===animals.name)
//       //     {
//       //       console.log("hello");
//       //     }
//       // })
//     }
// });

// app.post('/add', function(req, res) {
//   // note that we're using req.body.item
//   // rather than req.params.item or
//   // req.query.item
//   items.push(new person(req.body.first, req.body.last, req.body.email));
//   res.render('movieposter.ejs', { items: items });
//   console.log(items);
// })

app.listen(3000);

console.log('listening on port 3000!');
