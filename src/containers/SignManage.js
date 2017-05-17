/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
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
        }
        return <div>
          <a href={b.url1}>文件1.doc</a><br />
          <a href={b.url2}>文件2.doc</a>
        </div>}
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (a,b,c) => {

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
