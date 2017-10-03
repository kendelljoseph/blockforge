/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
// Socket Channels
// ---------------
module.exports = ({io}) => {
  return new Promise((resolve) => {
    let connectedClients = 0;
    io.on(`connection`, (socket) => {
      connectedClients++;

      console.info(`A client connected!`.rainbow);
      receive.emit(`viewers`, connectedClients);

      // Listen for disconnection events
      // -------------------------------
      socket.on(`disconnect`, () => {
        connectedClients--;
        console.info(`A client left!`.red);
        receive.emit(`viewers`, connectedClients);
      });
    });



    // Listen for traffic on the receiving channel
    // -------------------------------------------
    const receive = io
      .of(`/receive`)
      .on('connection', function (socket) {
        receive.emit(`viewers`, connectedClients);
        console.info(`A socket that recieves blocks connected`.cyan);

        // Return the viewers when requested
        // ---------------------------------
        socket.on(`viewers`, () => {
          console.log('got a viewer request')
          receive.emit(`viewers`, connectedClients);
        });
      });

    // Listen for traffic on the sending channel
    // -----------------------------------------
    io.of(`/send`)
      .on('connection', function (socket) {
        console.info(`A socket that sends blocks connected`.yellow);
        socket.on(`blocks`, function (data) {
          receive.emit(`viewers`, connectedClients);
          receive.emit(`blocks`, data);
          console.info(`sent ${data.length} lines to ${Object.keys(io.sockets.connected).length} clients`.yellow);
        });
      });

    resolve();
  });
};