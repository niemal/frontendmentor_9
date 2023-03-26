import styled from "styled-components";
import { useContext, useRef, useEffect } from "react";
import { MainContext } from "../MainBody";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  display: flex;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    justify-content: center;
  }
`;

const InputComponent = styled.input`
  width: 520px;
  padding: 12px 24px;
  outline: none;
  border: none;
  border-radius: 16px 0px 0px 16px;
  color: black;
  font-family: var(--font-primary);
  font-size: ${18 / 16}rem;

  &::placeholder {
    color: var(--color-dark-gray);
  }

  transition: all 0.3s ease-in-out;
  &:focus {
    outline: 3px solid var(--color-very-dark-gray);
    outline-offset: 6px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 81%;
    font-size: ${16 / 16}rem;
    padding: 8px 16px;
  }
`;

const Button = styled.button`
  background-color: black;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 0px 16px 16px 0px;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: 3px solid var(--color-very-dark-gray);
    outline-offset: 4px;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 10px;
  height: 10px;
`;

function Input() {
  const { data, setData, loading, setLoading } = useContext(MainContext);
  const inputRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);

    const query = inputRef.current.value;

    let url = `https://geo.ipify.org/api/v2/country?apiKey=at_yN04YVdH4t6aGzSxEFUD0jEXwP98M`;

    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        query
      )
    ) {
      url += "&ipAddress=" + query;
    } else {
      url += "&domain=" + query;
    }

    const resp = await fetch(url, {
      method: "GET",
    });
    if (resp.error) {
      console.log("error:", resp.error);
    } else {
      const json = await resp.json();

      let urlPos = `https://geocode.xyz/${json.ip}?json=1&auth=709008901622008771354x98891`;

      const geoResp = await fetch(urlPos, { method: "GET" });
      if (geoResp.error) {
        console.log("geo error:", geoResp.error);
      } else {
        const geoJson = await geoResp.json();

        if (geoJson.error) {
          console.log("geo error#2:", geoJson);
        } else {
          setData({ ...json, lat: geoJson.latt, lng: geoJson.longt });
          console.log(geoJson);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <InputComponent
        aria-label={"Search input for any IP address or domain"}
        ref={inputRef}
        placeholder={"Search for any IP address or domain"}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            fetchData();
          }
        }}
      />

      <ClickableWrapper
        onClick={() => {
          fetchData();
        }}
      >
        <Button>
          <Image
            src={"/frontendmentor_9/icon-arrow.svg"}
            alt={"search image button"}
          />
        </Button>
      </ClickableWrapper>
    </Wrapper>
  );
}

export default Input;
