const AstLayer = require('./ast_layer.js');
const InstanceProto = require('./instance_proto.js');

function $AST (code) {
    if (!(this instanceof $AST)) { throw new Error('Use new $AST()'); }

    function $init (selector, context) {
        this.zero();
        return this.concat(this.find(selector, context));
    }

    function $ (selector, context) {
        return new $init(selector, context);
    }

    // add AstLayer to $ root object
    Object.assign($, new AstLayer(code));

    // add lib methods onto all $() instances
    $init.prototype = new InstanceProto();

    // give $() instances access to AstLayer
    $init.prototype.$ = $;

    // identify ourselves
    $.isParseTree = true;

    return $;
}

$AST.isParseTree = true;

module.exports = $AST;
