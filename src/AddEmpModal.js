import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={emps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeName:event.target.EmployeeName.value,
                EmployeeAddress:event.target.EmployeeAddress.value,
                PhoneNumber:event.target.EmployeePhone.value,
                EmployeePosition:event.target.EmployeePosition.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required 
                        placeholder="EmployeeName"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="EmployeeAddress" required 
                        placeholder="EmployeeName"/>
                    </Form.Group>

                    <Form.Group controlId="Phone number">
                    <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" name="EmployeePhone" required 
                        placeholder="PhoneNumber"/>
                    </Form.Group>

                    <Form.Group controlId="Position">
                    <Form.Label>Position</Form.Label>
                        <Form.Control type="text" name="EmployeePosition" required 
                        placeholder="Position"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>
</Modal>
            </div>
        )
    }

}