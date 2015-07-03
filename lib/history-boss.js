'use strict'
var util = require('util'),
    child_process = require('child_process')

//------------------------------------------------------------------------------
var HistoryBoss = function() {}

//------------------------------------------------------------------------------
HistoryBoss.prototype.getShell = function(callback){
  var exec = child_process.exec
  var command = 'echo $SHELL'
  exec(command, function(error, stdout, stderr) {
      callback(error, stdout, stderr)
  })
}

//------------------------------------------------------------------------------
HistoryBoss.prototype.search = function(term, callback) {
  var exec = child_process.exec
  var command = util.format('cat ~/.zsh_history | grep %s | awk -F";" \'{for (i=2; i<NF; i++) printf $i " "; print $NF}\' | tail -n 50', term)
  exec(command, function(error, stdout, stderr) {
      if (error || stderr) {
          console.log('exec error: ' + error)
      }
      var commandList = stdout.split('\n')
      callback(error, commandList)
  })
}

//------------------------------------------------------------------------------
HistoryBoss.prototype.exec = function(command) {
  var exec = child_process.exec

  // Run node with the child.js file as an argument
  var child = exec(command)
  process.stdin.pipe(child.stdin)

  // Listen for any response from the child:
  child.stdout.pipe(process.stdout)

  // Listen for any errors:
  child.stderr.pipe(process.stderr)
}

//------------------------------------------------------------------------------
module.exports = new HistoryBoss()
