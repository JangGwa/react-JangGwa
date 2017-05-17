/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import {Card, message} from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import Cookie from '../utils/Cookie';
import '../../index.css';

// 页面上方的总数据
class TotalMsgComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      registerNum: 0, loginNum: 0, sendNum: 0, rechargeNum: 0, smsNum: 0,
    }
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    api.post(apiPath.getBase, {})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              registerNum: res.data.register,
              loginNum: res.data.login,
              sendNum: res.data.send,
              rechargeNum: res.data.recharge,
              smsNum: res.data.sms,
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  render() {
    return (
        <div>
          <Card>
            <div className="total-msg-view">
              <div className="total-msg-item">
                <div>用户注册</div>
                <div className="total-msg-bottom">
                  <span className="total-msg-text">{this.state.registerNum}</span><span className="dan-wei-text">条</span>
                </div>
              </div>
              <div className="total-msg-item">
                <div>登录次数</div>
                <div className="total-msg-bottom">
                  <span className="total-msg-text">{this.state.loginNum}</span><span className="dan-wei-text">条</span>
                </div>
              </div>
              <div className="total-msg-item">
                <div>发送短信条数</div>
                <div className="total-msg-bottom">
                  <span className="total-msg-text">{this.state.sendNum}</span><span className="dan-wei-text">条</span>
                </div>
              </div>
              <div className="total-msg-item">
                <div>充值总数</div>
                <div className="total-msg-bottom">
                  <span className="total-msg-text">{this.state.rechargeNum}</span><span className="dan-wei-text">条</span>
                </div>
              </div>
              <div className="total-msg-last-item">
                <div>短信包购买总数</div>
                <div className="total-msg-bottom">
                  <span className="total-msg-text">{this.state.smsNum}</span><span className="dan-wei-text">条</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
    );
  }
}

export default TotalMsgComponent;