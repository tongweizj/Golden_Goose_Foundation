var process = require('child_process');
//直接调用命令
exports.world = function() {
    console.log('hello world!')
}

exports.cool = function() {
    console.log('cool man!')
}

exports.update = function (){
	process.exec('cd /Volumes/Files/workspace/gitYoese/SP_GGF/spider/ && node main.js',
	  function (error, stdout, stderr) {
        console.log('exec stdout: ' + stdout);
        console.log('exec stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}
//调用执行文件
// exports.openApp = function(){
// 	process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
// 	  function (error,stdout,stderr) {
// 		if (error !== null) {
// 		  console.log('exec error: ' + error);
// 		}
// 	});
// }

