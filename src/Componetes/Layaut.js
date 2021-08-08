import React from 'react';
import {Container, Row, Col, ButtonGroup, Button, FormGroup, Label, Input} from 'reactstrap';
import './Botones.css'
import Tabla from "./Tabla";

export default class Layaut extends React.Component{
    render() {
        return(
            <div>
                <Row>
                    <Button >Espacios Ocupados</Button>
                    <Button >Espacios Desabilitados</Button>
                </Row>
                <Tabla/>
                <Row>
                    <Button >Asignar Espacio</Button>
                    <Button >Desabilitar Espacio</Button>
                </Row>
                <FormGroup>
                    <Label for="exampleSelect">Numero de espacio</Label>
                    <Input type="number" name="select" id="exampleSelect">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="placaSelect">Placa</Label>
                    <Input type="number" name="placa" id="placaSelect">
                    </Input>
                </FormGroup>
            </div>



        );
    }
}
