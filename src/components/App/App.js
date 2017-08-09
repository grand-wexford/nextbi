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

import Page1 from '../../Page1';
import Page2 from '../../Page2';
import Page3 from '../../Page3';

import navItems from '../../json/menu';

const AvatarIcon = <Chip
  label="Artem Panosyan"
  avatar={<Avatar
    icon={<FontIcon>{'pets'}</FontIcon>}
    suffix={'blue-grey'}
  />}
/>;

const getRouteItems = () => {
  let routeItems = [];

  navItems.forEach(item => {
    if (!!item.path) {
      routeItems.push(item);
    }
    if (item.children) {
      item.children.forEach(item => {
        routeItems.push(item);
      });
    }
  });

  return routeItems;
};

const getComponent = ({ type, action }) => {
  let itemComponent;

  switch (type) {
    case 'home':
      itemComponent = Home;
      break;

    case 'users':
      switch (action) {
        case 'edit':
          itemComponent = UserEdit;
          break;

        case 'list':
          itemComponent = UsersList;
          break;

        default:
          itemComponent = NotFound;
          break;
      }
      break;

    case 'page-1':
      itemComponent = Page1;
      break;

    case 'page-2':
      itemComponent = Page2;
      break;

    case 'page-3':
      itemComponent = Page3;
      break;

    default:
      itemComponent = NotFound;
      break;
  }

  return itemComponent;
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
            drawerTitle="Nextbi"
            toolbarTitle=""
            defaultVisible={true}
            toolbarActions={AvatarIcon}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            navItems={navItems.map(item => <NavLink {...item} location={location} key={item.id} />)}>
            <Switch key={location.key}>
              {getRouteItems().map(item => <Route exact={!!item.exact} path={item.path} location={location} component={getComponent(item)} key={item.id} />)}
              <Route path="*" location={location} component={NotFound} />
            </Switch>
          </NavigationDrawer>
        )} />
    );
  }
}

export default App;