/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import {Card, Input, Button, message} from 'antd';
import * as actions from '../actions/LoginAction';
import {connect} from 'react-redux';
import {api, apiPath} from '../utils/WebAPI';
import '../../index.css';
import Cookie from '../utils/Cookie';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '',
    }
  }

  componentDidMount() {
    let userName = window.localStorage.getItem('username');
    if (userName) {
      this.setState({username: userName})
    }
  }

  userNameChange = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  login = () => {
    let username = this.state.username;
    let password = this.state.password;
    api.post(apiPath.login, {name: username, password: password})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            if (res.data !== false) {
              Cookie.set('token', res.data);
              window.localStorage.setItem("username", username);
              window.localStorage.setItem("password", password);
              window.location.hash = '/home';
            } else {
              message.error('用户名或密码错误');
            }
          } else {
            message.error('网络请求失败');
          }
        })
  }

  render() {
    return (
        <div className="login-main-view">
          <div style={{color: '#FFF', fontSize: 20, marginTop: -30}}>慕云短信后台管理系统</div>
          <Card style={{width: 300, height: 200, textAlign: 'center', marginTop: 30}}>
            <Input placeholder="用户名" style={{marginTop: 15}} onChange={this.userNameChange} value={this.state.username}/>
            <Input placeholder="密码" style={{marginTop: 20}} onChange={this.passwordChange}/>
            <Button type="primary" style={{marginTop: 20, width: 250}} onClick={this.login}>登录</Button>
          </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
  // return { users: state.user.list };
}

export default connect(mapStateToProps, actions)(LoginPage);
