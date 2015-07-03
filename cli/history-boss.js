'use strict';

var program = require('commander'),
  inquirer = require('inquirer'),
  _ = require('underscore'),
  hb = require('../lib/history-boss'),
  term

program
  .version('0.0.1').parse(process.argv);

term = _.first(program.args);

hb.search(term, function(err, array) {
  var questions = [{
      type: "list",
      name: "command",
      message: "Result",
      default: false,
      choices: array
  }];

  inquirer.prompt(questions, function(options) {
      hb.exec(options.command)
  });
});
