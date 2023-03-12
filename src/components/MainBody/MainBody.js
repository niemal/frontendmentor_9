import styled from "styled-components";
import { isMobile } from "react-device-detect";
import Input from "../Input";
import ResultCard from "../ResultCard";
import Map from "../Map";
import { createContext, useState } from "react";

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  position: relative;
  height: 280px;
  width: 100%;
`;

const BackgroundImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 280px;
  position: absolute;
  left: 0;
  top: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 24px;
`;

const InputTitle = styled.h1`
  font-family: var(--font-primary);
  font-size: ${28 / 16}rem;
  font-weight: var(--font-weight-medium);
  color: white;
`;

export const MainContext = createContext();

function MainBody() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper role={"main"}>
      <MainContext.Provider value={{ data, setData, loading, setLoading }}>
        <TopContainer>
          <BackgroundImage
            src={
              isMobile
                ? "/frontendmentor_9/pattern-bg-mobile.png"
                : "/frontendmentor_9/pattern-bg-desktop.png"
            }
            alt={"main background image"}
          />

          <InputContainer>
            <InputTitle>IP Address Tracker</InputTitle>
            <Input />
          </InputContainer>

          <ResultCard />
        </TopContainer>

        <Map />
      </MainContext.Provider>
    </Wrapper>
  );
}

export default MainBody;
