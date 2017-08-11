import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';

import NavLink from '../NavLink';
import Home from '../Home';
import NotFound from '../NotFound';
import UserEdit from '../UserEdit';
import UsersList from '../UsersList';
import remoteComponent from '../remoteComponent';

import Page1 from '../../Page1';
import Page2 from '../../Page2';
import Page3 from '../../Page3';

import navItems from '../../json/menu';

const CORE_COMPONENTS = {
  '': Home,
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

const isRemoteComponent = (component) => {
  return !CORE_COMPONENTS[component];
};

const getPath = ({ component }) => {
  if (component===undefined) {
    return;
  }
    if (component === 'Home'){
    return '/';
  }
  return isRemoteComponent(component) ? '/remote/:component' : '/' + component;
};

const getLink = ({ component }) => {
  if (component===undefined) {
    return;
  }
  if (component === 'Home'){
    return '/';
  }
  return isRemoteComponent(component) ? '/remote/' + component : '/' + component;
};

const buildMenuItems = (items = navItems) => {
  let menuItems = [];

  items.forEach(item => {
    menuItems.push({
      ...item,
      route: getPath(item),
      path: getLink(item),
      children: item.children && buildMenuItems(item.children)
    });
  });

  return menuItems;
};

const MENU = buildMenuItems();
console.log(MENU);
const getRouteItems = () => {
  let routeItems = [];

  MENU.forEach(item => {
    (!!item.component && !isRemoteComponent(item.component) && routeItems.push(item));
    (item.children && item.children.forEach(item => { !isRemoteComponent(item.component) && routeItems.push(item); }));
  });

  return routeItems;
};

const getComponent = ({ component }) => {
  return CORE_COMPONENTS[component];
};

/**
 * 
 * @fix remove [location={location}] when issues/419 will be closed ( https://github.com/mlaursen/react-md/issues/419 )
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {

    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Nextbi One"
            toolbarTitle=""
            defaultVisible={true}
            toolbarActions={AvatarIcon}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            navItems={MENU.map(item => <NavLink {...item} location={location} key={item.id} />)}>
            <Switch key={location.key}>
              {getRouteItems().map(item => <Route exact={item.route === '/' ? true : item.exact} path={item.route} location={location} component={getComponent(item)} key={item.id} />)}
              <Route path="/remote/:component" location={location} component={remoteComponent} />
              <Route path="*" location={location} component={NotFound} />
            </Switch>
          </NavigationDrawer>
        )} />
    );
  }
}

export default App;