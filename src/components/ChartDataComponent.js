/**
 * Created by zkw on 2017/5/15.
 */
import React, { PropTypes } from 'react';
import { DatePicker, Menu, Dropdown, Icon, Button } from 'antd';
import moment from 'moment';
import {api, apiPath} from '../utils/WebAPI';
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
            />
          </div>
          <Button type="primary" style={{ marginRight: 10 }} onClick={this.exportModal}>导出Excel</Button>
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
