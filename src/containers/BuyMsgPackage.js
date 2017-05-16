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
  id: 1,
  userId: 1,
  name: '胡彦斌',
  phone: 15706844099,
  buyTime: '2017年1月1日',
  buyType: '支付宝',
  moneyCount: 100,
  payType: '操作',
  buyStatus: '状态',
}];

const columns = [{
  title: '订单ID',
  dataIndex: 'id',
  key: 'id',
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
  title: '购买时间',
  dataIndex: 'buyTime',
  key: 'buyTime',
}, {
  title: '购买类型',
  dataIndex: 'buyType',
  key: 'buyType',
}, {
  title: '金额总计',
  dataIndex: 'moneyCount',
  key: 'moneyCount',
}, {
  title: '支付方式',
  dataIndex: 'payType',
  key: 'payType',
}, {
  title: '购买状态',
  dataIndex: 'buyStatus',
  key: 'buyStatus',
}];

class BuyMsgPackage extends React.Component {
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

export default BuyMsgPackage;
