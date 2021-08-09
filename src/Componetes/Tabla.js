import React from "react";
import {Table} from "reactstrap";

export default class Tabla extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let headers;
        let body;
        if(this.props.tipo ==='free'){
            headers = (<tr>
                            <th>Id</th>
                            <th>Estado</th>
                        </tr>)
            body = this.props.espacios.map(espacio =>{
                    return (
                        <tr>
                            <th scope="row">{espacio.id}</th>
                            <td>{espacio.estado}</td>
                        </tr>
                    ) ;
                })

        }else if(this.props.tipo ==='in-use'){
            headers = (<tr>
                            <th>Id</th>
                            <th>Estado</th>
                            <th>Placa</th>
                            <th>Hora Ingreso</th>
                        </tr>)
            body = this.props.espacios.map(espacio =>{
                return (
                    <tr>
                        <th scope="row">{espacio.id}</th>
                        <td>{espacio.estado}</td>
                        <td>{espacio.carro.placa}</td>
                        <td>{espacio.carro.horaIngreso}</td>
                    </tr>
                ) ;
            })
        }
        return(
            <Table>
                <thead>
                {headers}
                </thead>
                <tbody>
                {body}
                </tbody>
            </Table>
        );
    }
}
