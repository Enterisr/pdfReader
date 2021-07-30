import Main from "./components/Main/Main";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

function App() {
  const Title = styled.h2`
    color: var(--accnet-color-Text);
    text-align: left;
    margin-right: var(--margin-unit);
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.3px;
  `;
  const SubTitle = styled.h3`
    color: var(--third-color);
    text-align: left;
    font-size: 1rem;
  `;
  const AppHeader = styled.header`
    display: flex;
    align-items: baseline;
    padding: 0.5em 0 1em 0.5em;
    border-bottom: solid 1px var(--second-color-D);
    background-color: var(--accent-color);
  `;
  return (
    <div className="App">
      <AppHeader>
        <Title>📖OKReader</Title>
        <SubTitle>Read&Sync</SubTitle>
      </AppHeader>
      <Main />
    </div>
  );
}

export default App;
