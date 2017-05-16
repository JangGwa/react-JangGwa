/**
 * Created by zkw on 2017/5/15.
 */
import React from 'react';
import TotalMsgComponent from '../components/TotalMsgComponent';
import ChartDataComponent from '../components/ChartDataComponent';

class RegisterRecord extends React.Component {
  render() {
    return (
      <div className="content-view">
        <TotalMsgComponent />
        <ChartDataComponent />

      </div>
    );
  }
}

export default RegisterRecord;