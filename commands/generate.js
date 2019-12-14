const inquirer = require('inquirer');
const program = require('commander');
const fs = require('fs');
const ora = require('ora');
const [fileType, fileName] =  program.parse(process.argv).args;
const getTpl = require('../templates/tpl-generate');
const supplyFileType = ['vue'];
if (!fileType) {
  program.help();
  throw new Error('必须输入模板类型');
}
if (supplyFileType.indexOf(fileType) < 0) {
  program.help();
  throw new Error('暂不支持该模板类型');
}
if (!fileName) {
  program.help();
  throw new Error('必须输入文件名');
}
const checkFile = function() {
  return new Promise((resolve, reject) => {
    fs.access('./' + fileName + '.vue', function(err) {
      if (!err) {
        inquirer.prompt([{
          type: 'confirm',
          name: 'sure',
          message: '当前文件已经存在，是否覆盖'
        }]).then(function({sure}){
          if (sure) {
            resolve();
          } else {
            reject(new Error(''));
          }
        });
      } else {
        resolve();
      }
    });
  });
};
const question = [
  {
    type: 'input',
    name: 'componentName',
    message: '组件名称（name属性的值）',
    default: 'comp' + new Date().getTime(),
    filter (val) {
      return val.trim();
    },
    validate (val) {
      const validate = (val.trim().split(" ")).length === 1;
      return validate || 'Project name is not allowed to have spaces ';
    },
    transformer (val) {
      return val;
    }
  }
]
checkFile().then(function() {
  module.exports = inquirer.prompt(question).then(({componentName}) => {
    const spinner = ora(`generating ${fileName}.${fileType} file please wait ...`);
    spinner.start();

    fs.writeFile('./' + fileName + '.' + fileType, getTpl(fileType, componentName), 'utf8', function(error) {
      spinner.stop();
      if (!error) {
        console.log('success');
      }
    });
  });
}).catch(() => {
  module.exports = function() {};
});
