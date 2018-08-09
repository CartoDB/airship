const path = require('path');
const fs = require('fs');


const icons = fs.readdirSync(path.join(__dirname, '../dist/icons')).map(file => {
  const iconName = file.replace('.svg', '');
  return `
    <div class="icon-wrapper">
      <i class="as-icon-${iconName}"></i>
      <p class="as-body">${iconName}</p>
    </div>
  `;
})


const template = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Airship icons</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@carto/airship-style/dist/airship.css">
  <link rel="stylesheet" href="../dist/icons.css">
  <style>
  main {
    transition: all .3s;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

  }

  .icon-wrapper {
    flex: 0 0 60px;
    margin: 15px 30px;
    text-align: center;
  }

  i {
    color: #1785FB;
    font-size: 2em;
  }
  </style>
</head>

<body>
  <h1 style="text-align: center;" class="as-jumbo">Airship Icons</h1>
  <br>
  <main>
    ${icons.join('\n')}
  </main>
</body>

</html>

`;


fs.writeFileSync(path.join(__dirname, '../examples/index.html'), template);
