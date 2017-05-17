/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import { Modal, Icon, Button, Input, message, Table, Pagination } from 'antd';
import TotalMsgComponent from '../components/TotalMsgComponent';
import {api, apiPath} from '../utils/WebAPI';
import TableComponent from '../components/TableComponent';

class SignManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      agreeVisible: false,
      cancelVisible: false,
      signatureId: 0,
      c: 0,
      reason: '',
      total: '',
    }
  }
  componentDidMount() {
    this.initTableData(1);
  }

  initTableData(page) {
    api.post(apiPath.getSign, {page: page, size: 10})
        .then(function (response) {
          console.log('ss'+JSON.stringify(response.data.data))
          let res = response.data;
          if (res.status === 'success') {
            this.setState({dataSource: res.data[0].data, total: res.data[1].total});
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  agreeModal = (id, c) => {
    this.setState({
      agreeVisible: true,
      cancelVisible: false,
      signatureId: id,
      c: c,
    })
  }

  cancelModal = (id, c) => {
    this.setState({
      agreeVisible: false,
      cancelVisible: true,
      signatureId: id,
      c: c,
    })
  }

  handleAgree = () => {
    this.setState({
      agreeVisible: false,
      cancelVisible: false,
    })
    api.post(apiPath.passSign, {signatureId: this.state.signatureId})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            let dataSource = this.state.dataSource;
            dataSource[this.state.c].status = 1;
            this.setState({
              dataSource: dataSource
            })
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  handleCancel = () => {
    if (this.state.reason.trim().length === 0) {
      message.info('请输入审核不通过的原因');
      return;
    } else {
      this.setState({
        agreeVisible: false, cancelVisible: false,
      })
      api.post(apiPath.cancelSign, {signatureId: this.state.signatureId, reason: this.state.reason})
          .then(function (response) {
            let res = response.data;
            if (res.status === 'success') {
              let dataSource = this.state.dataSource;
              dataSource[this.state.c].status = -1;
              this.setState({
                dataSource: dataSource
              })
            } else {
              // message.error('网络请求失败');
            }
          }.bind(this))
    }
  }

  onChange = (pageNumber) => {
    this.initTableData(pageNumber);
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
      render: (a,b,c) => {
        return <a onClick={() => {window.localStorage.setItem('userId', b.userId);window.location.hash='/info'}}>{a}</a>;
      },
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
              cursor: 'pointer'}} onClick={()=>this.cancelModal(b.signature_id, c)}>拒绝</div>
          } else if (b.status === 0) {
            return <div>
            <span style={{
              borderRight: '1px solid #82cef4', paddingRight: 10, color: '#4fcbfe', fontSize: 12, cursor: 'pointer'
            }} onClick={()=>this.agreeModal(b.signature_id,c)}>通过</span>
              <span style={{
                color: '#f99b62', paddingLeft: 10, fontSize: 12, cursor: 'pointer'
              }} onClick={()=>this.cancelModal(b.signature_id, c)}>拒绝</span>
            </div>
          } else if (b.status === -1) {
            return  <div style={{
               color: '#4fcbfe', fontSize: 12, cursor: 'pointer'
            }} onClick={()=>this.agreeModal(b.signature_id,c)}>通过</div>
          }
        }

      }
    }];
    return (
      <div className="content-view">
        <TotalMsgComponent />
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
        <Modal visible={this.state.agreeVisible} closable={false} footer={null} width={330}
        >
          <div>
          <div style={{display: 'flex', marginTop: 10, marginLeft: 10}}>
            <Icon style={{color: '#f8c553', marginTop: 3}} type="question-circle" />
            <div style={{marginLeft: 10}}>
              <div style={{fontSize: 12}}>请确认是否通过签名认证</div>
              <div style={{fontSize: 8, color: '#999999', marginTop: 5}}>确认请点击确定</div>
            </div>
          </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 30}}>
              <Button type="default" style={{height: 25}} onClick={() => this.setState({agreeVisible: false, cancelVisible: false})}>取消</Button>
              <Button type="primary" style={{height: 25, marginLeft: 10}} onClick={this.handleAgree}>确定</Button>
            </div>
          </div>
        </Modal>

        <Modal title="审核不通过的原因" visible={this.state.cancelVisible} onOk={this.handleCancel} onCancel={()=>this.setState({agreeVisible: false, cancelVisible: false})}
        >
          <div>
            <div>请输入审核不通过的原因并点击确定</div>
            <Input style={{marginTop: 10, marginBottom: 10}} type="textarea" placeholder="审核不通过的原因" rows={5} autosize={{ minRows: 5, maxRows: 10 }} onChange={(e)=>this.setState({reason: e.target.value})} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default SignManage;
