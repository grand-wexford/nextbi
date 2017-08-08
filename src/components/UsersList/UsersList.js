import React, { Component } from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';
import Switch from 'react-md/lib/SelectionControls/Switch';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';
import browserHistory from 'history/createBrowserHistory';
import './UsersList.css'

class UsersList extends Component {
  render() {
    return <div className="md-grid">


      <h3 className="md-cell md-cell--12 md-text-container">Учётные записи</h3>
      <div className="md-cell md-cell--12">
      <Paper zDepth={1} style={{padding: '20px'}}>
        <Button flat primary label="Добавить пользователя" href='/user-edit'>person_add</Button><Button flat primary label="Go Back"  onClick={browserHistory.goBack}></Button>
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Логин</TableColumn>
              <TableColumn></TableColumn>
              <TableColumn></TableColumn>
              <TableColumn></TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableColumn>Admin</TableColumn>
              <TableColumn>
                <Switch id="switch1" name="lights" label="" defaultChecked />
              </TableColumn>
              <TableColumn>
                <Button icon tooltipLabel="Редактировать" href='/user-edit'>edit</Button>
              </TableColumn>
              <TableColumn>
                <Button icon tooltipLabel="Удалить">delete</Button>
              </TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>Петров</TableColumn>
              <TableColumn><Switch id="switch2" name="lights" /></TableColumn>
              <TableColumn><Button icon href='/user-edit'>edit</Button></TableColumn>
              <TableColumn><Button icon >delete</Button></TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      </Paper>
      </div>

    </div>;
  }
}

export default UsersList;