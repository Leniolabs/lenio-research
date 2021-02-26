import * as React from "react";
import styled from "styled-components";
import { Syringe } from "../components/charts/syringe";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Index = () => {
  const [israel, setIsrael] = React.useState(1);
  const [unitedKingdom, setUnitedKingdom] = React.useState(1);
  const [chile, setChile] = React.useState(1);
  const [US, setUS] = React.useState(1);
  const [turkey, setTurkey] = React.useState(1);
  const [EU, setEU] = React.useState(1);
  const [brazil, setBrazil] = React.useState(1);

  React.useEffect(() => {
    setTimeout(() => {
      setIsrael(israel - Math.random() * 0.2);
    }, 2000);
  }, [israel]);

  React.useEffect(() => {
    setTimeout(() => {
      setUnitedKingdom(unitedKingdom - Math.random() * 0.2);
    }, 2000);
  }, [unitedKingdom]);

  React.useEffect(() => {
    setTimeout(() => {
      setChile(chile - Math.random() * 0.2);
    }, 2000);
  }, [chile]);

  React.useEffect(() => {
    setTimeout(() => {
      setUS(US - Math.random() * 0.2);
    }, 2000);
  }, [US]);
  React.useEffect(() => {
    setTimeout(() => {
      setTurkey(turkey - Math.random() * 0.2);
    }, 2000);
  }, [turkey]);
  React.useEffect(() => {
    setTimeout(() => {
      setEU(EU - Math.random() * 0.2);
    }, 2000);
  }, [EU]);
  React.useEffect(() => {
    setTimeout(() => {
      setBrazil(brazil - Math.random() * 0.2);
    }, 2000);
  }, [brazil]);

  return (
    <div style={{ margin: "20px" }}>
      <Title>My page</Title>;
      <svg width="440" height="440" viewBox="0 0 1235.7 91.24">
        <Syringe index={6} color="#f79fad" country="Israel" percentage={israel} />
        <Syringe index={5} color="#f7de9f" country="United Kingdom" percentage={unitedKingdom} />
        <Syringe index={4} country="Chile" percentage={chile} />
        <Syringe index={3} color="#9ff4e4" country="United States" percentage={US} />
        <Syringe index={2} color="#f79fad" country="Turkey" percentage={turkey} />
        <Syringe index={1} color="#f7de9f" country="European Union" percentage={EU} />
        <Syringe index={0} country="Brazil" percentage={brazil} />
      </svg>
    </div>
  );
};

export default Index;
