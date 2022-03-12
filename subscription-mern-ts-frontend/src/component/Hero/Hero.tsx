import styled from 'styled-components'
import { Container } from 'react-bootstrap';
import "./Hero.css";
import ModalComponent from '../Modal/Modal';

const HeroComponent = styled.header`
    position: relative;
    color: white;
    z-index: 100;
    padding: 2.3rem 0;
    height: 60vh;
`;

const HeaderContainer = styled.div`
    background-color: rgb(5, 148, 112);
    padding: 2rem;
    color: white;
    width: 22.5rem;
`;

const Heading = styled.h1`
    font-size: 3rem;
`;

const SubHeading = styled.h3`
    margin: 1rem 0;
    font-size: 1.3rem;
    font-weight: 400;
`;

function Hero() {
    return (
        <>
            <HeroComponent>
                <Container>
                    <HeaderContainer>
                        <Heading>Feed your mind with the best</Heading>
                        <SubHeading>Grow, learn, and become more successful by reading some of the to article by highly reputable individuals</SubHeading>
                        <ModalComponent 
                            text="Signup"
                            variant="primary"
                        />
                        <ModalComponent 
                            text="Login"
                            variant="danger"
                        />
                    </HeaderContainer>
                </Container>

            </HeroComponent>

            <video autoPlay muted loop className='heroBackground__video'>
                <source src="https://vod-progressive.akamaized.net/exp=1647137271~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1044%2F19%2F480223896%2F2146728301.mp4~hmac=5736aa0eb00b1bd4063a1c6cb8bd79060614e3e24c6e808ef45cb8afe8e30a62/vimeo-prod-skyfire-std-us/01/1044/19/480223896/2146728301.mp4?filename=pexels-nathan-baldwin-5908584.mp4" type="video/mp4" />
            </video>
        </>
    )
}

export default Hero