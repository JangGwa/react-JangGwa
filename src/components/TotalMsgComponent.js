/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import { Card } from 'antd';
import '../../index.css';

// 页面上方的总数据
class TotalMsgComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <Card>
          <div className="total-msg-view">
            <div className="total-msg-item">
              <div>用户注册</div>
              <div className="total-msg-bottom">
                <span className="total-msg-text">1234</span><span className="dan-wei-text">条</span>
              </div>
            </div>
            <div className="total-msg-item">
              <div>登录次数</div>
              <div className="total-msg-bottom">
                <span className="total-msg-text">1234</span><span className="dan-wei-text">条</span>
              </div>
            </div>
            <div className="total-msg-item">
              <div>发送短信条数</div>
              <div className="total-msg-bottom">
                <span className="total-msg-text">1234</span><span className="dan-wei-text">条</span>
              </div>
            </div>
            <div className="total-msg-item">
              <div>充值总数</div>
              <div className="total-msg-bottom">
                <span className="total-msg-text">1234</span><span className="dan-wei-text">条</span>
              </div>
            </div>
            <div className="total-msg-last-item">
              <div>短信包购买总数</div>
              <div className="total-msg-bottom">
                <span className="total-msg-text">1234</span><span className="dan-wei-text">条</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TotalMsgComponent;