import { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../MainBody";
import Loader from "../Loader";

const Wrapper = styled.div`
  position: relative;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 1px 13px var(--color-very-dark-gray);
  transition: all 0.3s ease-in-out;
  padding: 28px 0px;
  width: max-content;
  z-index: 99;
`;

const InnerWrapper = styled.div`
  display: flex;
`;

const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 56px;
  gap: 8px;

  ${(p) =>
    p.isBordered ? "border-right: 1px solid var(--color-dark-gray);" : ""}
`;

const EntryTitle = styled.h1`
  letter-spacing: 2px;
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-gray);
`;

const EntryValue = styled.span`
  font-size: ${28 / 16}rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-very-dark-gray);
  max-width: 200px;
  flex-wrap: wrap;
`;

function ResultCard() {
  const { data, loading } = useContext(MainContext);

  return (
    <Wrapper>
      {loading ? <Loader /> : ""}
      {data && !loading ? (
        <InnerWrapper>
          <EntryWrapper isBordered={true}>
            <EntryTitle>IP ADDRESS</EntryTitle>
            <EntryValue>{data.ip}</EntryValue>
          </EntryWrapper>
          <EntryWrapper isBordered={true}>
            <EntryTitle>LOCATION</EntryTitle>
            <EntryValue>
              {data.location.country + ", " + data.location.region}
            </EntryValue>
          </EntryWrapper>
          <EntryWrapper isBordered={true}>
            <EntryTitle>TIMEZONE</EntryTitle>
            <EntryValue>{"UTC " + data.location.timezone}</EntryValue>
          </EntryWrapper>
          <EntryWrapper>
            <EntryTitle>ISP</EntryTitle>
            <EntryValue>{data.isp}</EntryValue>
          </EntryWrapper>
        </InnerWrapper>
      ) : (
        ""
      )}
    </Wrapper>
  );
}

export default ResultCard;
