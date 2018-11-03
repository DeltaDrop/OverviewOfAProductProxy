const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


app.get('/buy/:prod_name/overview', (req, res) => {
  const url = `http://localhost:3003${req.url}`
  console.log(url);
   axios.get(url)
    .then(({data}) => {
      res.send(data);
      // console.log(data);
    })
    .catch((err) => {
      console.error('there is an error');
    })
})

app.get('/api/:prod_name', (req, res) => {
  console.log('api prod ', req.url);
  const url = `http://localhost:3001${req.url}`
  axios.get(url)
    .then(({data}) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    })
}) 

app.get('/api/categories/:prod_name', (req, res) => {
  const url = `http://localhost:3001${req.url}`
  axios.get(url)
    .then(({data}) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    })
}) 

app.post('/api/drop', (req, res) => {
  const url = `http://localhost:3001${req.url}`
  console.log('params: ', req.params);
  console.log('query:', req.query);
  console.log('body: ', req.body);
  axios.post(url, req.body)
    .then(({data}) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    })
}) 


app.get('/buy/:productname/reviews', (req, res) => {
  const url = `http://localhost:3002${req.url}`
  axios.get(url)
    .then(({data}) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    })
}) 

app.get('/productImages/:product', (req, res) => {
  let product = req.url.split('/')[2];
  console.log('product galler data')
  console.log(product);
  axios.get('http://ec2-54-209-75-211.compute-1.amazonaws.com/productImages/keyboard')
  .then((response) => {
    console.log(response.data)
    res.send(response.data)
  }).catch(err => {
    res.status(500).send;
  })
 })

app.get('/buy/*', (req, res) => {
  console.log('hello!');
  res.sendFile(path.join(__dirname, 'public/index.html'))
})