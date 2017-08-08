import React, { Component } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';

class CollapsibleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      windowed: false
    };
  }
  // componentDidMount() {
  //     console.log('componentDidMount');

  //     const svgNode = document.querySelector('svg');
  //     const exampleNode = document.querySelector('.md-cell--12');

  //     const w =exampleNode.offsetWidth;
  //     console.log('w: ', w);

  //     // svgNode.style.width = w;
  //     svgNode.offsetWidth = w;
  //     console.log(svgNode);
  //     console.log(svgNode.height);
  // }

  hendlerExpandCard = (e) => {
    let newState = {collapsed: !this.state.collapsed, windowed: false };
    this.setState({ ...this.state, ...newState });
  }

  hendlerToWindowMode = (e) => {
    let newState = { ...this.state };
    if (this.state.windowed === false) {
      newState.collapsed = true;
      newState.windowed = true;
    } else {
      newState.windowed = false;
      newState.collapsed = false;
    }
    this.setState({ ...this.state, ...newState });
    // this.setState({ ...this.state, windowed: !this.state.windowed });
    console.log('this.state.windowed: ', this.state.windowed);
  }

  render() {
    const { title, description, content, className } = this.props;
    const icon = this.state.collapsed ? 'navigate_before' : 'navigate_next'; // filter_none fullscreen fullscreen exit
    const icon2 = this.state.windowed ? 'fullscreen_exit' : 'fullscreen'; // filter_none fullscreen fullscreen exit
    const windowedClass = this.state.windowed ? 'windowed-mode' : ''; // filter_none fullscreen fullscreen exit

    if( this.state.windowed || this.state.collapsed){
      let classes = '';
    } else {
      let classes = '';
    }

    return (
      <Card className={this.state.collapsed ? 'md-cell md-cell--12 ' + className + ' ' + windowedClass : 'md-cell md-cell--3 ' + windowedClass}>
        <div style={{ float: 'right' }} className="Card-actions">
          <Button icon={true} onClick={this.hendlerExpandCard}>{icon}</Button>
          <Button icon={true} onClick={this.hendlerToWindowMode}>{icon2}</Button>
        </div>
        <CardTitle title={title} />
        <CardText>
          {this.state.collapsed ? content : description}
        </CardText>
      </Card>
    );
  }
}

export default class Page1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <div className="md-grid">
        <h2 className="md-cell md-cell--12 ">
          Графы
        </h2>
        <CollapsibleCard title={'Graph 1'} description={'Это первый граф.'} className={'graph-holder'} content={<Graph2 width={1200} height={600} />} />
        <CollapsibleCard title={'Graph 2'} description={<Graph1 width={300} height={100} />} content={<Graph1 width={600} height={300} />} />
        <CollapsibleCard title={'Graph 3'} description={'Третий граф.'} content={"Просто текст"} />
        <CollapsibleCard title={'Graph 4'} description={'Четвёртый граф.'} content={"Опять текст"} />
      </div>
    );
  }
}
