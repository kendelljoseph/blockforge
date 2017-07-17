// Run the server
// --------------
const server  = require(`./server`);
const options = {
  name: `Blockforge`
};

server(options)
  .then((app) => {
    console.log(`Yay!`.rainbow);
  });
