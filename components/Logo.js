import React from "react";
import { LogoHeaderContainer } from "@components/styled";

const Logo = ({ withText, circleColor = "#30aab3", color = "currentColor", ...rest }) => {
  return (
    <LogoHeaderContainer link>
      <a href="https://www.leniolabs.com">
      <svg
        className="lenio-iso"
        width="75"
        height="75"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 165 165"
        overflow="visible">
        <path
          fill={color || "currentColor"}
          d="M165.4 165.4H0V0h165.4v41.2H157V8.4H8.4V157H157v-34.3h8.4z"
        />
        <path
          fill={color || "currentColor"}
          d="M71.6 98.4h20.6v6.9H63.1V61.2h8.5v37.2zM127.2 111.8H99.6v-6.6h27.6v6.6z"
        />
        <circle fill={circleColor || "#30aab3"} cx="30.5" cy="31.5" r="9.6" />
      </svg>
      {withText && (
        <p className="lenio-iso-text">
          <strong>Data Research</strong>
          <br />
          <span>by Leniolabs_</span>
        </p>
      )}
      </a>
    </LogoHeaderContainer>
  );
};

export default Logo;
