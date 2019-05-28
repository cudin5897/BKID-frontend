import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import {Routes} from 'react-router-bootstrap';
import Home from './containers/Home';
import Login from './containers/Login';
import SideMenu from './subcontainers/SideMenu';
import Homepage from './containers/Homepage';
import CreateUser from './containers/CreateUser';
import ListUser from './containers/ListUserPage';
import AccountManagement from "./containers/AccountManagement";
import ListProviderPage from "./containers/ListProviderPage";
import CardSystem from "./containers/CardSystem";
import RequestDetail from "./containers/RequestDetail";
import UserDetail from "./containers/UserDetail";
import ProviderDashboard from "./provider/dashboard";
import ListService from "./provider/ListService";
import ServiceDetail from "./provider/ServiceDetail";
import ListStation from "./provider/ListStation";
import ListRequest from "./provider/ListRequest";
import TransactionIncome from "./provider/TransactionIncome";
import TransactionHistory from "./provider/TransactionHistory";
import ListRequestPage from "./containers/ListRequestPage";
import CardDetail from "./containers/CardDetail";
import Scroll from "./containers/scroll";
import ProviderDetail from "./containers/ProviderDetail";
import Example from "./provider/Example";
import LoginProvider from "./provider/LoginProvider";
import CreateStation from "./provider/CreateStation";
import ServicePackageDetail from "./provider/ServicePackageDetail";
import StationDetail from "./provider/StationDetail";

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <BrowserRouter>
        <Switch>
          {/* SYSTEM ADMIN */}
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/side" exact component={SideMenu} />
          <Route path="/dashboard" exact component={Homepage} childProps={childProps}/>
          <Route path="/createuser" exact component={CreateUser} />
          <Route path="/listuser" exact component={ListUser} />
          <Route path="/user"  component={UserDetail} />
          <Route path="/provider" component={ProviderDetail}/>
          <Route path="/listprovider" exact component={ListProviderPage} />
          <Route path="/card"  component={CardSystem} />
          <Route path="/request/detail"  component={RequestDetail} />
          <Route path="/account" exact component={AccountManagement} /> 
          <Route path="/request"  component={ListRequestPage}/>
           {/* PROVIDER */}
           <Route path="/providers/login" exact component={LoginProvider}/>
          <Route path="/providers/transaction/income" exact component={TransactionIncome}/>
          <Route path="/providers/transaction/history" exact component={TransactionHistory}/>
          <Route path="/providers/dashboard" exact component={ProviderDashboard} />
          <Route path="/chart" exact component={Example} />
          <Route path="/providers/listservice" exact component={ListService} />
          <Route path="/providers/servicedetail" exact component={ServiceDetail} />
          <Route path="/providers/liststation" exact component={ListStation} />
          <Route path="/providers/listrequest" exact component={ListRequest} />
          <Route path="/cards/detail" component={CardDetail}/>
          <Route path="/scroll" component={Scroll}/>
          <Route path="/providers/createstation" exact component={CreateStation}/>
          <Route path="/providers/servicepackage" exact component={ServicePackageDetail}/>
          <Route path="/providers/transaction/station" exact component={StationDetail}/>




        </Switch>

      </BrowserRouter>
    );
  }
}



