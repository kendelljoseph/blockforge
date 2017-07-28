// Run the server
// --------------
const server  = require(`./server`);
const options = {
  serverName  : `Blockforge`,
  clientFolder: `${process.cwd()}/demos/`
};

server(options)
  .then((app) => {
    console.log(`Yay!`.rainbow);
  })
  .catch((error) => {
    console.log(`Oops, the server couldn't start!`.red);
    console.error(error);
  });
