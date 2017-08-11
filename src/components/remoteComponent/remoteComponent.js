import React, { Component } from 'react';
import { REQUEST_URL } from '../../constants';
import './remoteComponent.css';

export class remoteComponent extends Component {
    constructor(...params) {
        super(...params);
        this.state = { frameHeight: "400px" };
    }

    // fetchData = () => {
    //     fetch(REQUEST_URL + this.props.match.params.module, { method: 'get', headers: { 'Content-Type': 'application/json' } })
    //         .then((res) => {
    //             return res.text();
    //         })
    //         .then((res) => {
    //             this.setState({ ...this.state, componentHTML: res });
    //         });
    // }

    componentDidMount = () => {
        // this.fetchData();
        this.setHeight();

        let timer;
        window.addEventListener('resize', () => {
            (timer && clearTimeout(timer));
            timer = setTimeout(this.setHeight, 300);
        }, true);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.state.frameHeight !== nextState.frameHeight;
    }

    setHeight = () => {
        let mainContent = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight - 6;
        this.setState({ ...this.state, frameHeight: mainContent + 'px' });
    }

    render() {
        return (
            <iframe src={REQUEST_URL + this.props.match.params.component} className="component-frame" style={{ height: this.state.frameHeight }}></iframe>
        );
    }
}
export default remoteComponent;