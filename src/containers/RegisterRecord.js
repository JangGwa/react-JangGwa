/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import {Link} from 'react-router';
import {Table, Pagination} from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';

const columns = [{
  title: '用户ID', dataIndex: 'userId', key: 'userId',
}, {
  title: '姓名', dataIndex: 'userName', key: 'userName', render: (a,b,c) => {
    return <a onClick={() => {window.localStorage.setItem('userId', b.userId);window.location.hash='/info'}}>{a}</a>;
  },
}, {
  title: '手机号', dataIndex: 'userPhone', key: 'userPhone',
}, {
  title: '注册时间', dataIndex: 'createTime', key: 'createTime',
}, {
  title: '最后操作时间', dataIndex: 'LastTime', key: 'LastTime',
}, {
  title: '组织详情', dataIndex: 'orgDetail', key: 'orgDetail',
}, {
  title: '发送短信总量', dataIndex: 'sendCount', key: 'sendCount',
}, {
  title: '成功总量', dataIndex: 'sendSuccessCount', key: 'sendSuccessCount',
}, {
  title: '充值金额', dataIndex: 'accountBalance', key: 'accountBalance',
}, {
  title: '短信包购买', dataIndex: 'accountSms', key: 'accountSms',
}];

class RegisterRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
    }
  }

  componentDidMount() {
    this.initTableData(1);
  }

  initTableData(page) {
    api.post(apiPath.getRegTab, {page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          console.log('table' + JSON.stringify(res))
          if (res.status === 'success') {
            this.setState({
              dataSource: res.data.data, total: res.data.total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  onChange = (pageNumber) => {
    this.initTableData(pageNumber);
  }

  render() {
    return (
        <div className="content-view">
          <TotalMsgComponent />
          <ChartDataComponent
              url={apiPath.getRegister}
              chartStyle={{marginTop: 50}}
          />
          <div style={{marginTop: 50}}>
            <Table dataSource={this.state.dataSource} columns={columns} pagination={false}/>
            <div style={{
              backgroundColor: '#fff', height: 50, paddingRight: 10
            }}>
              <Pagination
                  style={{float: 'right', marginBottom: 20, marginTop: 10}}
                  defaultCurrent={1}
                  onChange={this.onChange}
                  total={this.state.total}/>
            </div>
          </div>
        </div>
    );
  }
}

export default RegisterRecord;
