import {Component} from "react";
import { Navigate  } from 'react-router';
export default class Dashboard extends Component{
    componentDidMount() {
        if(sessionStorage.getItem("logindwe")){
            return <h1>Home</h1>;
        }else{
            return <Navigate  to="/"></Navigate >
        }
    }
}
