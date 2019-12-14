#! /usr/bin/env node
// const os = require("os")
// const ip = os.networkInterfaces().en0[1].address
// const options = process.argv.slice(2)
// if (options[0] === '-v') {
//     console.log('v1.0.0')
// } else {
//     console.log(`your ip is: ${ip}`)
// }
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');
program
  .version(require('../package').version);

program
  .usage('<command>');

program.command('create-vue-app')
  .description('create a new vue project')
  .alias('u')
  .action(() => {
    require('../commands/create-vue-app')
  });
program.command('generate')
  .description('create a file that contain basic context')
  .alias('gen')
  .action(() => {
    require('../commands/generate')
  })

program.parse(process.argv);

// if(!program.args.length){
//   program.help()
// }