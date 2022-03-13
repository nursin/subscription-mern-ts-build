import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useState, useContext } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../context';

interface ModalProps {
    text: string;
    variant: "primary" | "danger";
    isSignupFlow: boolean
}

const ErrorMessage = styled.p`
    color: red;
`

function ModalComponent({ text, variant, isSignupFlow }: ModalProps) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [state, setState] = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const handleClick = async () => {
        let response;
        if (isSignupFlow) {
            const {data: signUpData} = await axios.post("http://localhost:8080/auth/signup", {
                email, 
                password
            });
            response = signUpData;
        } else {
            const {data: loginData} = await axios.post("http://localhost:8080/auth/login", {
                email, 
                password
            });
            response = loginData;
        }

        if (response.errors.length) {
            return setErrorMsg(response.errors[0].msg)
        }

        setState({
            data: {
                id: response.data.user.id,
                email: response.data.user.email,
                customerStripeId: response.data.user.customerStripeId,
            },
            loading: false,
            error: null,
        });
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`;
        navigate("/articles")
    };

    return (
        <>
            <Button variant={variant} onClick={handleShow} size="lg" style={{marginRight: "1rem", padding: "0.2rem 2rem"}}>{text}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        {text}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Password</InputGroup.Text>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleClick}>{text}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalComponent