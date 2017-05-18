/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import { Link } from 'react-router';
import {Table, Pagination, Button} from 'antd';
import moment from 'moment';
import {api, apiPath} from '../utils/WebAPI';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';
import TableComponent from '../components/TableComponent';

const columns = [{
  title: '用户ID',
  dataIndex: 'user_id',
  key: 'user_id',
}, {
  title: '姓名',
  dataIndex: 'user_name',
  key: 'user_name',
  render: text => <Link to="/info">{text}</Link>,
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
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
    api.post(apiPath.getLoginList, {action: 1, page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          console.log('loginTable'+JSON.stringify(res))
          if (res.status === 'success') {
            this.setState({
              dataSource: res.data[0].data, total: res.data[1].total
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
              type={2}
              url={apiPath.getLogin}
              chartStyle={{ marginTop: 50 }}
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
