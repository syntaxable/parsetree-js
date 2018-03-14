const arrProto = Array.prototype;
const jsonifier = require('./utils/jsonifier.js');
const utils = require('seebigs-utils');

const methodFiles = utils.listFiles(__dirname + '/lib');

function InstanceProto () {
    let proto = {
        isParseTree: true,
        length: 0,
        indexOf: arrProto.indexOf,
        push: arrProto.push,
        pop: arrProto.pop,
        shift: arrProto.shift,
        unshift: arrProto.unshift,
        reverse: arrProto.reverse,
        slice: arrProto.slice,
        splice: arrProto.splice,
        toString: function () {
            return jsonifier(this);
        },
    };

    // add library methods
    methodFiles.forEach(function (filepath) {
        var filename = filepath.split('/').pop().split('.')[0];
        proto[filename] = require(filepath);
    });

    proto.forEach = proto.each;

    return proto;
}

module.exports = InstanceProto;
