/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Tabs, Table, Pagination, Button } from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import moment from 'moment';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartUserDataComponent from '../components/ChartUserDataComponent';
import ChartUserDataComponent2 from '../components/ChartUserDataComponent2';
import ChartUserDataComponent3 from '../components/ChartUserDataComponent3';
import ChartUserDataComponent4 from '../components/ChartUserDataComponent4';
import TableComponent from '../components/TableComponent';
import PersonInfoComponent from '../components/PersonInfoComponent';
import LoginRecord from './RegisterRecord'

const TabPane = Tabs.TabPane;

const columns1 = [{
  title: '登录时间',
  dataIndex: 'login_time',
  key: 'login_time',
}, {
  title: '操作时长',
  dataIndex: 'last_option_time',
  key: 'last_option_time',
  render: (a,b,c) => {
    let last = a;
    let first = b.login_time;
    return <div>{moment(moment(last)-moment(first)).format('YYYY-MM-DD hh:mm:ss')}</div>
  }
}, {
  title: '操作次数',
  dataIndex: 'operationNum',
  key: 'operationNum',
}];

const columns2 = [{
  title: '发送时间',
  dataIndex: 'create_time',
  key: 'create_time',
}, {
  title: '短信类型',
  dataIndex: 'send_type',
  key: 'send_type',
}, {
  title: '短信标签',
  dataIndex: 'signature_name',
  key: 'signature_name',
}, {
  title: '短信发送量',
  dataIndex: 'send_count',
  key: 'send_count',
}, {
  title: '发送成功量',
  dataIndex: 'success_count',
  key: 'success_count',
}, {
  title: '已阅读量',
  dataIndex: 'read_count',
  key: 'read_count',
}, {
  title: '已回复量',
  dataIndex: 'reply_count',
  key: 'reply_count',
}, {
  title: '操作',
      dataIndex: 'operation',
      key: 'operation',
}];

const columns3 = [{
  title: '订单ID',
  dataIndex: 'trade_number',
  key: 'trade_number',
}, {
  title: '充值时间',
  dataIndex: 'create_time',
  key: 'create_time',
}, {
  title: '充值金额',
  dataIndex: 'total_price',
  key: 'total_price',
}, {
  title: '支付方式',
  dataIndex: 'payment_type',
  key: 'payment_type',
}, {
  title: '充值状态',
  dataIndex: 'trade_type',
  key: 'trade_type',
  render: (a,b,c) => {
    if (b.payment_status === 0) {
      return <Button type="primary" style={{height: 25, border: '1px solid #797979', backgroundColor: '#797979'}}>已关闭</Button>
    } else if (b.payment_status === 1) {
      return <Button type="primary" style={{height: 25, border: '1px solid #23d134', backgroundColor: '#23d134'}}>待支付</Button>
    } else if (b.payment_status === 2) {
      return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已支付</Button>
    } else if (b.payment_status === 3) {
      return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已完成</Button>
    }
  }
}];

const columns4 = [{
  title: '订单ID',
  dataIndex: 'tradeNum',
  key: 'tradeNum',
}, {
  title: '购买时间',
  dataIndex: 'tradeTime',
  key: 'tradeTime',
}, {
  title: '购买类型',
  dataIndex: 'tradeSubject',
  key: 'tradeSubject',
}, {
  title: '金额总计',
  dataIndex: 'tradePrice',
  key: 'tradePrice',
}, {
  title: '支付方式',
  dataIndex: 'paymentType',
  key: 'paymentType',
}, {
  title: '购买状态',
  dataIndex: 'tradeStatus',
  key: 'tradeStatus',
  render: (a,b,c) => {
    if (b.tradeStatus === 0) {
      return <Button type="primary" style={{height: 25, border: '1px solid #797979', backgroundColor: '#797979'}}>已关闭</Button>
    } else if (b.tradeStatus === 1) {
      return <Button type="primary" style={{height: 25, border: '1px solid #23d134', backgroundColor: '#23d134'}}>待支付</Button>
    } else if (b.tradeStatus === 2) {
      return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已支付</Button>
    } else if (b.tradeStatus === 3) {
      return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已完成</Button>
    }
  }
}];

const columns5 = [{
  title: '操作时间',
  dataIndex: 'operationTime',
  key: 'operationTime',
}, {
  title: '操作类型',
  dataIndex: 'operationType',
  key: 'operationType',
}, {
  title: '操作内容',
  dataIndex: 'operationContent',
  key: 'operationContent',
}];

class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource1: [],
      total1: 0,
      dataSource2: [],
      total2: 0,
      dataSource3: [],
      total3: 0,
      dataSource4: [],
      total4: 0,
    }
  }
  componentDidMount() {
    this.initTableData1(1);
    this.initTableData2(1);
    this.initTableData3(1);
    this.initTableData4(1);
  }

  initTableData1(page) {
    let userId = window.localStorage.getItem('userId');
    api.post(apiPath.getUserLoginList, {userId: userId, page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              dataSource1: res.data[0].data, total1: res.data[1].total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  initTableData2(page) {
    let userId = window.localStorage.getItem('userId');
    api.post(apiPath.getUserSendList, {userId: userId, page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              dataSource2: res.data[0].data, total2: res.data[1].total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  initTableData3(page) {
    let userId = window.localStorage.getItem('userId');
    api.post(apiPath.getUserRechargeList, {userId: userId, page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              dataSource3: res.data[0].data, total3: res.data[1].total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  initTableData4(page) {
    let userId = window.localStorage.getItem('userId');
    api.post(apiPath.getUserPurchaseList, {userId: userId, page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              dataSource4: res.data.data, total4: res.data.total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  onChange1 = (pageNumber) => {
    this.initTableData1(pageNumber);
  }

  onChange2 = (pageNumber) => {
    this.initTableData2(pageNumber);
  }

  onChange3 = (pageNumber) => {
    this.initTableData3(pageNumber);
  }

  onChange4 = (pageNumber) => {
    this.initTableData4(pageNumber);
  }

  callback = (key) => {
    console.log(key);
  }

  render() {
    let userId = window.localStorage.getItem('userId');
    return (
      <div className="content-view">
        <TotalMsgComponent />
        <div style={{ marginTop: 50 }}>
          <PersonInfoComponent />
          <div style={{ width: '100%', paddingLeft: 260 }}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="登录记录" key="1">
                <ChartUserDataComponent
                    userId={userId}
                    url={apiPath.getUserLogin}
                />
                <div style={{marginTop: 50}}>
                  <Table dataSource={this.state.dataSource1} columns={columns1} pagination={false}/>
                  <div style={{
                    backgroundColor: '#fff', height: 50, paddingRight: 10
                  }}>
                    <Pagination
                        style={{float: 'right', marginBottom: 20, marginTop: 10}}
                        defaultCurrent={1}
                        onChange={this.onChange1}
                        total={this.state.total1}/>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="发送短信" key="2">
                <ChartUserDataComponent2
                    userId={userId}
                    url={apiPath.getUserSend}
                />
                <div style={{marginTop: 50}}>
                  <Table dataSource={this.state.dataSource2} columns={columns2} pagination={false}/>
                  <div style={{
                    backgroundColor: '#fff', height: 50, paddingRight: 10
                  }}>
                    <Pagination
                        style={{float: 'right', marginBottom: 20, marginTop: 10}}
                        defaultCurrent={1}
                        onChange={this.onChange2}
                        total={this.state.total2}/>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="充值" key="3">
                <ChartUserDataComponent3
                    userId={userId}
                    url={apiPath.getRecharge}
                />
                <div style={{marginTop: 50}}>
                  <Table dataSource={this.state.dataSource3} columns={columns3} pagination={false}/>
                  <div style={{
                    backgroundColor: '#fff', height: 50, paddingRight: 10
                  }}>
                    <Pagination
                        style={{float: 'right', marginBottom: 20, marginTop: 10}}
                        defaultCurrent={1}
                        onChange={this.onChange3}
                        total={this.state.total3}/>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="短信包购买" key="4">
                <ChartUserDataComponent4
                    userId={userId}
                    url={apiPath.getPurchase}
                />
                <div style={{marginTop: 50}}>
                  <Table dataSource={this.state.dataSource4} columns={columns4} pagination={false}/>
                  <div style={{
                    backgroundColor: '#fff', height: 50, paddingRight: 10
                  }}>
                    <Pagination
                        style={{float: 'right', marginBottom: 20, marginTop: 10}}
                        defaultCurrent={1}
                        onChange={this.onChange4}
                        total={this.state.total4}/>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="操作记录" key="5">
                <LoginRecord />
              </TabPane>
            </Tabs>

          </div>
        </div>
      </div>
    );
  }
}

export default PersonInfo;
