// Socket Channels
// ---------------
module.exports = ({app, server, io}) => {
  return new Promise((resolve) => {
    io.on('connection', function(socket){
      console.log("A socket connected".cyan);
    });
    
    resolve();
  });
};