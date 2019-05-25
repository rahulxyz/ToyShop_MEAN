# What is ToyShop?
Toyshop is a web application to list a number of toys. Customers can explore through a variety of toys in just a short amount of time. For a world full of busy people, ToyShop provides a way to list and search toys from a large number of brands and according to different demands of customers.

# Product Description
It is a web application for listing and searching toys, developed using the MEAN Stack. It allows users to filter through a number of toys according to manufacturer or toy’s name as well as through rating and budget of users. It provides a facility of adding toys to user’s cart as they explore through the website.

# Features to be delivered:
1. Search By
   * Toy's name
   * Manufacturer of Toy
2. Filter according to
   * Manufacturer name
   * Price Range
   * User Rating
3. Sorting according to
   * Price
   * User Rating
4. Add to Cart

# Future Scope
1. Registration
2. Purchase toy
3. Introducing additional filter

# About
ToyShop is built using the latest technologies that include:
1. MongoDB
2. Node.js
3. Express.js
4. Angular
5. React

# Mongo:
MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need. MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas. MongoDB is developed by MongoDB Inc., and is published under a combination of the GNU Affero General Public License and the Apache License.
 
**Why NoSQL?** 
NoSQL systems are distributed, non-relational databases designed for large-scale data storage and for massively-parallel, high-performance data processing across a large number of commodity servers. They arose out of a need for agility, performance, and scale, and can support a wide set of use cases, including exploratory and predictive analytics in real-time. They arose out of a need for agility, performance, and scale, and can support a wide set of use cases, including exploratory and predictive analytics in real-time. Built by top internet companies to keep pace with the data deluge, NoSQL data base scales horizontally, and is designed to scale to hundreds of millions and even billions of users doing updates as well as reads.

# Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side. Historically, JavaScript was used primarily for client-side scripting, in which scripts written in JavaScript are embedded in a webpage's HTML and run client-side by a JavaScript engine in the user's web browser.

# Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.It has been called the de facto standard server framework for Node.js.

# Angular
Angular (commonly referred to as "Angular 2+" or "Angular v2 and above") is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.

# React
In computing, React (also known as React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.
**Following Coding-style is used:**
1. Destructuring props: It makes assigning object properties to variables feel like much less of a chore.
2. One tag, one line
3. Wrap up: Only write JSX on the right side of an = or a return.

# Functionality:
MongoDB queries are used to access list of required details from the Database. 
* Documents: 10000 
* Fields : 16

Node.js Query example. Documents are returned on the basis of city name provided. Business Name and description is returned by the following query.

```ruby
var mongojs= require('mongojs')
var db=mongojs('toyshop',['toys','users'])
db.toys.find({$or:[
                   {product_name: key},
		   {manufacturer: key}
		]},		    `
              {_id:0,
              uniq_id:1,
              product_name:1,
              manufacturer:1,
              price:1,
              average_review_rating:1,
              number_available_in_stock:1
              },
        function(err,data){
        	res.send(data)
        }
)
```

The Service APIs are called whenever an event is hit on the User Interface. Express APIs are written in node.js with callback functions to avoid any blocking, and allows other code to be run in the meantime.

```ruby
var express= require('express')
var app = express()
var mongojs= require('mongojs')
var db=mongojs('toyshop',['toys','users'])
app.get('/home',function(req,res){

db.toys.find({},{_id:0,uniq_id:1,product_name:1,price:1}).limit(9,
 	function(err,data){
               res.send(data)
         })
})
```

# Help
* [MongoDB](https://docs.mongodb.com/)
* [NodeJS](https://nodejs.org/en/docs/)
* [ExpressJS](https://expressjs.com/en/guide/routing.html)
* [Angular](https://angular.io/docs)
