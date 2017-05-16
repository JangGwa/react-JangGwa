/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Tabs } from 'antd';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';
import TableComponent from '../components/TableComponent';
import PersonInfoComponent from '../components/PersonInfoComponent';

const TabPane = Tabs.TabPane;

const dataSource1 = [{
  key: '1',
  loginTime: '2017年1月1日',
  operationTime: '1h 3min',
  operationNum: 1,
}, {
  key: '2',
  loginTime: '2017年1月1日',
  operationTime: '1h 3min',
  operationNum: 1,
}];

const columns1 = [{
  title: '登录时间',
  dataIndex: 'loginTime',
  key: 'loginTime',
}, {
  title: '操作时长',
  dataIndex: 'operationTime',
  key: 'operationTime',
}, {
  title: '操作次数',
  dataIndex: 'operationNum',
  key: 'operationNum',
}];

const dataSource2 = [{
  key: '1',
  sendTime: '2017年1月1日',
  msgType: '纯文字短信',
  msgSign: '校园通知',
  sendNum: 100,
  successNum: 100,
  readNum: 100,
  replyNum: 100,
  operation: '操作',
}, {
  key: '2',
  sendTime: '2017年1月1日',
  msgType: '纯文字短信',
  msgSign: '校园通知',
  sendNum: 100,
  successNum: 100,
  readNum: 100,
  replyNum: 100,
  operation: '操作',
}];

const columns2 = [{
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

const dataSource4 = [{
  key: '1',
  id: 1,
  buyTime: '2017年1月1日',
  buyType: '支付宝',
  moneyCount: 100,
  payType: '操作',
  buyStatus: '状态',
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

const dataSource5 = [{
  key: '1',
  operationTime: '2017年1月1日',
  operationType: '支付宝',
  operationContent: '操作',
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

  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <div className="content-view">
        <TotalMsgComponent />
        <div style={{ marginTop: 50 }}>
          <PersonInfoComponent />
          <div style={{ width: '100%', paddingLeft: 260 }}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="登录记录" key="1">
                <ChartDataComponent />
                <TableComponent
                    columns={columns1}
                    dataSource={dataSource1}
                />
              </TabPane>
              <TabPane tab="发送短信" key="2">
                <ChartDataComponent />
                <TableComponent
                    columns={columns2}
                    dataSource={dataSource2}
                />
              </TabPane>
              <TabPane tab="充值" key="3">
                <ChartDataComponent />
                <TableComponent
                    columns={columns3}
                    dataSource={dataSource3}
                />
              </TabPane>
              <TabPane tab="短信包购买" key="4">
                <ChartDataComponent />
                <TableComponent
                    columns={columns4}
                    dataSource={dataSource4}
                />
              </TabPane>
              <TabPane tab="操作记录" key="5">
                <ChartDataComponent />
                <TableComponent
                    columns={columns5}
                    dataSource={dataSource5}
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
