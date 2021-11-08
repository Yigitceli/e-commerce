import { css } from "styled-components";

export const middle = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
    return css`
      @media only screen and (max-width: 440px) {
        ${props}
      }
    `;
  };
