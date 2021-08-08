import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Tabla from "./Tabla";
import './Botones.css'
const Tab = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
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
                    <Button>Buscar</Button>
                    <Tabla/>
                </TabPane>
                <TabPane tabId="2">
                    <Button>Buscar</Button>
                    <Tabla/>
                </TabPane>
                <TabPane tabId="3">
                    <h4>Tab 3 Contents</h4>
                </TabPane>
                <TabPane tabId="4">
                    <h4>Tab 4 Contents</h4>

                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tab;
