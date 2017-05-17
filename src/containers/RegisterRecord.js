/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import {Link} from 'react-router';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';
import TableComponent from '../components/TableComponent';

const dataSource = [{
  key: '1',
  id: '0001',
  name: '胡彦斌',
  phone: 15706844099,
  registerTime: '2017年1月1日',
  finalTime: '2017年1月1日',
  orgDetail: '组织1',
  sendNum: '12',
  successNum: '12',
  rechargeNum: '12',
  buy: 122,
}, {
  key: '2',
  id: '0001',
  name: '胡彦斌',
  phone: 15706844099,
  registerTime: '2017年1月1日',
  finalTime: '2017年1月1日',
  orgDetail: '组织1',
  sendNum: '12',
  successNum: '12',
  rechargeNum: '12',
  buy: 122,
}];

const columns = [{
  title: '用户ID', dataIndex: 'id', key: 'id',
}, {
  title: '姓名', dataIndex: 'name', key: 'name', render: text => <Link to="/info">{text}</Link>,
}, {
  title: '手机号', dataIndex: 'phone', key: 'phone',
}, {
  title: '注册时间', dataIndex: 'registerTime', key: 'registerTime',
}, {
  title: '最后操作时间', dataIndex: 'finalTime', key: 'finalTime',
}, {
  title: '组织详情', dataIndex: 'orgDetail', key: 'orgDetail',
}, {
  title: '发送短信总量', dataIndex: 'sendNum', key: 'sendNum',
}, {
  title: '成功总量', dataIndex: 'successNum', key: 'successNum',
}, {
  title: '充值金额', dataIndex: 'rechargeNum', key: 'rechargeNum',
}, {
  title: '短信包购买', dataIndex: 'buy', key: 'buy',
}];

class RegisterRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      chartDataTime: [],
      chartDataCount: [],
    }
  }

  render() {
    let counts = this.state.chartDataCount;
    let dates = this.state.chartDataTime;
    return (
        <div className="content-view">
          <TotalMsgComponent />
          <ChartDataComponent
              type={1}
              chartStyle={{marginTop: 50}}
          />
          <TableComponent
              columns={columns}
              dataSource={dataSource}
          />
        </div>
    );
  }
}

export default RegisterRecord;
