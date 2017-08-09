import React, { Component } from 'react';
import { REQUEST_URL } from '../../constants';

export class remoteComponent extends Component {
    constructor(...args) {
        super(...args);
        this.state = { componentHTML: '<b>загрузка...</b>', frameHeight: "400px" };
    }

    fetchData = () => {
        fetch(REQUEST_URL + this.props.match.params.module, { method: 'get', headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                return res.text();
            })
            .then((res) => {
                this.setState({ ...this.state, componentHTML: res });
            });
    }

    componentDidMount = function () {
        this.fetchData();
        console.log(document.getElementById('main-content').height);
        let mainContent = document.getElementById('main-content').height;
        this.state.frameHeight = mainContent + 'px';
    }

    render() {
        return (
            <div>
                <h1>remoteComponent</h1>
                <iframe src="/r" style={{ border: "1px solid gray", width: "100%", height: this.state.frameHeight }}></iframe>
                <div dangerouslySetInnerHTML={{ __html: this.state.componentHTML }}></div>
            </div>
        );
    }
}
export default remoteComponent;