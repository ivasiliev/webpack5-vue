const path = require('path');

module.exports = {

    // Source files
    src: path.resolve(__dirname, '../src'),
    src_rel: '../src',

    // Production build files
    dist: path.resolve(__dirname, '../dist'),
    dist_rel: '../dist',

    // Static files that get copied to build folder
    static: path.resolve(__dirname, '../static'),
    static_rel: '../static',

    distResolve: function (folder) {
        return path.resolve(this.dist, folder);
    }
};
