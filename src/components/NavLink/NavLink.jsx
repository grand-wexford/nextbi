import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
// import Subheader from 'react-md/lib/Subheaders';
import Collapse from 'react-md/lib/Helpers/Collapse';
// import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import './NavLink.css';

/**
 * @fix replace location to !!match when issues/419 will be closed ( https://github.com/mlaursen/react-md/issues/419 )
 * active={!!match}
 * @param {*} param0
 */
class SubListItem extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        path: PropTypes.string,
        icon: PropTypes.node
    }

    static defaultProps = {
        id: '',
        label: '{no_title}',
        icon: 'chevron_right',
        path: '#action'
    }

    render() {
        const { id, path, label, icon, location } = this.props;
        const leftIcon = <FontIcon>{icon}</FontIcon>;
        return (
            <ListItem
                key={id}
                active={location.pathname === path}
                component={RouterLink}
                to={path}
                primaryText={label}
                leftIcon={leftIcon} />
        );
    }
}

class SubList extends PureComponent {
    static propTypes = {
        collapsed: PropTypes.bool,
        children: PropTypes.array
    }
    static defaultProps = {
        collapsed: true,
        children: []
    }

    // Перестаёт рендериться при меняющемся active
    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return nextProps.collapsed !== this.props.collapsed;
    // }

    render() {
        const { children, collapsed, location } = this.props;
        return (
            <Collapse collapsed={collapsed}>
                <List>
                    {children.map(child => <SubListItem key={child.id} location={location} {...child} />)}
                </List>
            </Collapse>
        );
    }
}

class NavLink extends PureComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            collapsed: this.props.collapsed
        };
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        path: PropTypes.string,
        collapsed: PropTypes.bool,
        icon: PropTypes.node,
        children: PropTypes.array
    }

    static defaultProps = {
        id: '',
        label: '{no_title}',
        icon: 'radio_button_unchecked',
        path: '#action',
        collapsed: true,
        children: []
    }

    // Перестаёт рендериться при меняющемся active
    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return nextState.collapsed !== this.state.collapsed;
    // }

    _handlerMenuItemClick = e => {
        if (this.props.children.length) {
            e.preventDefault();
            this.setState({
                ...this.state,
                collapsed: !this.state.collapsed
            });
        }
    }

    render() {
        const {
            label,
            icon,
            location,
            path,
            children
        } = this.props;

        const rightIcon = children.length ? <FontIcon>{this.state.collapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</FontIcon> : null;
        const leftIcon = <FontIcon>{icon}</FontIcon>;

        return (
            <div>
                <ListItem
                    component={RouterLink}
                    active={location.pathname === path}
                    to={path}
                    primaryText={label}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    onClick={this._handlerMenuItemClick} />
                {children.length > 0 && <SubList collapsed={this.state.collapsed} children={children} location={location} />}
            </div>
        );
    }
}

export default NavLink;