#!/usr/bin/env node
const { exec } = require('child_process');

exec('node src/index.js', (err) => {
  if (err) {
    console.log('创建失败: ', err );
  }

  console.log('vscode任务创建成功～～～ ' );
});