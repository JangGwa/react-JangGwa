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
  sendTime: '2017年1月1日',
  msgType: '纯文字',
  msgSign: '校园通知',
  sendNum: 12,
  successNum: 12,
  readNum: 12,
  replyNum: 12,
  operation: '操作',
}, {
  key: '2',
  id: '0001',
  name: '胡彦斌',
  phone: 15706844099,
  sendTime: '2017年1月1日',
  msgType: '纯文字',
  msgSign: '校园通知',
  sendNum: 12,
  successNum: 12,
  readNum: 12,
  replyNum: 12,
  operation: '操作',
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
  title: '发送时间',
  dataIndex: 'sendTime',
  key: 'sendTime',
}, {
  title: '短信类型',
  dataIndex: 'msgType',
  key: 'msgType',
}, {
  title: '短信标签',
  dataIndex: 'msgSign',
  key: 'msgSign',
}, {
  title: '短信发送量',
  dataIndex: 'sendNum',
  key: 'sendNum',
}, {
  title: '发送成功量',
  dataIndex: 'successNum',
  key: 'successNum',
}, {
  title: '已阅读量',
  dataIndex: 'readNum',
  key: 'readNum',
}, {
  title: '已回复量',
  dataIndex: 'replyNum',
  key: 'replyNum',
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
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
