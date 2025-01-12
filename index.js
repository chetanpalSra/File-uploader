const express = require('express');

const app =  express();

const path = require('path');
 
const multer  = require('multer');

//There are two ways to do it -->

/*1.)*/ // const upload = multer({ dest: 'uploads/' }); //mtlab frontend se jo bi user file upload krega usko uploads folder mei daal do, jb first file upload krege toh je folder khud bn jayege.jb hmm file upload krne ke baad click krenge toh uploads folder mei ik file hogi pr woh khulege nhi Open anyway krna pdegal,so this method is not good.

// This above uploads is middleware,actually instance of middleware.

//So to resolve this above we use a method called disk.Storage which give us full control on storing files to disk.so comment above upload instance.


/*2.)*/ const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,'./Uploads_Storage');
    }, //tells in which folder we have to store the file,file tells which file has to be uploaded,and cb stands for callback we have to call this after completing our work in this function.cb takes two argument that error and name of folder where we have to upload our file,means if there is chance of error  say that user is not logged in so here we can put custom error,else put null, create Upload_Storage manually otherwise face error.
      filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
      },// this tell that what is name of the file you want ot keep.as different users can upload same file that file with same name. so they will get overridden so here we created our own unique filename.
    }
);

const uploads = multer({storage}); 
// This above uploads is middleware,actually upload is instance of middleware.
 
const PORT = 7009;

app.set('view engine','ejs');

app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    return res.render("homepage");
})

app.post('/upload',uploads.single('profileImage'),(req,res)=>{
      console.log(req.body); // will give us null object as we no text in our form.
      console.log(req.file);

      // so hm file ki entry ko database mei uske path property that we will get from req.file() se store kr skte ha ,aur jb browser pr render krni hogi toh us path pr render kra skte ha.

      return res.send('File uploaded Successfully.');
    // The spinning circle (indicating a pending request) suggests that the server is not sending a response back to the client. After the file upload is handled in your app.post('/upload') route, ensure that you send a response
      //This middleware above add file property to req object.
      //upload.single() as we are uploading single file.
});

//To use first method use upload.single() not uploads.single() as it is second method to upload a file but both works same. 


app.listen(PORT,()=>{
    console.log(`Server started at PORT: ${PORT} successfully!!`);
})

// Multer is a Node.js middleware that handles multipart/form-data, which is primarily used for uploading files.

//upload.single(profileImage) acting as middleware see above.

// so we have to install a package npm i multer that helps to upload file.

//Yes, const upload = multer({ dest: 'uploads/' }); creates a middleware using the multer library in Node.js.

// Explanation:
// Multer Middleware:

// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in a Node.js application.

// Code Breakdown:
// multer({ dest: 'uploads/' }):

// Configures Multer to save uploaded files to the uploads/ directory.

// upload:
// An instance of the middleware created by Multer.
// Middleware Usage:
// Middleware in Express.js is a function that has access to the req, res, and next objects in the request-response cycle. The upload middleware processes the file(s) in the incoming request before passing control to the next middleware or route handler.

// Example usage:

// const express = require('express');
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

// const app = express();

// app.post('/upload', upload.single('profileImage'), (req, res) => {
//     res.send('File uploaded successfully!');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
// upload.single('file'):

// Processes a single file with the field name(profileImage)  in the form data.
// After processing the file, Multer adds a file property to the req object, which contains metadata about the uploaded file (e.g., filename, path, size).

// Summary:
// Yes, upload is middleware generated by Multer to handle file uploads in your Express.js application.