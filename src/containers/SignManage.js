/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import { Modal } from 'antd';
import TotalMsgComponent from '../components/TotalMsgComponent';
import {api, apiPath} from '../utils/WebAPI';
import TableComponent from '../components/TableComponent';

class SignManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }
  }
  componentDidMount() {
    this.initTableData();
  }

  initTableData() {
    api.post(apiPath.getSign, {})
        .then(function (response) {
          let res = response.data;
          console.log('table'+JSON.stringify(res.data))
          if (res.status === 'success') {
            this.setState({dataSource: res.data,});
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  render() {
    const columns = [{
      title: '申请时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '申请签名',
      dataIndex: 'signature_name',
      key: 'signature_name',
    }, {
      title: '申请用户',
      dataIndex: 'user_name',
      key: 'user_name',
      render: text => <Link to="/info">{text}</Link>,
    }, {
      title: '上传资料',
      dataIndex: 'upload',
      key: 'upload',
      render: (a,b,c) => {
        if (b.user_name === null) {
          return '';
        } else {
          return <div>
            <a href={b.url1}>文件1.doc</a><br />
            <a href={b.url2}>文件2.doc</a>
          </div>
        }
      }
    }, {
      title: '状态',
      dataIndex: 'trade_status',
      key: 'trade_status',
      render: (a,b,c) => {
        if (b.user_name === null) {
          return '';
        } else {
          if (b.status === 1) {
            return '已通过';
          } else if (b.status === 0) {
            return '待审核';
          } else if (b.status === -1) {
            return '已拒绝';
          }
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 120,
      render: (a,b,c) => {
        if (b.user_name === null) {
          return '';
        } else {
          if (b.status === 1) {
            return <div style={{color: '#f99b62', fontSize: 12,
              cursor: 'pointer'}}>拒绝</div>
          } else if (b.status === 0) {
            return <div>
            <span style={{
              borderRight: '1px solid #82cef4', paddingRight: 10, color: '#4fcbfe', fontSize: 12, cursor: 'pointer'
            }}>通过</span>
              <span style={{
                color: '#f99b62', paddingLeft: 10, fontSize: 12, cursor: 'pointer'
              }}>拒绝</span>
            </div>
          } else if (b.status === -1) {
            return  <div style={{
               color: '#4fcbfe', fontSize: 12, cursor: 'pointer'
            }}>通过</div>
          }
        }

      }
    }];
    return (
      <div className="content-view">
        <TotalMsgComponent />
        <TableComponent
          columns={columns}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}

export default SignManage;
