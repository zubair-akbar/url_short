import styled from 'styled-components';

export const AppFooter = () => {
  return (
    <Footer>
      <FooterText>
        Made by © Zubair Akbar {new Date().getFullYear()}
      </FooterText>
    </Footer>
  );
}

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const FooterText = styled.p`
  font-size: 10px;
  text-align: center;
`;