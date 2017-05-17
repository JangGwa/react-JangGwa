/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import {api, apiPath} from '../utils/WebAPI';

class PersonInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      userName: '',
      phone: 0,
      createTime: '',
      modifyTime: '',
      accountBalance: 0,
      accountTextRemain: 0,
      accountReplyRemain: 0,
      accountLinkRemain: 0,
      org: [],
    }
  }
  componentDidMount() {
    this.initPersonInfo();
  }

  initPersonInfo() {
    let userId = window.localStorage.getItem('userId');
    api.post(apiPath.getUserInfo, {userId: userId})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              userId: res.data.user_id,
              userName: res.data.user_name,
              phone: res.data.phone,
              createTime: res.data.create_time,
              modifyTime: res.data.modify_time,
              accountBalance: res.data.account_balance,
              accountTextRemain: res.data.account_text_remain,
              accountReplyRemain: res.data.account_reply_remain,
              accountLinkRemain: res.data.account_link_remain,
              org: res.data.org,

            })
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }


  render() {
    return (
        <div style={{width: 240, height: 600, backgroundColor: '#fff', float: 'left'}}>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>用户ID:</span><span style={{marginLeft: 10}}>{this.state.userId}</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>姓名:</span><span style={{marginLeft: 22}}>{this.state.userName}</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>手机号:</span><span style={{marginLeft: 10}}>{this.state.phone}</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>注册时间:</span>
            <div>{this.state.createTime}</div>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>最后操作时间:</span>
            <div>{this.state.modifyTime}</div>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>组织详情:</span>
            {this.state.org.map((item)=>{
              return <div><span>{item.org_name}</span><span style={{marginLeft: 3}}>({item.org_count})</span></div>
            })}
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>账户余额:</span><span style={{marginLeft: 10}}>{this.state.accountBalance}</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>纯文字短信余量:</span><span style={{marginLeft: 10}}>{this.state.accountTextRemain}</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>文字反馈短信余量:</span><span style={{marginLeft: 10}}>{this.state.accountReplyRemain}</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>链接反馈短信余量:</span><span style={{marginLeft: 10}}>{this.state.accountLinkRemain}</span>
          </div>
        </div>
    );
  }
}

export default PersonInfoComponent;
