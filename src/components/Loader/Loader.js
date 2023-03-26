import styled, { keyframes } from "styled-components";

const spinDots = keyframes`
0% {
    transform: scale(0.5) rotate(0);
    animation-timing-function: cubic-bezier(.55,.055,.675,.19);
  }
  50% {
    transform: scale(0.5) rotate(180deg);
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
  }
  100% {
    transform: scale(0.5) rotate(360deg);
  }
`;

const Outer = styled.div`
  padding: 0px 40px;
`;

const Wrapper = styled.div`
  transform: scale(0.5);
  display: inline-block;
  height: 1em;
  width: 1em;
  line-height: 1;
  vertical-align: middle;
  border-radius: 1em;
  transition: all 150ms linear 0s;
  color: var(--color-very-dark-gray);
  box-shadow: 1.618033988747495em 1.1755705045882492em 0 -0.0875em,
    0.6180339887421291em 1.9021130325928304em 0 -0.0875em,
    -0.6180339887615437em 1.9021130325865223em 0 -0.0875em,
    -1.618033988759494em 1.1755705045717344em 0 -0.0875em,
    -2em -2.041364786902785e-11em 0 -0.0875em,
    -1.6180339887354962em -1.1755705046047644em 0 -0.0875em,
    -0.6180339887227142em -1.9021130325991387em 0 -0.0875em,
    0.6180339887809577em -1.9021130325802142em 0 -0.0875em,
    1.6180339887714932em -1.1755705045552187em 0 -0.0875em;
  animation: ${spinDots} 1000ms infinite steps(10);
`;

function Loader() {
  return (
    <Outer aria-label={"loading icon"}>
      <Wrapper />
    </Outer>
  );
}

export default Loader;
