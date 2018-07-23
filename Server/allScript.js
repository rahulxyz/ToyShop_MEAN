var cors = require('cors')
var express= require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()
app.use(cors())
var mongojs= require('mongojs')
var db=mongojs('amazon',['toys'])
var events=require('events');
var em=new events.EventEmitter();

app.use(bodyParser.json())
app.use(bodyParser.raw({types: ()=> true }))

//Message to be displayed in log.txt
var msg="Directory Name: "+ __dirname + "\n" +
         "StartTimeStamp: "+(new Date(Date.now()+"\n"))+
         "File Name: "+__filename+"\n"+
         "Process Version: "+process.version+"\n"+
         "Process Time: "+process.uptime()+"\n"+
         "Memory Use: "+JSON.stringify(process.memoryUsage())+"\n";

//write data into log.txt
var write=function()
{
  try{
  fs.appendFile("D:\\Project_v2\\ToyShop\\log.txt", msg+"*************************************************************"+"\n"+"\n" , function(err)
  {
    if(err)
    { return console.log(err);
    }

  });
}
catch(err)
{

}
};

//to generate log records
var logger=function()
{
   em.on('error',function(err){
   console.error('Error is of ',err);
   });
   em.on('event1',write);
   em.emit ('event1');
};

//To fetch 9 items seen as grid on home page
app.get('/home',function(req,res){
    db.toys.find({},{_id:0,uniq_id:1,product_name:1,price:1}).limit(9,
	function(err,data){
              res.send(data)
        })
	logger();
})

//To fetch bulk data for listing
app.get('/',function(req,res){

    db.toys.find().limit(300,
	function(err,data){
              res.send(data)
        })
	logger();
})


//To fetch product item by id 
app.get('/productDetails/:id',function(req,res){
var uid= req.params.id.toString()
    db.toys.find({uniq_id:uid},
		{_id:0,uniq_id:1,product_name:1,price:1,description:1,manufacturer:1,number_available_in_stock:1,average_review_rating:1,amazon_category_and_sub_category:1},
	function(err,data){
              res.send(data)
        })
	logger();
})

//To insert Contact Us data in database
app.get('/contactUs/:name/:email/:review',function(req,res){
	
	var nameVar=req.params.name;
	var emailVar=req.params.email;
	var reviewVar=req.params.review;
  	var flag=[{"inserted":0}];
	 db.users.insert({
			name:nameVar,
			email:emailVar,
			review:reviewVar
		},function(err,data){
		if(err)
		flag[0].inserted=0;
		else
		flag[0].inserted=1;

		res.send(flag);
	})
	logger();
})

//To search by keyword
app.get('/shop/searchResult/:keyword',function(req,res){

	     const key=  new RegExp('.*'+req.params.keyword+'.*','i')
        		db.toys.find({$or:[
        		        {product_name: key},
				{manufacturer: key}
				]},
        		        {_id:0,uniq_id:1,product_name:1,manufacturer:1,price:1,average_review_rating:1,number_available_in_stock:1},
        		        function(err,data){
        			           res.send(data)
        		             }
        		)
		logger();
})

//To all items of cart
app.post('/cart/detail',function(req,res){

    db.toys.find({uniq_id:{$in:req.body.uniq_id_list}},
		{_id:0,uniq_id:1,product_name:1,price:1,number_available_in_stock:1},
	function(err,data){
            res.send(data)
        })
	logger();
})

//To filter data according to user
app.post('/shop/filteredResult',function(req,res){

	db.toys.aggregate([
		req.body,
		{$project:{_id:0,uniq_id:1,product_name:1,price:1,average_review_rating:1}}
	],function(err,data){
            res.send(data)
        })
	logger();
})


app.listen(3000)