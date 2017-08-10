/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
// Run the server
// --------------
const server  = require(`./server`);
const options = {
  serverName  : `Blockforge`,
  clientFolder: `${process.cwd()}/demos/`
};

server(options)
  .then(() => {
    console.info(`Yay!`.rainbow);
  })
  .catch((error) => {
    console.info(`Oops, the server couldn't start!`.red);
    console.error(error);
  });
