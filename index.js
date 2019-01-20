const app = require('express')();
const bodyParser = require('body-parser');

const port = 3333;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body;

  console.log(`Problem name: ${data.name}`);
  console.log(`Problem group: ${data.group}`);
  console.log('Full body:');
  console.log(JSON.stringify(data, null, 4));
  res.sendStatus(200);

  var i, final = "";
  for (i = 0; i < data.tests.length; i++) {
    final += "input\n";
    final += data.tests[i].input;
    final += "output\n";
    final += data.tests[i].output;
  }

  const fs = require('fs');
  fs.writeFile("/tmp/algo-samples", final, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(`The Problem {{${data.name}}} is saved.\n`);
  });

});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening on port ${port}`);
});
