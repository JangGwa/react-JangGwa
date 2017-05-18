/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import {Table, Pagination, Button} from 'antd';
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
  render: (a,b,c) => {
    return <a onClick={() => {window.localStorage.setItem('userId', b.userId);window.location.hash='/info'}}>{a}</a>;
  },
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
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

class SendMsg extends React.Component {
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
    api.post(apiPath.getSendList, {page: page, size: 10})
        .then(function (response) {
          let res = response.data;
          console.log('sendtable'+JSON.stringify(res))
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
              url={apiPath.getSend}
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

export default SendMsg;
