/**
 * Created by zkw on 2017/5/15.
 */
import React, { PropTypes } from 'react';
import { DatePicker, Menu, Dropdown, Icon, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a>最近30天</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a>最近7天</a>
    </Menu.Item>
  </Menu>
);

class ChartDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentDays: '最近30天',
    };
  }

  exportModal = () => {

  }

  render() {
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
              style={{ marginRight: 10, width: 200 }}
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}
            />
          </div>
          <Button type="primary" style={{ marginRight: 10 }} onClick={this.exportModal}>导出Excel</Button>
        </div>
      </div>
    );
  }
}

ChartDataComponent.propTypes = {
  chartStyle: PropTypes.style,
};

export default ChartDataComponent;
