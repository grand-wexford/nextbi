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

import navItems from '../../menu';

const AvatarIcon = <Chip
  label="Artem Panosyan"
  avatar={<Avatar icon={<FontIcon>{'pets'}</FontIcon>}
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
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            navItems={navItems.map(item => <NavLink {...item} location={location} key={item.label} />)}>
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route path="/page-1" location={location} component={Page1} />
              <Route path="/page-2" location={location} component={Page2} />
              <Route path="/page-3" location={location} component={Page3} />
              <Route path="/user-edit" location={location} component={UserEdit} />
              <Route path="/users-list" location={location} component={UsersList} />
              <Route path="*" location={location} component={NotFound} />
            </Switch>
          </NavigationDrawer>
        )} />
    );
  }
}

export default App;