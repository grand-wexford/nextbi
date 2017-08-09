import React, { Component } from 'react';
// import TableHeader from 'react-md/lib/DataTables/TableHeader';
// import DataTable from 'react-md/lib/DataTables/DataTable';
// import TableRow from 'react-md/lib/DataTables/TableRow';
// import TableColumn from 'react-md/lib/DataTables/TableColumn';
// import TableBody from 'react-md/lib/DataTables/TableBody';
// import Switch from 'react-md/lib/SelectionControls/Switch';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';
import TextField from 'react-md/lib/TextFields';
// import FontIcon from 'react-md/lib/FontIcons';

import './UserEdit.css';

class UsersList extends Component {
  render() {
    return <div className="md-grid">
      <h3 className="md-cell md-cell--12 md-text-container">Редактирование пользователя</h3>
      <div className="md-cell md-cell--12">
        <Paper zDepth={1} style={{ padding: '20px' }}>
          <TextField
            id="requiredField"
            label="Логин"
            defaultValue="Петров"
            required
            className="md-cell md-cell--bottom"
          />
          <TextField
            id="requiredField"
            label="Пароль"
            type="password"
            required
            className="md-cell md-cell--bottom"
          />

           <Button flat primary label="Сохранить">done</Button>
        </Paper>
      </div>
    </div>;
  }
}

export default UsersList;