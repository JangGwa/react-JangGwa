/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import {api, apiPath} from '../utils/WebAPI';

class PersonInfoComponent extends React.Component {

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
              dates: res.data.dates, counts: res.data.counts
            });
            this.homeSetEchart();
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }


  render() {
    return (
        <div style={{width: 240, height: 600, backgroundColor: '#fff', float: 'left'}}>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>用户ID:</span><span style={{marginLeft: 10}}>0001</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>姓名:</span><span style={{marginLeft: 22}}>0001</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>手机号:</span><span style={{marginLeft: 10}}>15706844099</span>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>注册时间:</span>
            <div>2017年1月1日</div>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>最后操作时间:</span>
            <div>2017年1月1日</div>
          </div>
          <div style={{marginTop: 30, marginLeft: 20}}>
            <span>组织详情:</span>
            <div>组织组织</div>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>账户余额:</span><span style={{marginLeft: 10}}>19元</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>纯文字短信余量:</span><span style={{marginLeft: 10}}>19条</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>文字反馈短信余量:</span><span style={{marginLeft: 10}}>19条</span>
          </div>
          <div style={{marginTop: 10, marginLeft: 20}}>
            <span>链接反馈短信余量:</span><span style={{marginLeft: 10}}>19条</span>
          </div>
        </div>
    );
  }
}

export default PersonInfoComponent;
