
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

// const checkAuth = require('./utils/checkAuth.js');

require('./data/reddit-db');

const app = express();

const PORT = process.env.process || 3000;

const indexRouter = require('./controllers/index.js');
const postRouter = require('./controllers/posts.js');
// const subredditRouter = require('./controllers/subreddits.js');
// const commentRouter = require('./controllers/comments.js');
// const authRouter = require('./controllers/auth.js');
// const userRouter = require('./controllers/users.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(express.static('public'));
app.use(cookieParser());

app.use(checkAuth);

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/r', subredditRouter);
app.use('/posts', commentRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, function() {
    console.log('Express server listening on port: ', PORT);
});
