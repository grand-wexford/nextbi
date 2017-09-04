'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _err = require('../../err');

var _err2 = _interopRequireDefault(_err);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Graph component is the main component for react-d3-graph components, its interface allows its user
 * to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
 * The code for the live example (https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)
 * can be consulted here https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js
 * @example
 * import { Graph } from 'react-d3-graph';
 *
 * // Graph payload (with minimalist structure)
 * const data = {
 *     nodes: [
 *       {id: 'Harry'},
 *       {id: 'Sally'},
 *       {id: 'Alice'}
 *     ],
 *     links: [
 *         {source: 'Harry', target: 'Sally'},
 *         {source: 'Harry', target: 'Alice'},
 *     ]
 * };
 *
 * // The graph configuration
 * const myConfig = {
 *     highlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 *
 * // Graph event callbacks
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node', nodeId);
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert('Mouse out node', nodeId);
 * };
 *
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickNode={onClickNode}
 *      onClickLink={onClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode} />
 */
var Graph = function (_React$Component) {
    _inherits(Graph, _React$Component);

    _createClass(Graph, [{
        key: '_validateGraphData',


        /**
         * Some integraty validations on links and nodes structure.
         * @param  {Object} data
         */


        /**
         * This method resets all nodes fixed positions by deleting the properties fx (fixed x)
         * and fy (fixed y). Next a simulation is triggered in order to force nodes to go back
         * to their original positions (or at least new positions according to the d3 force parameters).
         */


        /**
         * Handles mouse over node event.
         * @param  {number} index - index of the mouse hovered node.
         * @return {undefined}
         */


        /**
         * Handler for 'zoom' event within zoom config.
         * @return {Object} returns the transformed elements within the svg graph area.
         */


        /**
         * The tick function simply calls React set state in order to update component and render nodes
         * along time as d3 calculates new node positioning.
         */


        /**
         * Handles d3 drag 'start' event.
         */

        /**
         * Handles d3 drag 'end' event.
         */
        value: function _validateGraphData(data) {
            var _this2 = this;

            data.links.forEach(function (l) {
                if (!data.nodes.find(function (n) {
                    return n.id === l.source;
                })) {
                    _utils2.default.throwErr(_this2.constructor.name, _err2.default.INVALID_LINKS + ' - ' + l.source + ' is not a valid node id');
                }
                if (!data.nodes.find(function (n) {
                    return n.id === l.target;
                })) {
                    _utils2.default.throwErr(_this2.constructor.name, _err2.default.INVALID_LINKS + ' - ' + l.target + ' is not a valid node id');
                }
            });
        }

        /**
         * Incapsulates common procedures to initialize graph.
         * @param  {Object} data
         * @param {Array.<Object>} data.nodes - nodes of the graph to be created.
         * @param {Array.<Object>} data.links - links that connect data.nodes.
         * @returns {Object}
         */


        /**
         * Calls d3 simulation.restart().<br/>
         * {@link https://github.com/d3/d3-force#simulation_restart}
         */


        /**
        * Calls d3 simulation.stop().<br/>
        * {@link https://github.com/d3/d3-force#simulation_stop}
        */


        /**
         * Handles mouse out node event.
         * @param  {number} index - index of the mouse hovered node.
         * @return {undefined}
         */


        /**
         * Configures zoom upon graph with default or user provided values.<br/>
         * {@link https://github.com/d3/d3-zoom#zoom}
         * @return {undefined}
         */


        /**
         * Sets nodes and links highlighted value.
         * @param  {number} index - the index of the node to highlight (and its adjacent).
         * @param  {boolean} value - the highlight value to be set (true or false).
         * @return {undefined}
         */


        /**
         * Handles d3 'drag' event.
         * @param  {Object} _ - event.
         * @param  {number} index - index of the node that is being dragged.
         * @return {undefined}
         */

    }, {
        key: '_initializeGraphState',
        value: function _initializeGraphState(data) {
            var _this3 = this;

            this._validateGraphData(data);

            var graph = void 0;

            if (this.state && this.state.nodes && this.state.links && this.state.nodeIndexMapping) {
                // absorve existent positining
                graph = {
                    nodes: data.nodes.map(function (n) {
                        return Object.assign({}, n, _this3.state.nodes[n.id]);
                    }),
                    links: {}
                };
            } else {
                graph = {
                    nodes: data.nodes.map(function (n) {
                        return Object.assign({}, n);
                    }),
                    links: {}
                };
            }

            graph.links = data.links.map(function (l) {
                return Object.assign({}, l);
            });

            var config = Object.assign({}, _utils2.default.merge(_config2.default, this.props.config || {}));

            var _GraphHelper$initiali = _helper2.default.initializeNodes(graph.nodes),
                nodes = _GraphHelper$initiali.nodes,
                nodeIndexMapping = _GraphHelper$initiali.nodeIndexMapping;

            var links = _helper2.default.initializeLinks(graph.links); // Matrix of graph connections
            var _graph = graph,
                d3Nodes = _graph.nodes,
                d3Links = _graph.links;

            var id = this.props.id.replace(/ /g, '_');
            var simulation = _helper2.default.createForceSimulation(config.width, config.height);

            return {
                id: id,
                config: config,
                nodeIndexMapping: nodeIndexMapping,
                links: links,
                d3Links: d3Links,
                nodes: nodes,
                d3Nodes: d3Nodes,
                nodeHighlighted: false,
                simulation: simulation,
                newGraphElements: false,
                configUpdated: false
            };
        }

        /**
         * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
         */

    }, {
        key: '_graphForcesConfig',
        value: function _graphForcesConfig() {
            this.state.simulation.nodes(this.state.d3Nodes).on('tick', this._tick);

            var forceLink = d3.forceLink(this.state.d3Links).id(function (l) {
                return l.id;
            }).distance(_const2.default.LINK_IDEAL_DISTANCE).strength(1);

            this.state.simulation.force(_const2.default.LINK_CLASS_NAME, forceLink);

            var customNodeDrag = d3.drag().on('start', this._onDragStart).on('drag', this._onDragMove).on('end', this._onDragEnd);

            d3.select('#' + this.state.id + '-' + _const2.default.GRAPH_WRAPPER_ID).selectAll('.node').call(customNodeDrag);
        }
    }]);

    function Graph(props) {
        _classCallCheck(this, Graph);

        var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this, props));

        _this._onDragEnd = function () {
            return !_this.state.config.staticGraph && _this.state.config.automaticRearrangeAfterDropNode && _this.state.simulation.alphaTarget(0.05).restart();
        };

        _this._onDragMove = function (_, index) {
            if (!_this.state.config.staticGraph) {
                // This is where d3 and react bind
                var draggedNode = _this.state.nodes[_this.state.nodeIndexMapping[index]];

                draggedNode.x += d3.event.dx;
                draggedNode.y += d3.event.dy;

                // Set nodes fixing coords fx and fy
                draggedNode['fx'] = draggedNode.x;
                draggedNode['fy'] = draggedNode.y;

                _this._tick();
            }
        };

        _this._onDragStart = function () {
            return _this.pauseSimulation();
        };

        _this._setHighlighted = function (index, value) {
            _this.state.nodeHighlighted = value;
            _this.state.nodes[index].highlighted = value;

            if (_this.state.links[index]) {
                Object.keys(_this.state.links[index]).forEach(function (k) {
                    _this.state.nodes[k].highlighted = value;
                });
            }

            _this._tick();
        };

        _this._tick = function () {
            return _this.setState(_this.state || {});
        };

        _this._zoomConfig = function () {
            return d3.select('#' + _this.state.id + '-' + _const2.default.GRAPH_WRAPPER_ID).call(d3.zoom().scaleExtent([_this.state.config.minZoom, _this.state.config.maxZoom]).on('zoom', _this._zoomed));
        };

        _this._zoomed = function () {
            return d3.selectAll('#' + _this.state.id + '-' + _const2.default.GRAPH_CONTAINER_ID).attr('transform', d3.event.transform);
        };

        _this.onMouseOutNode = function (index) {
            _this.props.onMouseOutNode && _this.props.onMouseOutNode(index);

            _this.state.config.highlightBehavior && _this._setHighlighted(index, false);
        };

        _this.onMouseOverNode = function (index) {
            _this.props.onMouseOverNode && _this.props.onMouseOverNode(index);

            _this.state.config.highlightBehavior && _this._setHighlighted(index, true);
        };

        _this.pauseSimulation = function () {
            return !_this.state.config.staticGraph && _this.state.simulation.stop();
        };

        _this.resetNodesPositions = function () {
            if (!_this.state.config.staticGraph) {
                for (var nodeId in _this.state.nodes) {
                    var node = _this.state.nodes[nodeId];

                    if (node.fx && node.fy) {
                        Reflect.deleteProperty(node, 'fx');
                        Reflect.deleteProperty(node, 'fy');
                    }
                }

                // @TODO: hardcoded alpha target
                _this.state.simulation.alphaTarget(0.08).restart();

                _this._tick();
            }
        };

        _this.restartSimulation = function () {
            return !_this.state.config.staticGraph && _this.state.simulation.restart();
        };

        if (!_this.props.id) {
            _utils2.default.throwErr(_this.constructor.name, _err2.default.GRAPH_NO_ID_PROP);
        }

        _this.state = _this._initializeGraphState(_this.props.data);
        return _this;
    }

    _createClass(Graph, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newGraphElements = nextProps.data.nodes.length !== this.state.d3Nodes.length || nextProps.data.links.length !== this.state.d3Links.length;

            if (newGraphElements && nextProps.config.staticGraph) {
                _utils2.default.throwErr(this.constructor.name, _err2.default.STATIC_GRAPH_DATA_UPDATE);
            }

            var configUpdated = !_utils2.default.isDeepEqual(nextProps.config, this.state.config);
            var state = newGraphElements ? this._initializeGraphState(nextProps.data) : this.state;
            var config = _utils2.default.merge(_config2.default, nextProps.config || {});

            // In order to properly update graph data we need to pause eventual d3 ongoing animations
            newGraphElements && this.pauseSimulation();

            this.setState(_extends({}, state, {
                config: config,
                newGraphElements: newGraphElements,
                configUpdated: configUpdated
            }));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // If the property staticGraph was activated we want to stop possible ongoing simulation
            this.state.config.staticGraph && this.state.simulation.stop();

            if (!this.state.config.staticGraph && this.state.newGraphElements) {
                this._graphForcesConfig();
                this.restartSimulation();
                this.state.newGraphElements = false;
            }

            if (this.state.configUpdated) {
                this._zoomConfig();
                this.state.configUpdated = false;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.state.config.staticGraph) {
                this._graphForcesConfig();
            }

            // Graph zoom and drag&drop all network
            this._zoomConfig();
        }
    }, {
        key: 'render',
        value: function render() {
            var _GraphHelper$buildGra = _helper2.default.buildGraph(this.state.nodes, {
                onClickNode: this.props.onClickNode,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOut: this.onMouseOutNode
            }, this.state.links, { onClickLink: this.props.onClickLink }, this.state.config, this.state.nodeHighlighted),
                nodes = _GraphHelper$buildGra.nodes,
                links = _GraphHelper$buildGra.links;

            var svgStyle = {
                height: this.state.config.height,
                width: this.state.config.width
            };

            return _react2.default.createElement(
                'div',
                { id: this.state.id + '-' + _const2.default.GRAPH_WRAPPER_ID },
                _react2.default.createElement(
                    'svg',
                    { style: svgStyle },
                    _react2.default.createElement(
                        'g',
                        { id: this.state.id + '-' + _const2.default.GRAPH_CONTAINER_ID },
                        links,
                        nodes
                    )
                )
            );
        }
    }]);

    return Graph;
}(_react2.default.Component);

exports.default = Graph;