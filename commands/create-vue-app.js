const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');

const option =  program.parse(process.argv).args[0];
const question = [
  {
    type: 'list',
    message: '选择项目类型:',
    name: 'projectType',
    choices: [
      { key: "1", name: "管理后台", value: "ms" },
      { key: "2", name: "移动应用", value: "mobile" }
    ],
    filter: function (val) { // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: typeof option === 'string' ? option : 'template-h5',
    filter (val) {
      return val.trim()
    },
    validate (val) {
      const validate = (val.trim().split(" ")).length === 1;
      return validate || 'Project name is not allowed to have spaces ';
    },
    transformer (val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'Vue project',
    validate () {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'author',
    message: 'Project author',
    default: 'xxxxxxx@qq.com'
  }
];

module.exports = inquirer.prompt(question).then(({projectType, name, description, author}) => {
  // console.log('你选择了' + JSON.stringify(projectType));
  const gitPlace = require('../templates')[projectType].path;
  const projectName = name;
  const spinner = ora('Downloading please wait...');

  spinner.start();
  download(`${gitPlace}`, `./${projectName}`, (err) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit()
    }

    fs.readFile(`./${projectName}/package.json`, 'utf8', function (err, data) {
      if(err) {
        spinner.stop();
        console.error(err);
        return;
      }

      const packageJson = JSON.parse(data);
      packageJson.name = name;
      packageJson.description = description;
      packageJson.author = author;

      fs.writeFile(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', function (err) {
        if(err) {
          spinner.stop();
          console.error(err);
        } else {
          spinner.stop();
          console.log(chalk.green('project init successfully!'))
          console.log(`
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow('npm install')}
            ${chalk.yellow('npm run serve')}
          `);
        }
      });
    });
  })
});