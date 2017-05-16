/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Card, Input, Button } from 'antd';
import '../../index.css';


class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-main-view">
        <div style={{ color: '#FFF', fontSize: 20, marginTop: -30 }}>慕云短信后台管理系统</div>
        <Card style={{ width: 300, height: 200, textAlign: 'center', marginTop: 30 }}>
          <Input placeholder="用户名" style={{ marginTop: 15 }} />
          <Input placeholder="密码" style={{ marginTop: 20 }} />
          <Button type="primary" style={{ marginTop: 20, width: 250 }}>登录</Button>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
