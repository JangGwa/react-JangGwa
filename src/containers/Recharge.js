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
  orderId: 1,
  userId: 1,
  name: '胡彦斌',
  phone: 15706844099,
  rechargeTime: '2017年1月1日',
  rechargeNum: 100,
  payType: '操作',
  rechargeStatus: '状态',
}];

const columns = [{
  title: '订单ID',
  dataIndex: 'orderId',
  key: 'orderId',
}, {
  title: '用户ID',
  dataIndex: 'userId',
  key: 'userId',
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
  title: '充值时间',
  dataIndex: 'rechargeTime',
  key: 'rechargeTime',
}, {
  title: '充值金额',
  dataIndex: 'rechargeNum',
  key: 'rechargeNum',
}, {
  title: '支付方式',
  dataIndex: 'payType',
  key: 'payType',
}, {
  title: '充值状态',
  dataIndex: 'rechargeStatus',
  key: 'rechargeStatus',
}];

class Recharge extends React.Component {
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

export default Recharge;
