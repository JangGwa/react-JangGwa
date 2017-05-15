/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import '../index.css';

const { Header, Sider, Content } = Layout;

class root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
    }
  }

  handleClick=(e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Layout>
        <Header>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{color: '#FFF', fontSize: 17}}>慕云短信后台管理系统</span>
            <div className="quit-view">
              <Icon type="poweroff" style={{color: '#fff'}} />
              <span style={{color: '#fff', marginLeft: 8, fontSize: 13}}>退出</span>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider>
            <Menu
              theme="Light"
              style={{ width: 200 }}
              onClick={this.handleClick}
              selectedKeys={this.state.current}
              mode="inline"
            >
              <Menu.Item key="1">用户注册</Menu.Item>
              <Menu.Item key="2">登陆记录</Menu.Item>
              <Menu.Item key="3">发送短信</Menu.Item>
              <Menu.Item key="4">充值</Menu.Item>
              <Menu.Item key="5">短信包购买</Menu.Item>
            </Menu>
          </Sider>
          <Content></Content>
        </Layout>
      </Layout>
    );
  }
}

export default root;

