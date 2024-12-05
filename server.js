const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require ('path')
const db = require('./config/db'); // Your database connection pool

const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')))
//app.use(express.urlencoded({extended:true}))


// Import routes
const authRoutes = require('./auth');

// Use the imported routes with a base path
app.use('/auth', authRoutes);

/*
// Test the database connection
db.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release(); // Release connection back to the pool
    })
    .catch(error => {
        console.error('Error connecting to MySQL database:', error);
    });
    */

// Configure session store using the MySQL pool
const sessionStore = new MySQLStore({}, db);

app.use(session({
    key: 'user_session',
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 } // 1 day
}));






/*
// Define a root route to handle GET requests to "/"
//routes

// Example route to set session
app.post('/login', (req, res) => {
    // Assume user is authenticated
    req.session.userId = req.body.userId; // Store user ID in session
    res.send('Logged in');
});

// Example route to get session data
app.get('/profile', (req, res) => {
    if (req.session.userId) {
        res.send(`Welcome, user ${req.session.userId}`);
    } else {
    } else {
        res.status(401).send('Unauthorized');
    }
});
*/


//protected routes function
const isAuthenticated = (request,response,next) => {
    if(request.session.user){
        return next();
    } else {
        response.send('You have not logged in.')
    }
}
 

// set-up routes
app.get('/',(request,response) => {
    if(request.session.views){
        request.session.views++;
        response.send(`<p>Current views: ${request.session.views}</p>`)
    }else {
        request.session.views = 1;
        request.session.user = {name: 'Francis',email:'muirurif94@gmail.com',country:'Kenya'}
        response.send('Welcome to basic session management.')

    }
});


app.get('/login',(request,response) => { 
    request.session.user = {name:'Francis', email:'muirurif94@gmail.com', country:'Kenya'}
    response.send('Successfully logged in.')
})


app.get('/profile',isAuthenticated, (request,response) => {
    response.send('Welcome to your profile');
})


app.get('/dashboard', (request,response) => {
    if(request.session.user){
        const user = request.session.user;
        response.send(`<p>User: ${user.name}-${user.email} from ${user.country} </p>`)
    }else {
        response.send('No user info found')
    }
} )


app.get('/destroy',(request,response) => {
    request.session.destroy((err) => {
        if (err){
            console.log('Error destroying session:',err)
        }
    })
})

/*
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','index.html'))
})
app.get('/create',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','employer-dashboard.html'))
})

*/
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





