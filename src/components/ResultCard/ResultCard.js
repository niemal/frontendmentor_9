import { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../MainBody";
import Loader from "../Loader";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  position: relative;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 6px 14px var(--color-dark-gray);
  transition: all 0.3s ease-in-out;
  padding: 28px 0px;
  width: max-content;
  z-index: 99;

  @media ${QUERIES.exclusiveWidth1} {
    width: 100%;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 90%;
    padding: 8px 0px;
    margin-top: 8px;

    ${(p) =>
      p.loading
        ? `
    display: grid;
    place-content: center;
    padding: 24px 8px;
    width: max-content;
    `
        : ""}
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 0px 24px;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 0px;
    justify-content: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    align-items: center;
  }
`;

const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 56px;
  gap: 8px;

  ${(p) =>
    p.isBordered ? "border-right: 1px solid var(--color-dark-gray);" : ""}

  @media ${QUERIES.tabletAndSmaller} {
    padding: 12px;
    overflow: hidden;
  }

  @media ${QUERIES.phoneAndSmaller} {
    border: none;
    text-align: center;
    padding: 8px;
    gap: 4px;
  }
`;

const EntryTitle = styled.h1`
  letter-spacing: 2px;
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-gray);

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${12 / 16}rem;
  }
`;

const EntryValue = styled.span`
  font-size: ${28 / 16}rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-very-dark-gray);
  max-width: 200px;
  flex-wrap: wrap;

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${16 / 16}rem;
  }
`;

function ResultCard() {
  const { data, loading } = useContext(MainContext);

  return (
    <Wrapper loading={loading}>
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
