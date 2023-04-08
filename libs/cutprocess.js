const cluster = require("cluster");
module.exports = (fn, delay) => {
    if (cluster.isMaster) {
        const fn = cluster.fork();
        setTimeout(_=>fn.process.kill(), delay);
    } else {
        fn;
    }
}
