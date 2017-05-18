/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import {Table, Pagination, Button, Modal, Tag} from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import '../../index.css';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';
import TableComponent from '../components/TableComponent';

class SendMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
      detailModalVisible: false,
      detailModalVisible2: false,
      textContent: '',// 纯文字和反馈短信文字
      title: '',
      from: '',
      content: '',
      label1: [],
      label2: [],
      label3: [],
      label4: [],
    }
  }
  componentDidMount() {
    this.initTableData(1);
  }

  initTableData(page) {
    api.post(apiPath.getSendList, {action: 1, page: page, size: 10})
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

  lookDetail = (id) => {
    this.setState({detailModalVisible: true});
    api.post(apiPath.getDetailSend, {sendId: id})
        .then(function (response) {
          let res = response.data;
          console.log('lookDetail'+JSON.stringify(res));
          let label1 = [];
          let label2 = [];
          let label3 = [];
          let label4 = [];
          if (res.status === 'success') {
            res.data.source.map((item, index)=> {
              if (item.type === 'TextInput') {
                label1.push(item.label);
              } else if (item.type === 'RadioInput') {
                label2.push(item.label);
              } else if (item.type === 'CheckboxInput') {
                label3.push(item.label);
              } else if (item.type === 'UploadFile') {
                label4.push(item.label);
              }
            })
            this.setState({
              title: res.data.title, from: res.data.from, content: res.data.content, label1: label1, label2: label2, label3: label3, label4: label4
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  lookDetail2 = (id) => {
    this.setState({detailModalVisible2: true});
    api.post(apiPath.getDetailSend, {sendId: id})
        .then(function (response) {
          let res = response.data;
          console.log('lookDetail2'+JSON.stringify(res))
          if (res.status === 'success') {
            this.setState({
              textContent: res.data.content,
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }
  render() {
    const columns = [{
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
    }, {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (a,b,c) => {
        return <a onClick={() => {window.localStorage.setItem('userId', b.user_id);window.location.hash='/info'}}>{a}</a>;
      },
    }, {
      title: '手机号',
      dataIndex: 'user_phone',
      key: 'user_phone',
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
      render: (a,b,c) => {
        let id = b.send_id;
        if (b.send_type === '链接短信') {
          return <Button style={{width: 80}} type="primary" onClick={() => this.lookDetail(id)}>详情查看</Button>;
        } else {
          return <Button style={{width: 80}} type="primary" onClick={() => this.lookDetail2(id)}>详情查看</Button>;
        }
      },
    }];
    return (
        <div className="content-view">
          <TotalMsgComponent />
          <ChartDataComponent
              type={3}
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
          <Modal title="短信详情" visible={this.state. detailModalVisible}
                 onOk={() => this.setState({detailModalVisible: false})} onCancel={() => this.setState({detailModalVisible: false})}
          >
            <div style={{marginTop: 5}}><Tag className="tag-view2">短信标题</Tag><span>{this.state.title}</span></div>
            <div style={{marginTop: 5}}><Tag className="tag-view3">短信来源</Tag><span>{this.state.from}</span></div>
            <div style={{marginTop: 5}}><Tag className="tag-view4">短信内容</Tag></div>
            <div dangerouslySetInnerHTML={{__html: this.state.content}} style={{marginLeft: 3, marginTop: 5}}></div>
            <div style={{marginTop: 5}}><Tag className="tag-view1" style={{marginTop: 40}}>反馈表单</Tag></div>
            {this.state.label1.map((item, index)=><div style={{marginTop: 5}}><Tag className="tag-view2">输入框</Tag><span>{item}</span></div>)}
            {this.state.label2.map((item, index)=><div style={{marginTop: 5}}><Tag className="tag-view3">单选框</Tag><span>{this.state.label2}</span></div>)}
            {this.state.label3.map((item, index)=><div style={{marginTop: 5}}><Tag className="tag-view5">多选框</Tag><span>{this.state.label3}</span></div>)}
            {this.state.label4.map((item, index)=><div style={{marginTop: 5}}><Tag className="tag-view4">图片</Tag><span style={{marginLeft: 10}}>{this.state.label4}</span></div>)}
          </Modal>

          <Modal title="短信详情" visible={this.state. detailModalVisible2}
                 onOk={() => this.setState({detailModalVisible2: false})} onCancel={() => this.setState({detailModalVisible2: false})}
          >
            <div><Tag className="tag-view4">短信内容</Tag></div>
            <p style={{marginLeft: 3, marginBottom: 70, marginTop: 5}}>{this.state.textContent}</p>
          </Modal>
        </div>
    );
  }
}

export default SendMsg;
