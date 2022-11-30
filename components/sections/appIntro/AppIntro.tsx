import React from "react";
import styled from "styled-components";
import { H3, H4, H5 } from "../../styles/TextStyles";
import Plus from "../../../public/images/appExplore/plus";

export default function AppIntro() {
  return (
    <Wrapper>
      <ContentWrapper>
        <TextWrapper>
          <Title>Remove Image Background with AI</Title>
          <Description>
            Our app gives you the chance to shine against completely clear photo
            backgrounds
          </Description>
        </TextWrapper>
        <BoxWrapper>
          <img
            className="fullImage"
            src="../../../public/images/appExplore/bgRemoveFull.png"
          ></img>
          <AddImages>
            <PlusImg>
              <Plus fill="#868686" />
            </PlusImg>
            <BigText>Select Image</BigText>
            <SmallText>or Drag Image Here</SmallText>
          </AddImages>
        </BoxWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  overflow: hidden;
  //height: 5234px;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 10px;
  display: grid;
  grid-template-rows: auto auto;
  gap: 60px;
`;

const TextWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 15px;

  @media (max-width: 450px) {
    max-width: 370px;
  }
`;

const Title = styled(H4)`
  color: black;
  margin: 0 auto;

  @media (max-width: 450px) {
    font-size: calc(16.5px + (60 - 35) * ((100vw - 250px) / (1600 - 250)));
  }
`;

const Description = styled(H5)`
  max-width: 469px;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 400;
  margin: 0 auto;
  line-height: 110%;
  text-align: center;

  @media (max-width: 450px) {
    font-size: calc(12.5px + (40 - 35) * ((100vw - 250px) / (1600 - 250)));
  }
`;
const BoxWrapper = styled.div`
  border: 2px dashed #868686;
  border-radius: 19px;
  max-width: 1018px;
  min-height: 515px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 509px);

  :hover {
    border: 2px dashed #6c6b6b;
  }

  @media (max-width: 1018px) {
    display: grid;
    grid-template-columns: none;
    gap: 30px;
  }

  .fullImage {
    padding: 30px 40px;

    @media (max-width: 1018px) {
      max-width: 400px;
    }
  }
`;

const AddImages = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  justify-content: center;
  align-content: center;
  padding: 30px 40px;
`;

const PlusImg = styled.div`
  margin: 0 auto;
  margin-bottom: 25px !important;

  svg {
    fill: #868686;

    ${BoxWrapper}:hover & {
      fill: #6c6b6b;
    }
  }
`;

const BigText = styled(H3)`
  text-align: center;
  color: #868686;
  font-size: 40px;

  ${BoxWrapper}:hover & {
    color: #6c6b6b;
  }
`;

const SmallText = styled(H5)`
  text-align: center;
  color: #868686;
  font-weight: 400;
  font-size: 15px;
  margin-top: 5px !important;

  ${BoxWrapper}:hover & {
    color: #ea2d49;
  }
`;
