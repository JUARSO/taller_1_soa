import React, { useState } from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    FormGroup, Label, Input
} from 'reactstrap';
import classnames from 'classnames';
import Tabla from "./Tabla";
import './Botones.css'
import Contenedor from "./Contenedor";
const Tab = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [espaciosDisponibles, setEspaciosDisponibles] = useState([])
    const [espaciosOcupados, setEspaciosOcupados] = useState([])
    const [placaInput, setPlacaInput] = useState("")
    const [idInput, setIdInput] = useState("")

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    function updateEspaciosDisponibles() {
        fetch('http://localhost:3000/spaces?state=free').then(async function(response) {
            let json = await response.json()
            if(response.ok) {
                setEspaciosDisponibles(json)
                if(json.length===0){
                    props.setModalText("No hay espacios libres")
                    props.modalToogle()
                }
            } else {
                setEspaciosDisponibles([])
                props.setModalText("No se pudieron obtener los espacios libres")
                props.modalToogle()
                console.log('No se pudieron obtener los espacios libres');
            }
        })
            .catch(function(error) {
                setEspaciosDisponibles([])
                props.setModalText("No se pudieron obtener los espacios libres")
                props.modalToogle()
            });
    }

    function updateEspaciosOcupados() {
        fetch('http://localhost:3000/spaces?state=in-use').then(async function(response) {
            let json = await response.json()
            if(response.ok) {
                setEspaciosOcupados(json)
                if(json.length===0){
                    console.log("No hay espacios ocupados")
                    props.setModalText("No hay espacios ocupados")
                    props.modalToogle()
                }
            } else {
                setEspaciosOcupados([])
                props.setModalText("No se pudieron obtener los espacios ocupados")
                props.modalToogle()
                console.log('No se pudieron obtener los espacios ocupados');
            }
        })
            .catch(function(error) {
                setEspaciosOcupados([])
                props.setModalText("No se pudieron obtener los espacios ocupados")
                props.modalToogle()
                console.log('No se pudieron obtener los espacios ocupados:' + error.message);
            });
    }


    function postReservacion() {
        fetch('http://localhost:3000/reservations',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({placa:placaInput}), // body data type must match "Content-Type" header,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async function(response) {
            let json = await response.json()
            if(response.ok) {
                props.setModalText("Se le asignó el espacio " + json.espacio.id)
                props.modalToogle()
            } else if(response.status === 409){
                props.setModalText("No hay espacios libres")
                props.modalToogle()
                console.log('No hay espacios libres');
            }else{
                props.setModalText("Placa Invalida")
                props.modalToogle()
            }
        })
            .catch(function(error) {
                props.setModalText("Fallo en la conexion")
                props.modalToogle()
            });
    }

    function deleteReservacion() {
        fetch('http://localhost:3000/reservations/'+idInput,{
            method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
        }).then(async function(response) {
            let json = await response.json()
            if(response.ok) {
                props.setModalText("Se libero exitosamente ")
                props.modalToogle()
            } else {
                if(json.message === 'No existe el espacio'){
                    props.setModalText("No existe el espacio")
                    props.modalToogle()
                }else{
                    props.setModalText("Error desconocido")
                    props.modalToogle()
                }
            }
        })
            .catch(function(error) {
                props.setModalText("Fallo en la conexion")
                props.modalToogle()
            });
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Espacios Disponibles
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Espacios Ocupados
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Reservar Espacio
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >
                        Liberar Espacio
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Button onClick={updateEspaciosDisponibles}>Actualizar</Button>
                    <Tabla espacios={espaciosDisponibles} tipo={'free'}/>
                </TabPane>
                <TabPane tabId="2">
                    <Button onClick={updateEspaciosOcupados}>Actualizar</Button>
                    <Tabla espacios={espaciosOcupados} tipo={'in-use'}/>
                </TabPane>
                <TabPane tabId="3">
                    <div>
                        <body>
                        <FormGroup  style={{marginTop: '100px',
                            background: '', width: '40%', borderRadius: '50px'
                            , marginLeft: '30%'}}>
                            <Label for="Placa">Placa</Label>
                            <Input
                                type="number"
                                name="Placa"
                                id="Placa"
                                onChange={event => setPlacaInput(event.target.value)}/>
                            <Button onClick={postReservacion}>Aceptar</Button>
                        </FormGroup>
                        </body>
                    </div>
                </TabPane>
                <TabPane tabId="4">
                    <div>
                        <body>
                        <FormGroup  style={{marginTop: '100px',
                            background: '', width: '40%', borderRadius: '50px'
                            , marginLeft: '30%'}}>
                            <Label for="id">Id</Label>
                            <Input type="number"
                                   name="id"
                                   id="id"
                                   onChange={event => setIdInput(event.target.value)}/>
                            <Button  onClick={deleteReservacion}>Aceptar</Button>
                        </FormGroup>
                        </body>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tab;
