const express = require('require');

let app = new express();

app.get('/', (req, res) => {
    console.log('hello world');
});

app.listen(3000, () =>{
    console.log('start');
})