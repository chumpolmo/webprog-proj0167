import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

////////////////////////////////////////////////////////////
// For Firebase
import admin from 'firebase-admin';
import serviceAccount from './config/firebase-config.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Now you can use Firebase Admin SDK services
const db = admin.firestore();
////////////////////////////////////////////////////////////

const app = express()
const port = 3000

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
// app.use(cors({
//   origin: 'http://localhost:3000' // Allow only requests from React's development server
// }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(Buffer.from('<p>About</p>'))
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.get('/users/:userId/books/:bookId', (req, res) => {
  // res.send(req.params)
  let myData = "<h1>My Order</h1>";
  myData+= "<p>User Id: "+req.params.userId+"</p>";
  myData+= "<p>Book Id: "+req.params.bookId+"</p>";
  res.set('Content-Type', 'text/html')
  res.end(myData)
})

const myJson = [
  {
    "userId": 101,
    "userName": "user100",
    "userEmail": "user100@rmutto.ac.th",
    "userPassword": "xxxxxxxx",
    "userRole": "Staff"
  },
  {
    "userId": 102,
    "userName": "user102",
    "userEmail": "user102@rmutto.ac.th",
    "userPassword": "xxxxxxxx",
    "userRole": "Staff"
  },
  {
    "userId": 103,
    "userName": "user103",
    "userEmail": "user103@rmutto.ac.th",
    "userPassword": "xxxxxxxx",
    "userRole": "Administrator"
  }
];

app.get('/users/:userId', (req, res) => {
  let uid = req.params.userId;
  const result = myJson.filter(
    usrObj => { 
      return (usrObj.userId == uid);
    }
  );
  res.send(result[0]);
})

app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

// Connect your App to Firebase
async function addBook(bookData) {
  const newBookRef = db.collection('Books').doc();
  const docRef = db.collection('Books').doc(newBookRef.id);
  // console.log(bookData);
  //bookData.map(elem => ({...elem, 'bookId': newBookRef.id }));
  let bookObj = { ...bookData, bookId: newBookRef.id };
  await docRef.set(bookObj);
  console.log('Book added!');
}

app.post('/api/insertBook', (req, res) => {
  const { bookTitle, bookDesc, bookAuthor, bookCategory, bookStock } = req.body;

  console.log('Received form data:', { bookTitle, bookDesc, bookAuthor, bookCategory, bookStock });

  // Here you can add your logic to handle the form data (e.g., save it to a database)
  addBook({ bookTitle, bookDesc, bookAuthor, bookCategory, bookStock });

  res.status(200).json({ message: 'Form submitted successfully.' });
})

async function fetchBooks() {
  const result = [];
  const booksRef = db.collection('Books');
  const snapshot = await booksRef.get();
  snapshot.forEach(doc => {
      result.push({
          id: doc.id,
          ...doc.data()
      });
  });

  return result;
}

app.get('/api/getBooks', (req, res) => {
  res.set('Content-Type', 'application/json');
  fetchBooks().then((jsonData) => {
    res.status(200).json(jsonData);
  }).catch((error) => {
    res.send(error);
  });
});

async function fetchOneBook(bookId) {
  console.log('Book ID:',bookId);
  const result = [];
  const booksRef = await db.collection('Books').where('bookId', '==', bookId).get();
  //const booksRef = db.collection('Books');
  //const snapshot = await booksRef.get();
  booksRef.forEach(doc => {
    //if (doc.id === bookId) {
      result.push({
          id: doc.id,
          ...doc.data()
      });
    //}
  });

  return result;
}

app.get('/api/getOneBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.set('Content-Type', 'application/json');
  fetchOneBook(bookId).then((jsonData) => {
    res.status(200).json(jsonData[0]);
  }).catch((error) => {
    res.send(error);
  });
});

async function updateBook(bookId, bookData) {
  const docRef = db.collection('Books').doc(bookId);
  await docRef.update(bookData);
  // console.log('Book updated!');
}

app.post('/api/updateBook', (req, res) => {
  const { bookId, bookTitle, bookDesc, bookAuthor, bookCategory, bookStock } = req.body;
  // console.log('Received form data:', { bookTitle, bookDesc, bookAuthor, bookCategory, bookStock });
  updateBook(bookId, { bookTitle, bookDesc, bookAuthor, bookCategory, bookStock });
  res.status(200).json({ message: 'Book updated successfully.' });
})

async function deleteBook(bookId) {
  const docRef = db.collection('Books').doc(bookId);
  await docRef.delete();
  // const docRef = await db.collection('Books')
  //                .where('bookId', '==', bookId)
  //                .get();
  // docRef.forEach((doc) => {
  //   doc.ref.delete();
  //   console.log(`Document with ID ${doc.id} deleted`);
  // });
  console.log('Book deleted!');
}

app.delete('/api/deleteBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  // console.log('Received form data:', { bookId });
  deleteBook(bookId);
  res.status(200).json({ message: 'Book deleted successfully.' });
})

async function checkUserLogin(loginData){
  //console.log('E-mail:',loginData.userEmail);
  const result = [];
  const userRef = db.collection('Users')
                   .where('email','==',loginData.userEmail)
                   .where('password','==',loginData.userPasswd);
  const docRef = await userRef.get();
  if(!docRef.empty){
    docRef.forEach(doc => {
      result.push({
       id: doc.id,
       userLoggedIn: true,
       ...doc.data()
      });
    });
  }else{
    result.push({
      userLoggedIn: false
    })
  }

  //console.log('Result:',result);
  return JSON.stringify(result);
}

app.post('/api/userLogin', (req, res) => {
  const { userEmail, userPasswd } = req.body;
  console.log('Received from data: ', { userEmail, userPasswd });
  const myForm = { userEmail, userPasswd };
  res.set('Content-type', 'application/json');
  checkUserLogin(myForm).then((jsonData) => {
      res.send(jsonData);
  }).catch((error) => {
      res.send(error);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
