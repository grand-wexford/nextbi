import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';
import { STATIC_REQUEST_URL } from '../../constants';

import NavLink from '../NavLink';
import Home from '../Home';
import NotFound from '../NotFound';
import UserEdit from '../UserEdit';
import UsersList from '../UsersList';
// import Menu from '../Menu';
import remoteComponent from '../remoteComponent';

import Page1 from '../../Page1';
import Page2 from '../../Page2';
import Page3 from '../../Page3';


const CORE_COMPONENTS = {
  'Home': Home,
  'UserEdit': UserEdit,
  'UsersList': UsersList,
  'NotFound': NotFound,
  'Page1': Page1,
  'Page2': Page2,
  'Page3': Page3,
  'remoteComponent': remoteComponent
};

const AvatarIcon = <Chip
  label="Artem Panosyan"
  avatar={<Avatar
    icon={<FontIcon>{'pets'}</FontIcon>}
    suffix={'blue-grey'}
  />}
/>;



/**
 * 
 * @fix remove [location={location}] when issues/419 will be closed ( https://github.com/mlaursen/react-md/issues/419 )
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor() {
    super();
    this.state = { menu: [] };
    this.MENU = [];

  }

  fetchPosts = () => {
    const URL = STATIC_REQUEST_URL + "menu.json";
    return fetch(URL, { method: 'GET' })
      .then(response => Promise.all([response, response.json()]));
  }

  componentWillMount() {
    this.fetchPostsWithRedux();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextState: ', nextState);
    console.log('this.state: ', this.state);
    if (nextState && nextState.menu) { // && nextState.menu.length !== this.state.menu.length
      this.MENU = this.buildMenuItems(nextState.menu);
      return true;
    } else {
      return false;
    }
  }

  fetchPostsWithRedux = () => {
    return this.fetchPosts().then(([response, json]) => {
      if (response.status === 200) {
        this.setState({ ...this.state, menu: json });
      } else {
        console.log('{error_menu_load}');
      }
    });
  }

  buildMenuItems = (items = this.state.menu) => {
    let menuItems = [];

    items.forEach(item => {
      menuItems.push({
        ...item,
        route: this.getPath(item, true),
        path: this.getPath(item),
        children: item.children && this.buildMenuItems(item.children)
      });
    });

    return menuItems;
  }

  isRemoteComponent = component => {
    return !CORE_COMPONENTS[component];
  }

  getPath = ({ component, isRoute = false }) => {
    if (!component) return;
    if (component === 'Home') return '/';
    if (this.isRemoteComponent(component)) return isRoute ? '/r/:component' : '/r/' + component;

    return '/' + component;
  }

  getComponent = component => {
    component = component || 'NotFound';
    return CORE_COMPONENTS[component];
  }

  getRouteItems = () => {
    let routeItems = [];

    this.MENU.forEach(item => {
      (!!item.component && !this.isRemoteComponent(item.component) && routeItems.push(item));
      (item.children && item.children.forEach(item => { !this.isRemoteComponent(item.component) && routeItems.push(item); }));
    });
    return routeItems;
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Nextbi One"
            defaultVisible={true}
            toolbarActions={AvatarIcon}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            navItems={this.MENU.map(item => <NavLink {...item} location={location} key={item.id} />)}>
            <Switch key={location.key}>
              {this.getRouteItems().map(item => <Route exact={item.route === '/' ? true : item.exact} path={item.route} location={location} component={this.getComponent(item.component)} key={item.id} />)}
              <Route path="/r/:component" location={location} component={remoteComponent} />
              <Route path="*" location={location} component={NotFound} />
            </Switch>
          </NavigationDrawer>
        )} />
    );
  }
}

export default App;