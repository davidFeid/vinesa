import React from 'react';
import styled from 'styled-components';
import sadRobot from '../assets/images/sad-robot.png';

const Container = styled.div`
  background-color: #0C0C0C;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: bold;
  text-align: center;
  text-shadow: 3px 3px 0 #ff2e63, -1px -1px 0 #3a3a3a, 1px -1px 0 #3a3a3a, -1px 1px 0 #3a3a3a, 1px 1px 0 #3a3a3a;
  margin: 0;
`;

const Message = styled.p`
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
`;

const Button = styled.button`
  background-color: #ff2e63;
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 15px 30px;
  border: none;
  border-radius: 30px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

const RobotImage = styled.img`
  max-width: 100%;
  margin-top: 50px;
  filter: grayscale(100%) brightness(70%);
`;

function Error404() {
    const handleGoHome = () => {
        // Redirigir al usuario a la página principal
        window.location.href = '/';
    };

    return (
        <Container>
            <Wrapper>
                <Title>Oops!</Title>
                <Message>No pudimos encontrar la página que estás buscando..</Message>
                <Button onClick={handleGoHome}>Vuelve a la home</Button>
                <RobotImage src={sadRobot} alt="Sad robot illustration" />
            </Wrapper>
        </Container>
    );
}

export default Error404;