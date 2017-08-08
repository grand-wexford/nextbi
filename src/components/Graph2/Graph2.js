import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

export class Graph2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('componentDidMount');

        const svgNode = document.querySelector('svg');
        const exampleNode = document.querySelector('.md-cell--12');
        const exampleNodeHeight = document.querySelector('#main-content');

        svgNode.style.width = exampleNode.offsetWidth + 'px';
        // svgNode.style.height = ( exampleNodeHeight.offsetHeight - 100 ) + 'px';
    }

    render() {
        // Graph payload (with minimalist structure)
        const data = {
            "links": [
                {
                    "source": "Androsynth",
                    "target": "Chenjesu"
                },
                {
                    "source": "Androsynth",
                    "target": "Ilwrath"
                },
                {
                    "source": "Androsynth",
                    "target": "Mycon"
                },
                {
                    "source": "Androsynth",
                    "target": "Spathi"
                },
                {
                    "source": "Androsynth",
                    "target": "Umgah"
                },
                {
                    "source": "Androsynth",
                    "target": "VUX"
                },
                {
                    "source": "Chenjesu",
                    "target": "Mycon"
                },
                {
                    "source": "Chenjesu",
                    "target": "Spathi"
                },
                {
                    "source": "Chenjesu",
                    "target": "Umgah"
                },
                {
                    "source": "Chenjesu",
                    "target": "VUX"
                },
                {
                    "source": "Ilwrath",
                    "target": "Spathi"
                },
                {
                    "source": "Ilwrath",
                    "target": "Umgah"
                },
                {
                    "source": "Ilwrath",
                    "target": "VUX"
                },
                {
                    "source": "Mycon",
                    "target": "Umgah"
                },
                {
                    "source": "Mycon",
                    "target": "VUX"
                },
                {
                    "source": "Umgah",
                    "target": "VUX"
                },
                {
                    "source": "Androsynth",
                    "target": "Guardian"
                },
                {
                    "source": "Chenjesu",
                    "target": "Broodhmome"
                },
                {
                    "source": "Ilwrath",
                    "target": "Avenger"
                },
                {
                    "source": "Mycon",
                    "target": "Podship"
                },
                {
                    "source": "Spathi",
                    "target": "Eluder"
                },
                {
                    "source": "Umgah",
                    "target": "Drone"
                },
                {
                    "source": "VUX",
                    "target": "Intruder"
                }
            ],
            "nodes": [
                {
                    "id": "Androsynth"
                },
                {
                    "id": "Chenjesu",
                    type: 'diamond',
                    color: "#49beb7",
                    size: 600
                },
                {
                    "id": "Ilwrath",
                    color: "#fc345c"
                },
                {
                    "id": "Mycon",
                    size: 800
                },
                {
                    "id": "Spathi"
                },
                {
                    "id": "Umgah",
                    type: 'square',
                    color: "#49beb7",
                    size: 1000
                },
                {
                    "id": "VUX"
                },
                {
                    "id": "Guardian",
                    "symbolType": "square",
                    type: 'square',
                    color: "#49beb7",
                    size: 600
                },
                {
                    "id": "Broodhmome",
                    "symbolType": "square",
                    color: "#fc345c"
                },
                {
                    "id": "Avenger",
                    "symbolType": "square",
                    color: "#49beb7"
                },
                {
                    "id": "Podship",
                    "symbolType": "square"
                },
                {
                    "id": "Eluder",
                    "symbolType": "square"
                },
                {
                    "id": "Drone",
                    "symbolType": "square",
                    color: "#49beb7"
                },
                {
                    "id": "Intruder",
                    "symbolType": "square",
                    color: "#fc345c",
                    size: 1200
                }
            ]
        };

        // The graph configuration
        const myConfig = {
            highlightBehavior: true,
            width: this.props.width,
            height: this.props.height,
            minZoom: 1,
            maxZoom: 7,
            node: {
                color: '#afffdf',
                size: 480,
                highlightStrokeColor: '#3e588f'
            },
            link: {
                highlightColor: '#6acafc'
            }
        };

        // Graph event callbacks
        const onClickNode = function (nodeId) {
            console.log('Clicked node', nodeId);
        };

        const onMouseOverNode = function (nodeId) {
            console.log('Mouse over node', nodeId);
        };

        const onMouseOutNode = function (nodeId) {
            console.log('Mouse out node', nodeId);
        };

        const onClickLink = function (source, target) {
            console.log(`Clicked link between ${source} and ${target}`);
        };
        return (


            <Graph
                id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
                onMouseOverNode={onMouseOverNode}
                _zoomConfig={() => { alert(1); }}
                onMouseOutNode={onMouseOutNode} />
        );
    }
}
export default Graph2;

