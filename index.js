
const express = require('express');
const jsonServer = require('json-server');
const multer = require('multer');


const app = express();



app.use(express.json());


const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, 'uploads/'); 
  },
  filename: (req, file, callback) => {

    callback(null, file.fieldname +file.originalname);
  }
});

const upload = multer({ storage: storage });


const server = jsonServer.create();

const router = jsonServer.router('db.json');


const middlewares = jsonServer.defaults();

const port = 8000;


server.use(middlewares);


server.use(router);


app.post('/reviews', upload.single('image'), (req, res) => {
   
  const review = req.body;
  const image = req.file.filename;

 
  router.db.get('reviews').push({ ...review, image }).write();


  res.json({ ...review, image });
});


app.use('/', server);


app.listen(port, () => {
  console.log(`Server is successfully running at  port number ${port}`);
});