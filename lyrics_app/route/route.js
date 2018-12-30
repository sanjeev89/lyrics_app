var express=require('express');
var router=express.Router();

var cheerio= require('cheerio');
var request = require('request');

router.get('/',function(req,res){
    res.render('index');
});

router.get('/getmusic/:query', function(req,res){
    console.log(req.params.query);
    var query=""+req.params.query;
    query=query.replace(/ /g,'+');
    var url="https://www.google.co.in/search?q="+query+"+metrolyrics";

    var metrourl;
    

    request(url,function(err,response,body){          //this request for lyrics scrap
        if(!err)
        {
            console.log(url);
           const $=cheerio.load(html);
            var links=$('a'>'.r');           //get all links
            links.forEach(function(link){
                var val=$(link).text();
                if(val.search("metrolyrics")!==-1)  // mtlb link mil chuka h
                {
                     metrourl=$(link).attr('href').substring(7);
                     console.log(metrourl);
                     return false;
                }
            })

            if(!metrourl || metrourl.length<3)
            {
                res.send("metrourl khulne k baad galat h ");
            }

            else{
                 request(metrourl,function(err,response,body){
                     if(!err)
                     {
                         var $=cheerio.load(html);
                         var data=$('.verse').text();
                         res.send(data.text());
                     }
                     else{
                        res.send("lyrics not found ");
                     }
                 })

            }

        }
        //i.e. error has occured in google search
        else{
            res.send("google search eaal galat h ");   
        }
    })
} )

module.exports= router;


sbi.04849@sbi.co.in 