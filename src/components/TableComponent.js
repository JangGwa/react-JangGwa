/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Table } from 'antd';
import '../../index.css';

class TableComponent extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <Table dataSource={this.props.dataSource} columns={this.props.columns} />
      </div>
    );
  }
}

export default TableComponent;
