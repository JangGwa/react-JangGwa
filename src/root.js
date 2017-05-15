/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import '../index.css';
import RegisterRecord from './containers/RegisterRecord';
import LoginRecord from './containers/LoginRecord';

const { Header, Sider, Content } = Layout;

class root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
    }
  }

  handleClick = (e) => {
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
              <Menu.Item key="1"><Link to="/register">用户注册</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/login">登陆记录</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/send">发送短信</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/recharge">充值</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/buy">短信包购买</Link></Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Router history={browserHistory}>
              <Route path="/register" component={RegisterRecord} />
              <Route path="/login" component={LoginRecord} />
              <Route path="/send" component={RegisterRecord} />
              <Route path="/recharge" component={RegisterRecord} />
              <Route path="/buy" component={RegisterRecord} />
            </Router>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default root;

