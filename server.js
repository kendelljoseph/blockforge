/*eslint no-unused-vars: [0] no-console: ["error", { allow: ["info", "error"] }]*/
// The Server
// ----------

// Dependencies
// ------------
const dependencies = require(`${process.cwd()}/server_dependencies`);
const colors       = dependencies.colors;
const express      = dependencies.express;
const bodyParser   = dependencies.bodyParser;
const morgan       = dependencies.morgan;
const http         = dependencies.http;
const socketIo     = dependencies.socketIo;

// Middleware
// ----------
const middleware = require(`${process.cwd()}/middleware`);

// Socket Channels
// ---------------
const socketChannels = require(`${process.cwd()}/socket_channels`);

// Messages
// --------
const serverMessages = require(`${process.cwd()}/server_messages`);

module.exports = (options = {}) => {
  // Get options
  // -----------
  const serverName   = options.serverName;
  const clientFolder = options.clientFolder;
  const port         = options.port || process.env.PORT || 8080;

  // Instantiate the app
  // -------------------
  const instantiate = () => {
    return new Promise((resolve) => {
      const app    = new express();
      const server = http.createServer(app);
      const io     = socketIo.listen(server);

      resolve({app, server, io});
    });
  };

  // Configure the app
  // -----------------
  const configure = ({app, server, io}) => {
    return new Promise((resolve, reject) => {
      if(!app)          return reject(Error(serverMessages.noAppDefined));
      if(!clientFolder) return reject(Error(serverMessages.noClientFolderDefined));

      // App options
      // -----------
      //app.use(morgan(`tiny`));
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());

      // Middleware
      // ----------
      app.use(middleware(app));

      // Routes
      // ------
      app.use(`/`,        express.static(clientFolder));
      app.use(`/library`, express.static(`library`));
      app.use(`/media`,   express.static(`media`));
      app.use(`/style-guide`, express.static(`style_guide`));

      resolve({app, server, io});
    });
  };

  // Recieve socket traffic
  // ----------------------
  const listenForSocketTraffic = ({app, server, io}) => {
    return new Promise((resolve, reject) => {
      socketChannels({app, server, io})
        .then(() => {
          return resolve({app, server, io});
        })
        .catch(reject);
    });
  };

  // Recieve Traffic
  // ---------------
  const listenForTraffic = ({app, server, io}) => {
    return new Promise((resolve) => {
      server.listen(port, function(){
        resolve({app, server, io});
      });
    });
  };

  // Celebrate
  // ---------
  const celebrate = ({app, server, io}) => {
    return new Promise((resolve, reject) => {
      serverMessages.serverOnline(serverName)
        .then((message) => {
          console.info(message);
        })
        .then(() => resolve({app, server, io}))
        .catch(() => {
          reject(serverMessages.genericError);
        });
    });
  };

  // Do all the things
  // -----------------
  return new Promise((resolve, reject) => {
    return instantiate()
      .then(configure)
      .then(listenForSocketTraffic)
      .then(listenForTraffic)
      .then(celebrate)
      .then(resolve)
      .catch(reject);
  });
};