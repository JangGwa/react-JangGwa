/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Tabs, Table, Pagination } from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import moment from 'moment';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartUserDataComponent from '../components/ChartUserDataComponent';
import TableComponent from '../components/TableComponent';
import PersonInfoComponent from '../components/PersonInfoComponent';

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

const dataSource3 = [{
  key: '1',
  id: 1,
  rechargeTime: '2017年1月1日',
  rechargeNum: 100,
  payType: '操作',
  rechargeStatus: '状态',
}];

const columns3 = [{
  title: '订单ID',
  dataIndex: 'id',
  key: 'id',
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

const columns4 = [{
  title: '订单ID',
  dataIndex: 'id',
  key: 'id',
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
    }
  }
  componentDidMount() {
    this.initTableData1(1);
    this.initTableData2(1);
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
          console.log('table2'+JSON.stringify(response))
          if (res.status === 'success') {
            this.setState({
              dataSource2: res.data[0].data, total2: res.data[1].total
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
                <ChartUserDataComponent
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
                <ChartUserDataComponent />
                <TableComponent
                    columns={columns3}
                    dataSource={dataSource3}
                />
              </TabPane>
              <TabPane tab="短信包购买" key="4">
                <ChartUserDataComponent />
                <TableComponent
                    columns={columns4}
                    dataSource={dataSource3}
                />
              </TabPane>
              <TabPane tab="操作记录" key="5">
                <ChartUserDataComponent />
                <TableComponent
                    columns={columns5}
                    dataSource={dataSource3}
                />
              </TabPane>
            </Tabs>

          </div>
        </div>
      </div>
    );
  }
}

export default PersonInfo;
