'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @module Graph/helper
                                                                                                                                                                                                                                                                   * @description
                                                                                                                                                                                                                                                                   * Offers a series of methods that isolate logic of Graph component.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _Link = require('../Link/');

var _Link2 = _interopRequireDefault(_Link);

var _Node = require('../Node/');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build some Link properties based on given parameters.
 * @param  {string} source - the id of the source node (from).
 * @param  {string} target - the id of the target node (to).
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @return {Object} returns an object that aggregates all props for creating respective Link component instance.
 * @memberof Graph/helper
 */
function _buildLinkProps(source, target, nodes, links, config, linkCallbacks, someNodeHighlighted) {
    var x1 = nodes[source] && nodes[source].x || '0';
    var y1 = nodes[source] && nodes[source].y || '0';
    var x2 = nodes[target] && nodes[target].x || '0';
    var y2 = nodes[target] && nodes[target].y || '0';

    var opacity = config.link.opacity;

    if (someNodeHighlighted) {
        opacity = nodes[source].highlighted && nodes[target].highlighted ? config.link.opacity : config.highlightOpacity;
    }

    var stroke = config.link.color;

    if (nodes[source].highlighted && nodes[target].highlighted) {
        stroke = config.link.highlightColor === _const2.default.KEYWORDS.SAME ? config.link.color : config.link.highlightColor;
    }

    var linkValue = links[source][target] || links[target][source];

    var strokeWidth = config.link.strokeWidth;

    if (config.link.semanticStrokeWidth) {
        strokeWidth += linkValue * strokeWidth / 10;
    }

    return {
        source: source,
        target: target,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        strokeWidth: strokeWidth,
        stroke: stroke,
        className: _const2.default.LINK_CLASS_NAME,
        opacity: opacity,
        onClickLink: linkCallbacks.onClickLink
    };
}

/**
 * Build Link components for a given node.
 * @param  {string} nodeId - the id of the node to whom Link components will be generated.
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @return {Object[]} returns the generated array of Link components.
 * @memberof Graph/helper
 */
function _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted) {
    var linksComponents = [];

    if (links[nodeId]) {
        var adjacents = Object.keys(links[nodeId]);
        var n = adjacents.length;

        for (var j = 0; j < n; j++) {
            var source = nodeId;
            var target = adjacents[j];

            if (nodes[target]) {
                var key = '' + nodeId + _const2.default.COORDS_SEPARATOR + target;
                var props = _buildLinkProps(source, target, nodes, links, config, linkCallbacks, someNodeHighlighted);

                linksComponents.push(_react2.default.createElement(_Link2.default, _extends({ key: key }, props)));
            }
        }
    }

    return linksComponents;
}

/**
 * Build some Node properties based on given parameters.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} nodeCallbacks - same as {@link #buildGraph|nodeCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @return {Object} returns object that contain Link props ready to be feeded to the Link component.
 * @memberof Graph/helper
 */
function _buildNodeProps(node, config, nodeCallbacks, someNodeHighlighted) {
    var opacity = config.node.opacity;

    if (someNodeHighlighted) {
        opacity = node.highlighted ? config.node.opacity : config.highlightOpacity;
    }

    var fill = node.color || config.node.color;

    if (node.highlighted && config.node.highlightColor !== _const2.default.KEYWORDS.SAME) {
        fill = config.node.highlightColor;
    }

    var stroke = config.node.strokeColor;

    if (node.highlighted && config.node.highlightStrokeColor !== _const2.default.KEYWORDS.SAME) {
        stroke = config.node.highlightStrokeColor;
    }

    return {
        className: _const2.default.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: node && node.x || '0',
        cy: node && node.y || '0',
        fill: fill,
        fontSize: node.highlighted ? config.node.highlightFontSize : config.node.fontSize,
        fontWeight: node.highlighted ? config.node.highlightFontWeight : config.node.fontWeight,
        id: node.id,
        label: node[config.node.labelProperty] || node.id,
        onClickNode: nodeCallbacks.onClickNode,
        onMouseOverNode: nodeCallbacks.onMouseOverNode,
        onMouseOut: nodeCallbacks.onMouseOut,
        opacity: opacity,
        renderLabel: config.node.renderLabel,
        size: node.size || config.node.size,
        stroke: stroke,
        strokeWidth: node.highlighted ? config.node.highlightStrokeWidth : config.node.strokeWidth,
        type: node.type || config.node.symbolType
    };
}

/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object.<string, Object>} links - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * @param  {function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containg rd3g consumer defined configurations [LINK README] for the graph.
 * @param  {boolean} someNodeHighlighted - this value is true when some node on the graph is highlighted.
 * @return {Object} returns an object containg the generated nodes and links that form the graph. The result is
 * returned in a way that can be consumed by es6 **destructuring assignment**.
 * @memberof Graph/helper
 */
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, someNodeHighlighted) {
    var linksComponents = [];
    var nodesComponents = [];

    for (var nodeId in nodes) {
        var props = _buildNodeProps(nodes[nodeId], config, nodeCallbacks, someNodeHighlighted);

        nodesComponents.push(_react2.default.createElement(_Node2.default, _extends({ key: nodeId }, props)));

        linksComponents = linksComponents.concat(_buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted));
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

/**
 * Create d3 forceSimulation to be applied on the graph.<br/>
 * <a href="https://github.com/d3/d3-force#forceSimulation" target="_blank">https://github.com/d3/d3-force#forceSimulation</a><br/>
 * <a href="https://github.com/d3/d3-force#simulation_force" target="_blank">https://github.com/d3/d3-force#simulation_force</a><br/>
 * @param  {number} width - the width of the container area of the graph.
 * @param  {number} height - the height of the container area of the graph.
 * @return {Object} returns the simulation instance to be consumed.
 * @memberof Graph/helper
 */
function createForceSimulation(width, height) {
    var forceX = d3.forceX(width / 2).strength(_const2.default.FORCE_X);
    var forceY = d3.forceY(height / 2).strength(_const2.default.FORCE_Y);

    var simulation = d3.forceSimulation().force('charge', d3.forceManyBody().strength(_const2.default.FORCE_IDEAL_STRENGTH)).force('x', forceX).force('y', forceY);

    return simulation;
}

/**
 * Receives a matrix of the graph with the links source and target as concrete node instances and it transforms it
 * in a lightweight matrix containing only links with source and target being strings representative of some node id
 * and the respective link value (if non existant will default to 1).
 * @param  {Object[]} graphLinks - an array of all graph links but all the links contain the source and target nodes
 * objects.
 * @return {Object.<string, Object>} an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @memberof Graph/helper
 */
function initializeLinks(graphLinks) {
    var links = {};

    graphLinks.forEach(function (l) {
        var source = l.source.id || l.source;
        var target = l.target.id || l.target;

        if (!links[source]) {
            links[source] = {};
        }

        if (!links[target]) {
            links[target] = {};
        }

        // @TODO: If the graph is directed this should be adapted
        links[source][target] = links[target][source] = l.value || 1;
    });

    return links;
}

/**
 * Method that initialize graph nodes provided by rd3g consumer and adds additional default mandatory properties
 * that are optional for the user. Also it generates an index mapping, this maps nodes ids the their index in the array
 * of nodes. This is needed because d3 callbacks such as node click and link click return the index of the node.
 * @param  {Object[]} graphNodes - the array of nodes provided by the rd3g consumer.
 * @return {Object} returns the nodes ready to be used within rd3g with additional properties such as x, y
 * and highlighted values. Returns also the index mapping object of type Object.<number, string>.
 * @memberof Graph/helper
 */
function initializeNodes(graphNodes) {
    var nodes = {};
    var nodeIndexMapping = {};
    var index = 0;

    graphNodes.forEach(function (n) {
        n['highlighted'] = false;
        if (!n.hasOwnProperty('x')) n['x'] = 0;
        if (!n.hasOwnProperty('y')) n['y'] = 0;

        nodes[n.id.toString()] = n;
        nodeIndexMapping[index] = n.id;

        index++;
    });

    return {
        nodes: nodes,
        nodeIndexMapping: nodeIndexMapping
    };
}

exports.default = {
    buildGraph: buildGraph,
    createForceSimulation: createForceSimulation,
    initializeLinks: initializeLinks,
    initializeNodes: initializeNodes
};