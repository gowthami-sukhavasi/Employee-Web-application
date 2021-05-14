import React,{Component} from 'react';
import {Table,Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false}
    }

    callAPI(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    deleteEmployee(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+`/`+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        this.callAPI();
        const {emps}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div class="row">
                <h3 class="col-md-6">Employees</h3>
                <div class="col-md-6">
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                    +Add New</Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                </div>
                <div class="row">
                <div class="col-md-5">
                {emps.map(emp=>
                <div class="card" key={emp.EmployeeId}>
                <h6 class="card-title">
                    {emp.EmployeeName}</h6>
                <p class="card-text">{emp.EmployeePosition}</p>
                <Button className="mr-2" variant="danger"
                     onClick={()=>this.deleteEmployee(emp.EmployeeId)}>
                  Delete
                  </Button>
                </div>
                )}
                </div>
               <div class="col-md-7">
                   <h2>Personal Information</h2>
                   {emps.map(emp =>
                       <Table>
                       <tbody key={emp.EmployeeId}>
                       <tr>
                         <td>Name</td> <td><input type = "name" value={emp.EmployeeName}></input></td>
                         </tr>
                        <tr>
                             <td>Address</td>
                              <td><input type = "name" value={emp.EmployeeAddress}></input></td>
                              </tr>
                         <tr>
                             <td>Phone no</td>
                             <td><input type = "name" value={emp.EmployeePhone}></input></td>
                             </tr>
                        <tr>
                            <td>Position</td>
                            <td><input type = "name" value={emp.EmployeePosition}></input></td>
                       </tr>
                       </tbody>
                       </Table>
                           
                   )}
                </div>
                </div>
               </div>
        )
    }
}