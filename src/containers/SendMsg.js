/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';
import TableComponent from '../components/TableComponent';

const dataSource = [{
  key: '1',
  id: '0001',
  name: '胡彦斌',
  phone: 15706844099,
  loginTime: '2017年1月1日',
  operationTime: '1h 3min',
}, {
  key: '2',
  id: '0001',
  name: '胡彦斌',
  phone: 15706844099,
  loginTime: '2017年1月1日',
  operationTime: '1h 3min',
}];

const columns = [{
  title: '用户ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  render: text => <Link to="/info">{text}</Link>,
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '登录时间',
  dataIndex: 'loginTime',
  key: 'loginTime',
}, {
  title: '操作时长',
  dataIndex: 'operationTime',
  key: 'operationTime',
}];

class SendMsg extends React.Component {
  render() {
    return (
        <div className="content-view">
          <TotalMsgComponent />
          <ChartDataComponent chartStyle={{ marginTop: 50 }} />
          <TableComponent
            columns={columns}
            dataSource={dataSource}
          />
        </div>
    );
  }
}

export default SendMsg;
