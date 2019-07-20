import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { IRootState } from './store';

import { Dispatch } from 'redux';
import * as moment from 'moment';
// import * as actions from './store/demo/actions';
import { DemoActions } from './store/demo/types';

import * as db from "./config";
import ReactTable from "react-table";
import "react-table/react-table.css";

// import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
// import 'font-awesome/css/font-awesome.min.css';

const mapStateToProps = ({ demo }: IRootState) => {
  const { list } = demo;
  return { list };
}

const mapDispatcherToProps = (dispatch: Dispatch<DemoActions>) => {
  const responseee = db.getUserdetails();

  // const arr = [];
  // response.docs.forEach(res => {
  //     arr.push(res);
  // });

  return {
    responseee
    // addItem: (responseee: any[]) => dispatch(actions.addItemToList(responseee))
  }
}


// const mapDispatcherToProps =  (dispatch: Dispatch<DemoActions>) => {
//   db.getUserdetails().on("value", snapshot => {
//     const data = [];
//     snapshot.forEach(childSnapShot => {     
//       const locker = {       
//         FirstName: childSnapShot.val().account.firstName,
//         SurName: childSnapShot.val().account.surname,
//         Email:childSnapShot.val().account.email,
//         RecidenceCity:childSnapShot.val().account.residenceCity,
//         RecidenceCountry:childSnapShot.val().account.residenceCountry,
//         LastActive:childSnapShot.val().lastActive,
//       };
//      data.push(locker);     
//     });


//   return {
//     addItem: (item: string) => dispatch(actions.addItemToList(item))
//   }
// }

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

interface IState {
  inputText: string,
  startDate: any,
  endDate: any,
  filtered: any,
}

class App extends React.Component<ReduxType, IState> {

  public state: IState = {
    inputText: '',
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    filtered: [],
  };

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  }

  public onAddClick = () => {
    // this.props.addItem(this.state.inputText);
    // this.setState({ inputText: '' });
  }

  public handleApply(event: any, picker: any) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    this.setState({
      filtered: [{
        id: "LastActive",
        value: this.state.startDate.format('DD/MM/YY').toString()
      },
      {
        id: "LastActive",
        value: this.state.endDate.format('DD/MM/YY')
      }]
    });
  }


  public customFilter(filter: any, row: any) {
    global.console.log("filter:-", filter);

    const id = filter.pivotId || filter.id;
    if (row[id] !== null && typeof row[id] === "string") {
      return (row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true);
    } else {
      return false;
    }
  }

  public render() {
    const { responseee } = this.props;
    let start = this.state.startDate.format('MM/DD/YY');
    let end = this.state.endDate.format('MM/DD/YY');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    return (
      <div style={{ margin: '20px' }}>
        <input value={this.state.inputText} onChange={this.onInputChange} /><button onClick={this.onAddClick}>Add</button>
        {/* <ul>
          {
            responseee.map(l => < key={l.FirstName}>{l.FirstName}</li>)}
        </ul> */}
        <ReactTable
          data={responseee}
          columns={[{
            id: "FirstName",
            Header: 'FirstName',
            accessor: 'FirstName',
            filterable: true,
          },
          {
            Header: 'LastName',
            accessor: 'SurName',
            filterable: true
          },
          {
            Header: 'Email',
            accessor: 'Email',
            filterable: true
          },
          {
            Header: 'RecidenceCity',
            accessor: 'RecidenceCity',
            filterable: true
          },
          {
            Header: 'RecidenceCountry',
            accessor: 'RecidenceCountry',
            filterable: true
          },
          {
            id: 'LastActive',
            Header: 'LastActive',
            // accessor: rowProps => rowProps.LastActive,
            accessor: d => {
              return moment(+d.LastActive).local().format("DD-MMM-YY")
            },
            filterable: true,
            Filter: ({ filter, onChange }) =>
              <div>
                <DateRangePicker
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onApply={this.handleApply}
                  onChange={this.customFilter}
                >
                  <div className="input-group">
                    <input type="text" className="form-control" value={label} />
                    <span className="input-group-btn">
                      <Button className="default date-range-toggle">
                        <i className="fa fa-calendar" />
                      </Button>
                    </span>
                  </div>
                </DateRangePicker>
              </div>,
          }
          ]}
          defaultPageSize={5}
          defaultFilterMethod={this.customFilter}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
