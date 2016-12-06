var child_process =  require('child_process');
var {exec} = child_process;

var watchMode = process.argv.length === 3;

cmd(formatTscCmd("./", watchMode));
cmd(formatTscCmd("./samples/", watchMode));

function cmd(command, execOptions, options, callback) {
    options = options || {};

    console.log("CMD:", command);
    var newProcess = exec(command, execOptions, function(err, stdout, stderr) {
        if(callback){
            callback(err);
        }
    });

    if (!options.skipStdout) {
        newProcess.stdout.pipe(process.stdout);
    }

    newProcess.stderr.pipe(process.stderr);
    return newProcess;
}

function formatTscCmd(tsconfigFolder, watch){
    return `"./node_modules/.bin/tsc" -p ${tsconfigFolder} ${watch? "-w" : ""}`;
}
