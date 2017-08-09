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
    return new Promise((resolve, reject) => {
      const app    = new express();
      const server = http.createServer(app);
      
      resolve({app, server});
    });
  };
  
  // Configure the app
  // -----------------
  const configure = ({app, server}) => {
    return new Promise((resolve, reject) => {
      if(!app)          return reject(Error(serverMessages.noAppDefined));
      if(!clientFolder) return reject(Error(serverMessages.noClientFolderDefined));
      
      // App options
      // -----------
      app.use(morgan(`dev`));
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      
      // Routes
      // ------
      app.use(`/`,        express.static(clientFolder));
      app.use(`/library`, express.static("library"));
      
      resolve({app, server});
    });
  };
  
  // Recieve Traffic
  // ---------------
  const listenForTraffic = ({app, server}) => {
    return new Promise((resolve, reject) => {
      server.listen(port, function(){
        resolve({app, server});
      });
    });
  };
  
  // Celebrate
  // ---------
  const celebrate = ({app, server}) => {
    return new Promise((resolve, reject) => {
      serverMessages.serverOnline(serverName)
        .then((message) => {
          console.log(message);
        })
        .then(() => resolve({app, server}))
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
      .then(listenForTraffic)
      .then(celebrate)
      .then(resolve)
      .catch(reject);
  });
};