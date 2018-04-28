import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DateYear from './date-year';

class Dates extends React.Component {
  static propTypes = {
    dates: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentDate: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.actions.getDates();
  }

  handleDate(date) {
    let state = this.state;

    state.currentDate = date;
    this.setState(state);
  }

  render() {
    let dateYearsList = [];

    if (this.props.dates.years) {
      dateYearsList = this.props.dates.years.map(year =>
        <DateYear
          actions={this.props.actions}
          year={year}
          key={year.id}
          currentDate={this.props.currentDate}
          setDate={this.handleDate.bind(this)} />
      );
    }

    return (
      <div className="dates">
        <h3>
          <i className="fa fa-calendar"></i> Date Captured
        </h3>

        <ul>{dateYearsList}</ul>
      </div>
    );
  }

}

const ReduxDates = connect(state => ({
  dates: state.dates,
  currentDate: state.currentDate
}))(Dates);

export default ReduxDates;
