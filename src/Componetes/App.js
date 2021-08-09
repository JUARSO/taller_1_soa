import './App.css';
import React, {useState } from "react";
import Tab from "./Tab";
import {Modal} from "reactstrap";
import {ModalHeader} from "reactstrap";
import {ModalBody} from "reactstrap";
import {ModalFooter} from "reactstrap";
import {Button} from "reactstrap";

const App = (props)=> {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const toggle = () => setModal(!modal);
    return (
        <div className="App">
            <Tab modalToogle={toggle} setModalText={setModalText}/>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader className="modal-style" toggle={toggle}>Atención</ModalHeader>
                <ModalBody className="modal-body-style">
                    {modalText}
                </ModalBody>
                <ModalFooter  className="modal-style">
                    <Button color="secondary" onClick={toggle}>Ok</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default App;
