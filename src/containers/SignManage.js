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
  applyTime: '2017年1月1日',
  applySign: '校园通知',
  applyName: '胡彦斌',
  upload: '资料',
  operation: '操作',
}];

const columns = [{
  title: '申请时间',
  dataIndex: 'applyTime',
  key: 'applyTime',
}, {
  title: '申请签名',
  dataIndex: 'applySign',
  key: 'applySign',
}, {
  title: '申请用户',
  dataIndex: 'applyName',
  key: 'applyName',
  render: text => <Link to="/info">{text}</Link>,
}, {
  title: '上传资料',
  dataIndex: 'upload',
  key: 'upload',
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
}];

class SignManage extends React.Component {
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

export default SignManage;
