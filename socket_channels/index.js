/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
// Socket Channels
// ---------------
module.exports = ({io}) => {
  return new Promise((resolve) => {
    io.on(`connection`, () => {
      console.info(`A socket connected`.cyan);
    });
    
    resolve();
  });
};