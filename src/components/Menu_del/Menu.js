import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function fetchPosts() {
    const URL = "/menu.json";
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}

class Menu extends Component {
    componentWillMount() {
        this.fetchPostsWithRedux();
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state);
        return (nextState && nextState.menu);
    }

    fetchPostsWithRedux = () => {
        return fetchPosts().then(([response, json]) => {
            if (response.status === 200) {
                this.setState({ ...this.state, menu: json });
            }
            else {
                console.log('{error_menu_load}');
            }
        });

    }
    render() {
        console.log('render',this.state);
        return (
            <ul>
                {
                    this.props.posts &&
                    this.props.posts.map((post) => {
                        return (
                            <li>{post.title}</li>
                        );
                    })
                }
            </ul>
        );
    }
}


export default Menu;