const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
const express = require('express');
const app = express();


//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



// Mock database
let tweets = [
    {
        id: uuid(),
        username: 'John Doe',
        tweet: 'lorem ipsum dolor set'

    },
    {
        id: uuid(),
        username: 'Jane Doe',
        tweet: 'lorem ipsum dolor set'

    },
    {
        id: uuid(),
        username: 'Mr. Smith',
        tweet: 'lorem ipsum dolor set'

    },
    {
        id: uuid(),
        username: 'Ms. Smith',
        tweet: 'lorem ipsum dolor set'

    }

]

// Index - renders multiple tweets
// ********************************

app.get('/tweets', (req, res) => {
    res.render('tweets/index', { tweets })
})

// New - renders a form 
// *********************************
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new');
})

// Create - create a new tweet
app.post('/tweets', (req, res) => {
    const {username, tweet } = req.body;
    // push username and tweet
    tweets.push({username, tweet, id: uuid()})
    // when you make a new tweet/redirect to /tweets
    res.redirect('/tweets')
})

// Show - details about one particular tweet
// ****************************
app.get('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/details', { tweet })
})

// Edit - renders a form to edit a tweet
// *****************************
app.get('/tweets/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/edit', { tweet })
})

// UPDATE - updates a particular comment
// *******************************************
app.patch('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const foundTweet = tweets.find(t => t.id === id);

    //get new text from req.body
    const newTweetText = req.body.tweet;
    //update the comment with the data from req.body:
    foundTweet.tweet = newTweetText;
    //redirect back to index (or wherever you want)
    res.redirect('/tweets')
})

// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/tweets/:id', (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter(t => t.id !== id);
    res.redirect('/tweets');
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})