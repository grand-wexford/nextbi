import React, { Component } from 'react';

import { BarChart } from 'react-d3';

export class Graph1 extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    render() {
        // необходимо заранее назначить на переменую список с минимальными данными включая  ключи "name"и "values"
        var data = [
            {
                name: "series1",
                values: [{ x: 0, y: 20 }, { x: 24, y: 10 }]
            },
            {
                name: "series2",
                values: [{ x: 70, y: 82 }, { x: 76, y: 82 }]
            }
        ];
        return (
            <div>
                <h1>First Chart</h1>

                <BarChart
                    data={data}
                    width={this.props.width}
                    height={this.props.height}
                    fill={'#3182bd'}
                />
            </div>
        );
    }
}
export default Graph1;