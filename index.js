const express = require('express')
const { engine } = require('express-handlebars');
require('dotenv').config();
const Segment = require('./segmentation')
const seg = new Segment("", {});
const routes = require('./routes');

const app = express();

app.use(express.json())

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {title: "Helllo", eventSource: {url:process.env.WEBHOOK_SDK}});
});
app.get('/list', (req, res) => {
    seg.identify("thisisanewuser", {
        name: 'New user',
        email: 'user23@gmail.com',
        message: `Getting the list`
    })
    res.send("<h1>I am a list.</h1>")
});

// mounting the routes
app.use('/api', routes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
});

// A node http.Server is returned, with this application (which is a Function) as its callback. If you wish to create both an HTTP and HTTPS server you may do so with the "http" and "https" modules as shown here:


process.on('SIGTERM', ()=>{
    // seg.track("12345", "segment-details")
})