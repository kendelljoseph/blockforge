module.exports = {
  noAppDefined         : `There is no app defined.`,
  noClientFolderDefined: `There is no client folder defined`,
  serverOnline         : (name = `unnamed`) => {
    return Promise.resolve(`The ${name} server is running now.`.green);
  },
  genericError         : `Something terrible went wrong...`
};