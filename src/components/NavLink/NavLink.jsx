import React, { PureComponent } from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
// import Subheader from 'react-md/lib/Subheaders';
import Collapse from 'react-md/lib/Helpers/Collapse';
// import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';

/**
 * @fix replace location to !!match when issues/419 will be closed ( https://github.com/mlaursen/react-md/issues/419 )
 * active={!!match}
 * @param {*} param0
 */
class SubListItem extends PureComponent {

    static propTypes = {
        label: PropTypes.string.isRequired,
        to: PropTypes.string,
        icon: PropTypes.node
    }

    static defaultProps = {
        id: '',
        label: '{no_title}',
        icon: 'chevron_right',
        to: '#action'
    }

    render() {
        const { id, to, label, icon } = this.props;
        const leftIcon = <FontIcon>{icon}</FontIcon>;
        return (
            <ListItem
                key={id}
                component={RouterLink}
                to={to}
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

    render() {
        const { children, collapsed, location } = this.props;
        return (
            <Collapse collapsed={collapsed}>
                <List>
                    {children && children.map(child => {
                        return (
                            <SubListItem
                                key={child.id}
                                id={child.id}
                                to={child.to}
                                location={location}
                                label={child.label}
                                icon={child.icon} />
                        );
                    })}
                </List>
            </Collapse>
        );
    }
}

class NavLink extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };
    }
    static propTypes = {
        label: PropTypes.string.isRequired,
        to: PropTypes.string,
        exact: PropTypes.bool,
        icon: PropTypes.node
    }
    static defaultProps = {
        id: '',
        label: '{no_title}',
        icon: 'chevron_right',
        to: '#action',
        children: []
    }

    _handlerMenuItemClick = e => {
        if (this.props.children.length > 0) {
            e.preventDefault();
            this.setState({
                collapsed: !this.state.collapsed
            });
        }
    }

    render() {
        const {
            label,
            to,
            exact,
            icon,
            location,
            children
        } = this.props;

        const leftIcon = <FontIcon>{icon}</FontIcon>;
        return (
            <Route path={to} exact={exact}>
                {({ match }) => {
                    return (
                        <div>
                            <ListItem
                                component={RouterLink}
                                active={location.pathname === to}
                                to={to}
                                primaryText={label}
                                leftIcon={leftIcon}
                                onClick={this._handlerMenuItemClick} /> {children.length > 0 && <SubList collapsed={this.state.collapsed} children={children} />}
                        </div>
                    );
                }}
            </Route>
        );
    }
}

export default NavLink;