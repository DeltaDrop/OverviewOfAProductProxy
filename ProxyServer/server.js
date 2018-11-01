const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(express.static(path.join(__dirname, 'public')));

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