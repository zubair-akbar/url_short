import styled from 'styled-components';

export const Nav = () => {

  return (
    <NavWrapper>
      <NavContainer>
        <NavListContainer>
          <ul>
            <li>
              <a href="/">GitHub</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
          </ul>
        </NavListContainer>
        <NavButtonContainer>
          <ul>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/">Sign up</a>
            </li>
          </ul>
        </NavButtonContainer>
      </NavContainer>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
background-color: white;
height: 25px;
display: flex;
justify-content: center;
width: 100%;
border-bottom: solid;
border-width: 1px;
font-weight: bold;
`;

const NavContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
max-width: 1200px;
//padding: 0 20px;
`;

const NavListContainer = styled.div`
display: flex;
align-items: center;
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-right: 30px;
    font-size: 18px;
    a {
      color: #46351D;
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: #58ACFA;
      }
    }
  }
}
`;

const NavButtonContainer = styled.div`
display: flex;
align-items: center;
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-right: 30px;
    font-size: 18px;
    a {
      color: #46351D;
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: #58ACFA;
      }
    }
    .box-visible {
      background-color: #46351D;
      color: #fff;
      padding: 5px;
      border-radius: 3px;
    }
    i {
      color: #46351D;
      font-size: 24px;
    }
  }
}
`;