/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
// Socket Channels
// ---------------
module.exports = ({io}) => {
  return new Promise((resolve) => {
    io.on(`connection`, () => {
      console.info(`A socket connected`.cyan);
    });

    // Listen for traffic on the receiving channel
    // -------------------------------------------
    const receive = io
      .of(`/receive`)
      .on('connection', function (socket) {
        console.info(`A socket that recieves blocks connected`.cyan);
      });

    // Listen for traffic on the sending channel
    // -----------------------------------------
    const send = io
      .of(`/send`)
      .on('connection', function (socket) {
        console.info(`A socket that sends blocks connected`.yellow)
        socket.on(`blocks`, function (data) {
          console.info(`recieved block lines,`.cyan, data.length);
          receive.emit(`blocks`, data);
        });
      });



    resolve();
  });
};