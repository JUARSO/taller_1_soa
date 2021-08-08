import React from "react";
import {Container, Label, Input, FormGroup, Button, TabContent} from "reactstrap";
import './Botones.css'
export default class Contenedor extends React.Component{
    render() {
        return(
            <div>
                <body>
                    <FormGroup  style={{marginTop: '100px',
                        background: '', width: '40%', borderRadius: '50px'
                    , marginLeft: '30%'}}>
                        <Label for="numeroEspacio">Numero de Espacio</Label>
                        <Input type="number" name="numeroEspacio" id="numeroEspacio"/>
                        <Label for="Placa">Placa</Label>
                        <Input type="number" name="Placa" id="Placa"/>
                        <Button>Aceptar</Button>
                    </FormGroup>
                </body>
            </div>
        );
    }
}
