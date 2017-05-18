/**
 * Created by zkw on 2017/5/15.
 */
import React, { PropTypes } from 'react';
import { DatePicker, Menu, Dropdown, Icon, Button, Modal, Input } from 'antd';
import moment from 'moment';
import {api, apiPath} from '../utils/WebAPI';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY年MM月DD日';

class ChartDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentDays: '最近30天',
      dates: [],
      counts: [],
      url: '',
      excelVisible: false,
      startPageNum: 0,
      endPageNum: 0,
    };
  }

  componentDidMount() {
    this.initChartData(this.props.url, moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    window.onresize = () => {
      this.homeSetEchart();
    }
  }

  homeSetEchart = () => {
    var myChart = echarts.init(document.getElementById("fchart"),'walden');

    // 指定图表的配置项和数据
    var option = {
      tooltip: {},
      xAxis: {
        data: this.state.dates
      },
      yAxis: {},
      series: [{
        type: 'bar',
        data: this.state.counts
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  initChartData(url, startTime, endTime) {
    api.post(url, {startTime: startTime, endTime: endTime})
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

  exportModal = () => {
    this.setState({
      excelVisible: true,
    })
  }

  handleExcel = () => {
    let type = this.props.type;
    let url = '';
    if (type === 4) {
      api.post(apiPath.getTrade, {action: 2, page: this.state.startPageNum, size: 10*this.state.endPageNum, tradeType: 1})
          .then(function (response) {
            let res = response.data;
            console.log('excel'+JSON.stringify(res))
            if (res.status === 'success') {
              window.open(res.data.fileLink);
              this.setState({
                excelVisible: false
              })
            } else {
              // message.error('网络请求失败');
            }
          }.bind(this))
    } else if (type === 5) {
      api.post(apiPath.getTrade, {action: 2, page: this.state.startPageNum, size: 10*this.state.endPageNum, tradeType: 2})
          .then(function (response) {
            let res = response.data;
            console.log('excel'+JSON.stringify(res))
            if (res.status === 'success') {
              window.open(res.data.fileLink);
              this.setState({
                excelVisible: false
              })
            } else {
              // message.error('网络请求失败');
            }
          }.bind(this))
    }
    switch (type) {
      case 1: // 用户注册
        url = apiPath.getRegTab;
        break;
      case 2: // 登陆记录
        url = apiPath.getLoginList;
        break;
      case 3: // 发送短信
        url = '';
        break;
      default:
        url = '';
        break;
    }
    api.post(url, {action: 2, page: this.state.startPageNum, size: 10*this.state.endPageNum})
        .then(function (response) {
          let res = response.data;
          console.log('excel'+JSON.stringify(res))
          if (res.status === 'success') {
            window.open(res.data.fileLink);
            this.setState({
              excelVisible: false
            })
          } else {
            // message.error('网络请求失败');
          }
        }.bind(this))

  }

  datePickerChange = (dates, dateStrings) => {
    let startDateYear = dateStrings.toString().slice(0,4);
    let startDateMonth = dateStrings.toString().slice(5,7);
    let startDateDay = dateStrings.toString().slice(8,10);
    let endDateYear = dateStrings.toString().slice(12,16);
    let endDateMonth = dateStrings.toString().slice(17,19);
    let endDateDay = dateStrings.toString().slice(20,22);
    let startDate = startDateYear+'-'+startDateMonth+'-'+startDateDay;
    let endDate = endDateYear+'-'+endDateMonth+'-'+endDateDay;
    this.initChartData(this.props.url, startDate, endDate);
  }

  render() {
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a onClick={()=>{this.setState({recentDays: '最近30天'});this.initChartData(this.props.url, moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));}}>最近30天</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <a onClick={()=>{this.setState({recentDays: '最近7天'});this.initChartData(this.props.url, moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));}}>最近7天</a>
          </Menu.Item>
        </Menu>
    );
    return (
      <div style={this.props.chartStyle} className="chart-data-view">
        <div className="chart-data-top-view">
          <div className="chart-data-top-left-view">
            <div style={{ borderRight: '1px solid #e4e4e4', marginRight: 10, marginLeft: 10, paddingRight: 5 }}>
              <Dropdown overlay={menu} trigger={['click']} style={{ marginTop: 5, }}>
                <div style={{ cursor: 'pointer' }}>{this.state.recentDays} <Icon type="down" /></div>
              </Dropdown>
            </div>
            <RangePicker
              style={{ marginRight: 10, width: 250 }}
              format={dateFormat}
              onChange={this.datePickerChange}
            />
          </div>
          <Button type="primary" style={{ marginRight: 10 }} onClick={this.exportModal}>导出Excel</Button>
          <Modal title="Excel导出" visible={this.state.excelVisible}
                 onOk={this.handleExcel} onCancel={()=>this.setState({excelVisible: false})}
          >
            <div>请选择导出的页数</div>
            <div style={{marginTop: 10}}>
              <span>起始页数</span>
              <Input placeholder="起始页数" onChange={(e)=>this.setState({startPageNum: e.target.value})} style={{width: 100, marginLeft: 10}}/>
            </div>
            <div style={{marginBottom: 30, marginTop: 10}}>
              <span>结束页数</span>
              <Input placeholder="结束页数" onChange={(e)=>this.setState({endPageNum: e.target.value})} style={{width: 100, marginLeft: 10}}/>
            </div>
          </Modal>
        </div>
        <div id="fchart" style={{ height: 300 }}></div>
      </div>
    );
  }
}

ChartDataComponent.propTypes = {
  chartStyle: PropTypes.style,
  dates: PropTypes.Array,
  counts: PropTypes.Array,
};

export default ChartDataComponent;
