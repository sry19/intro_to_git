var express=require("express");
var app=express();
var bodyParser = require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override")
var Campground=require("./models/campground")
var Comment=require("./models/comment")
var User=require("./models/user")
var seedDB=require("./seeds")
var passport= require("passport")
var LocalStrategy=require("passport-local")
var PassportLocalMongoose=require("passport-local-mongoose")
var flash       = require("connect-flash")
var User=require("./models/user")

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
 
var url=process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_app"   
// mongoose.connect("mongodb+srv://sry19:%23sry19961116@cluster0-bwlov.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }); 
// mongoose.connect("mongodb://localhost:27017/yelp_camp_app" , { useNewUrlParser: true }); 



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB()

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




// Campground.create({
//     name:"Salmon Creek",
//     image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//     description:"This is a good granite hill"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(campground);
//     }
// });





app.listen(process.env.PORT,process.env.IP,function(){
    console.log("listen")
});



