import { useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { getCabins } from "./services/apiCabins";
import { styled } from "styled-components";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Row from "./ui/Row";

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

const StyledApp = styled.div`
  background-color: var(--color-grey-800);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
`;

function App() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <H1>Homepage</H1>
            <div>
              <Button onClick={() => alert("Check in button clicked!")}>
                Check in
              </Button>
              <Button onClick={() => alert("Check out button clicked!")}>
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <H1>Form</H1>
            <div>
              <Input placeholder="Enter your name" />
              <Input placeholder="Enter your email" />
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
