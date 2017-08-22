import React, { Component } from 'react';
import { TextField } from 'react-md';
import FontIcon from 'react-md/lib/FontIcons';
// import Paper from 'react-md/lib/Papers';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Button from 'react-md/lib/Buttons';
import CardText from 'react-md/lib/Cards/CardText';
// import Divider from 'react-md/lib/Dividers';
import SelectField from 'react-md/lib/SelectFields';
import { API_SERVER, C } from './constants';
import { Graph } from 'react-d3-graph';

import { connect } from 'react-redux';
// import {c} from './globals';

const menu = [
  {
    value: 101,
    label: "EDedective граф"
  },
  {
    value: 501,
    label: "Тестовый граф"
  }
];
// const mapStateToProps = (state, ownProps) => {
//   return {
//     active: ownProps.filter === state.visibilityFilter
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter))
//     }
//   }
// }



class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      appStatus: "calm",
      searchText: "IVANOV",
      moduleId: "",
      graph: { nodes: [], links: [] },
      width: 800,
      height: 600,
      graphType: null
    };
  }
  createAPIURL = ({ moduleId, command, query }) => `${API_SERVER}/${moduleId}/${command}?${query}`;

  handlerClearText = () => {
    this.setState({ ...this.state, searchText: "" });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('OOOKKK');
    // this.renderD3();

  }
  handlerChangeText = e => {
    this.setState({ ...this.state, searchText: e });
  }

  // shouldComponentUpdate = () => {

  // }

  componentDidMount = () => {
    C('componentDidMount', 'a');
    this.renderD3();
    let wrapper = document.querySelector('#graph-id-graph-wrapper');
    let width = wrapper.clientWidth;
    let height = wrapper.clientHeight;


    window.addEventListener('resize', e => {
      wrapper = document.querySelector('#graph-id-graph-wrapper');
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      this.setState({ ...this.state, width, height: height - 5 });
    });
    console.log(width);
    this.setState({ ...this.state, width, height });
  }

  convertGraph = (graph) => {
    return {
      ...graph,
      nodes: graph.nodes.map(function (k, v) { // no reason for this, just example
        return {
          ...k,
          x: k.x,
          y: k.y,
          image: k.group
        };
      }),
      links: graph.links.map(function (k, v) {
        return {
          ...k,
          source: graph.nodes[k.source].id,
          target: graph.nodes[k.target].id
        };
      })
    };
  }

  renderGraph = () => {
    C(this.state.graph);
  }

  handlerChangeType = value => {
    this.setState({ ...this.state, moduleId: value, appStatus: 'loading' });

    fetch(this.createAPIURL({ moduleId: value, command: 'onInit', query: 'width=600&height=800' }), { method: 'GET' })
      .then(response => {
        this.setState({ ...this.state, appStatus: 'loaded' });
        return response.json();
      })
      .then(data => {
        if (data.result === "success") {
          this.setState({ ...this.state, graphType: value });
        } else {
          this.setState({ ...this.state, appStatus: `error: ${data.params}` });
        }
      })
      .catch(() => {
        this.setState({ ...this.state, appStatus: 'error' });
      });
  }

  handlerSearchByText = value => {
    this.setState({ ...this.state, appStatus: 'loading' });

    fetch(this.createAPIURL({ moduleId: this.state.moduleId, command: 'onFiltered', query: `text=${this.state.searchText}` }), { method: 'GET' })
      .then(response => {
        this.setState({ ...this.state, appStatus: 'loaded' });
        return response.json();
      })
      .then(data => {
        if (data.result === "success") {
          if (data.params && data.params.graph) {
            this.setState({ ...this.state, graphType: value, graph: this.convertGraph(data.params.graph) });
            this.renderGraph();
          }

        } else {
          this.setState({ ...this.state, appStatus: `error: ${data.params}` });
        }
      })
      .catch((response) => {
        C(response);
        this.setState({ ...this.state, appStatus: 'error' });
      });
  }

  renderD3() {
    C('RENDER D3');
  }
  render() {
    const myConfig = {
      highlightBehavior: true,
      width: this.state.width,
      height: this.state.height,
      forceY: 0.1,
      forceX: 0.1,
      minZoom: 1,
      maxZoom: 7,
      node: {
        color: '#afffdf',
        imagePath: "d3test/i/",
        width: '40',
        height: '40',
        size: 480,
        labelProperty: "name",
        highlightStrokeColor: '#3e588f'
      },
      link: {
        highlightColor: '#6acafc'
      }
    };
    // Graph event callbacks
    const onClickNode = function (nodeId) {
      C('Clicked node', nodeId);
    };

    const onMouseOverNode = function (nodeId) {
      C('Mouse over node', nodeId);
    };

    const drag = function (nodeId) {
      C('drug', nodeId);
    };

    const onMouseOutNode = function (nodeId) {
      C('Mouse out node', nodeId);
    };

    const onClickLink = function (source, target) {
      C(`Clicked link between ${source} and ${target}`);
    };

    return (
      <div className="App md-grid">
        <Card className="md-cell md-cell--8" >
          <CardText className={"map-holder"}>MAP</CardText>
          <CardText className={"graph-holder"}>
            <Graph
              id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
              data={this.state.graph}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
              onMouseOverNode={onMouseOverNode}
              _onDragMove={drag}
              onMouseOutNode={onMouseOutNode} />
          </CardText>
        </Card>
        <Card className="md-cell md-cell--4" >
          <CardTitle title="Настройки" subtitle={`appStatus: ${this.state.appStatus}`}></CardTitle>
          <SelectField
            id="selectGraphType"
            placeholder="Тип графа"
            position={SelectField.Positions.BELOW}
            itemLabel={"label"}
            itemValue={"value"}
            menuItems={menu}
            className="md-cell"
            onChange={this.handlerChangeType}
          />
          <CardTitle title="Фильтры"></CardTitle>
          <CardText>
            <TextField
              id="searchText"
              label="текст"
              type="text"
              value={this.state.searchText}
              helpText="Введите текст для фильтрации"
              lineDirection="center"
              inlineIndicator={<FontIcon className={'cursor-default'} onClick={this.handlerClearText}>{'clear'}</FontIcon>}
              className="md-cell md-cell--top"
              helpOnFocus={true}
              onChange={this.handlerChangeText}
            />
            <br /><br />
            <Button onClick={this.handlerSearchByText} raised secondary disabled={!this.state.graphType} label="Найти" children={<FontIcon>{'search'}</FontIcon>} />
          </CardText>
        </Card>
      </div>
    );
  }
}
App = connect()(App);
export default App;
