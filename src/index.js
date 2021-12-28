/* eslint-disable no-template-curly-in-string */
const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.which('node')) {
  shell.echo('Sorry, this script requires node');
  shell.exit(1);
}

const fs = require('fs');

const PATH = require('path');

const UTF8 = 'utf8';

/**
 * 递归创建目录
 */
function makeDirs(path) {
  if (fs.existsSync(path)) {
    return true;
  }
  // eslint-disable-next-line no-unused-vars
  if (makeDirs(PATH.dirname(path))) {
    fs.mkdirSync(path);
    return true;
  }
}

const fileContent = {
  version: '2.0.0',
  tasks: [
    {
      label: 'git-checkout',
      type: 'shell',
      command: 'git',
      args: ['checkout', '${input:branch}'],
      problemMatcher: [],
    },
    {
      label: 'git-branch',
      type: 'shell',
      command: 'git',
      args: ['branch'],
      problemMatcher: [],
    },
    {
      label: 'git-merge',
      type: 'shell',
      command: 'git',
      args: ['merge', '${input:branchName}'],
      problemMatcher: [],
    },
    {
      label: 'taskMerge',
      type: 'shell',
      command: 'git',
      dependsOn: ['git-checkout', 'git-branch', 'git-merge'],
      dependsOrder: 'sequence',
      problemMatcher: [],
    },
  ],
  inputs: [
    {
      id: 'branch',
      type: 'pickString',
      options: ['develop', 'master'],
      description: '请选择分支',
    },
    {
      id: 'branchName',
      type: 'promptString',
      description: '输入分支名',
      default: 'master',
    },
  ],
};
const fileName = 'tasks.json';
const filepath = './.vscode/';

const fileFullPath = filepath + fileName;

makeDirs(filepath);

fs.writeFileSync(fileFullPath, JSON.stringify(fileContent), UTF8);
