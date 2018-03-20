import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import { colors } from '../../constants';

const StyledDatepicker = styled.div`
  .DayPicker-wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  .DayPicker-WeekdaysRow,
  .DayPicker-Week {
    display: flex;
  }

  .DayPicker-Weekday {
    color: ${colors.type02};
    font: 500 10px/24px 'Roboto';
    text-transform: uppercase;
    width: 24px;
    height: 24px;
    text-align: center;
  }

  .DayPicker-Weekday + .DayPicker-Weekday {
    margin-left: 4px;
  }

  abbr {
    text-decoration: none;
  }

  .DayPicker-Day {
    background-color: ${colors.ui02};
    color: ${colors.brand01};
    font: 400 12px/24px 'Roboto';
    width: 24px;
    height: 24px;
    outline: none;
    text-align: center;
    cursor: pointer;
  }

  .DayPicker-Day + .DayPicker-Day {
    margin-left: 4px;
  }

  .DayPicker-Day--outside {
    background-color: transparent;
    color: ${colors.type03};
  }

  .DayPicker-Week + .DayPicker-Week {
    margin-top: 4px;
  }

  .DayPicker-Day--selected {
    background-color: ${colors.brand01};
    color: ${colors.type04};
    box-shadow: ${colors.brand01} 4px 0 0, ${colors.brand01} -4px 0 0;
  }

  .DayPicker-Day--start {
    border-radius: 4px 0 0 4px;
    background-color: ${darken(0.16, colors.brand01)};
    box-shadow: none;
    box-shadow: ${darken(0.16, colors.brand01)} 4px 0 0;
  }

  .DayPicker-Day--end {
    border-radius: 0 4px 4px 0;
    background-color: ${darken(0.16, colors.brand01)};
    box-shadow: none;
  }

  .DayPicker-Day--start.DayPicker-Day--end {
    border-radius: 4px;
  }

  .DayPicker-Day--disabled {
    color: ${colors.type02};
    cursor: not-allowed;
  }

  .DayPicker-NavBar {
    position: relative;
  }

  .DayPicker-NavButton {
    position: absolute;
    cursor: pointer;
    top: 0;
    margin-top: 2px;
    width: 8px;
    height: 16px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    outline: none;
  }

  .DayPicker-NavButton:hover {
    opacity: 0.8;
  }

  .DayPicker-NavButton--prev {
    left: 0;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxwYXRoIGQ9Ik0uODc2IDguMzF2LS42Mmw3IDcuNTNhLjQ1Mi40NTIgMCAwIDEtLjA0Ny42NjQuNTIyLjUyMiAwIDAgMS0uNzA1LS4wNDVsLTctNy41M2EuNDUuNDUgMCAwIDEgMC0uNjE5bDctNy41M2EuNTIyLjUyMiAwIDAgMSAuNzA1LS4wNDQuNDUyLjQ1MiAwIDAgMSAuMDQ3LjY2NGwtNyA3LjUzeiIgZmlsbD0iIzE3ODVGQiIvPjwvc3ZnPg==);
  }

  .DayPicker-NavButton--next {
    right: 0;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxwYXRoIGQ9Ik03LjEyNCA4LjMxbC03LTcuNTNBLjQ1Mi40NTIgMCAwIDEgLjE3LjExNmEuNTIyLjUyMiAwIDAgMSAuNzA1LjA0NWw3IDcuNTNhLjQ1LjQ1IDAgMCAxIDAgLjYxOWwtNyA3LjUzYS41MjIuNTIyIDAgMCAxLS43MDUuMDQ0LjQ1Mi40NTIgMCAwIDEtLjA0Ny0uNjY0bDctNy41M3YuNjJ6IiBmaWxsPSIjMTc4NUZCIi8+PC9zdmc+);
  }

  .DayPicker-NavButton--interactionDisabled,
  .DayPicker-NavButton--interactionDisabled:hover {
    cursor: not-allowed;
    opacity: 0.3;
  }

  .DayPicker-Caption {
    margin-bottom: 8px;
    text-align: center;
  }

  .DayPicker-Caption div {
    display: inline-block;
    position: relative;
    z-index: 2;
    overflow: hidden;
    margin: 0;
    padding: 0 3px;
    font: 500 12px/20px 'Roboto';
    background-color: #fff;
  }

  .DayPicker-Caption select {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    margin: 0;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

const YearMonthForm = ({ date, fromMonth, toMonth, localeUtils, onChange }) => {
  const minYear = fromMonth.getFullYear();
  const minMonth = fromMonth.getMonth();
  const maxYear = toMonth.getFullYear();
  const maxMonth = toMonth.getMonth();
  const months = localeUtils.getMonths();
  const years = Array(maxYear - minYear + 1)
    .fill()
    .map((_, idx) => minYear + idx);

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <div>
        {months[currentMonth]}
        <select name="month" onChange={handleChange} value={currentMonth}>
          {months.map((month, i) => {
            const disabled =
              (currentYear === minYear && i < minMonth) ||
              (currentYear === maxYear && i > maxMonth);
            return (
              <option key={month} value={i} disabled={disabled}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {currentYear}
        <select name="year" onChange={handleChange} value={currentYear}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

class Datepicker extends Component {
  state = {
    month: this.props.initialMonth || this.props.fromMonth,
    from: null,
    to: null,
    enteredTo: null
  };

  constructor(props) {
    super(props);
    this.disabledDays = props.disabledDays.concat([
      { before: this.props.fromMonth }
    ]);
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick = (day, { disabled, selected }) => {
    const triggerRange = () => {
      const { from, to } = this.state;
      onDayClick && onDayClick({ from, to });
    };

    if (disabled) {
      return;
    }

    const { from, to } = this.state;
    const { onDayClick } = this.props;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState((state) => {
        return { ...state, from: day, to: null, enteredTo: null };
      }, triggerRange);
    } else {
      this.setState((state) => {
        return { ...state, to: day, enteredTo: day };
      }, triggerRange);
    }
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  handleDayMouseEnter = (day) => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  };

  handleYearMonthChange = (month) => {
    this.setState({ month });
  };

  render() {
    const { fromMonth, toMonth } = this.props;
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const selectedDays = [from, { from, to: enteredTo }];

    return (
      <StyledDatepicker>
        <DayPicker
          fixedWeeks
          firstDayOfWeek={1}
          numberOfMonths={1}
          month={this.state.month}
          fromMonth={fromMonth}
          toMonth={toMonth}
          selectedDays={selectedDays}
          disabledDays={this.disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          captionElement={({ date, localeUtils }) => (
            <YearMonthForm
              fromMonth={fromMonth}
              toMonth={toMonth}
              date={date}
              localeUtils={localeUtils}
              onChange={this.handleYearMonthChange}
            />
          )}
        />
      </StyledDatepicker>
    );
  }
}

Datepicker.defaultProps = {
  disabledDays: []
};

Datepicker.propTypes = {
  onDayClick: PropTypes.func,
  disabledDays: PropTypes.array,
  modifiers: PropTypes.array,
  fromMonth: PropTypes.instanceOf(Date).isRequired,
  toMonth: PropTypes.instanceOf(Date).isRequired,
  initialMonth: PropTypes.instanceOf(Date)
};

export default Datepicker;
