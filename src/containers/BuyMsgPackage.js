/**
 * Created by zkw on 2017/5/16.
 */
import React from 'react';
import { Link } from 'react-router';
import {Table, Pagination, Button} from 'antd';
import {api, apiPath} from '../utils/WebAPI';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';



class BuyMsgPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
    }
  }
  componentDidMount() {
    this.initTableData(1);
  }

  initTableData(page) {
    api.post(apiPath.getTrade, {action: 1, page: page, size: 10, tradeType: 2})
        .then(function (response) {
          let res = response.data;
          if (res.status === 'success') {
            this.setState({
              dataSource: res.data.data, total: res.data.total
            });
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))
  }

  onChange = (pageNumber) => {
    this.initTableData(pageNumber);
  }

  render() {
    const columns = [{
      title: '订单ID',
      dataIndex: 'tradeNum',
      key: 'tradeNum',
    }, {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width:60,
    }, {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 70,
      render: (a,b,c) => {
        return <a onClick={() => {window.localStorage.setItem('userId', b.userId);window.location.hash='/info'}}>{a}</a>;
      },
    }, {
      title: '手机号',
      dataIndex: 'userPhone',
      key: 'userPhone',
      width: 100,
    }, {
      title: '购买时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '购买类型',
      dataIndex: 'tradeSubject',
      key: 'tradeSubject',
    }, {
      title: '金额总计',
      dataIndex: 'tradePrice',
      key: 'tradePrice',
    }, {
      title: '支付方式',
      dataIndex: 'paymentType',
      key: 'paymentType',
    }, {
      title: '购买状态',
      dataIndex: 'buyStatus',
      key: 'buyStatus',
      width: 100,
      render: (a,b,c) => {
        if (b.tradeStatus === 0) {
          return <Button type="primary" style={{height: 25, border: '1px solid #797979', backgroundColor: '#797979'}}>已关闭</Button>
        } else if (b.tradeStatus === 1) {
          return <Button type="primary" style={{height: 25, border: '1px solid #23d134', backgroundColor: '#23d134'}}>待支付</Button>
        } else if (b.tradeStatus === 2) {
          return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已支付</Button>
        } else if (b.tradeStatus === 3) {
          return <Button type="primary" style={{height: 25, border: '1px solid #3dccff', backgroundColor: '#3dccff'}}>已完成</Button>
        }
      }
    }];
    return (
        <div className="content-view">
          <TotalMsgComponent />
          <ChartDataComponent
              url={apiPath.getPurchase}
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
        </div>
    );
  }
}

export default BuyMsgPackage;
