import * as React from "react";
import Logo from "@components/Logo";
import {
  Layout,
  Sidebar,
  Header,
  Main,
  Title,
  Small,
  HeroImage,
  SectionTitle,
  FooterLogoContainer
} from "./home.style";
import ProjectCardList from "@components/project-card-list/ProjectCardList";
import { mockData } from "./home.data";
import Link from "next/link";
import Footer from "@components/footer";

const year = new Date().getFullYear();

export const Index = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title>
            Data <span>research</span>
            <Small>
              By{" "}
              <span>
                <a href="https://www.leniolabs.com/">Leniolabs_</a>
              </span>
            </Small>
          </Title>

          <meta
            name="description"
            content="Data Visualization of Evolution of the Pole Vault"
          />
          <meta
            name="title"
            content="Leniolabs_ Research: Olympics"
            key="title"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://research.leniolabs.com/" />
          <meta name="twitter:creator" content="@Leniolabs_" />
          <meta
            name="twitter:title"
            content="Leniolabs_ Research: Olympics"
          />
          <meta
            name="twitter:description"
            content="Data Visualization of Evolution of the Pole Vault"
          />
          <meta name="twitter:image" content="https://research.leniolabs.com/pole-vault-meta.gif" />
          <meta property="og:url" content="https://research.leniolabs.com/olympics" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Leniolabs_ Research: Olympics"
          />
          <meta property="og:image" content="https://research.leniolabs.com/pole-vault-meta.gif" />
          <meta property="og:image:alt" content="Opportunities in The US Housing Market" />
          <meta
            property="og:description"
            content="Data Visualization of Evolution of the Pole Vault"
          />
          <meta property="og:site_name" content="Leniolabs_ Research" />
          <meta property="og:locale" content="en_US" />
          <meta property="article:author" content="Leniolabs_ Research" />

          <svg
            className="svg-home"
            preserveAspectRatio="xMinYMid slice"
            role="img"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1541 823">
            <g fill="none" fillRule="evenodd" stroke="#FFF" opacity=".1">
              <path strokeWidth="3.4" d="M1168 411a38 38 0 10-76 0 38 38 0 0076 0z" />
              <path strokeWidth="3.4" d="M1191 411a61 61 0 10-122 0 61 61 0 00122 0z" />
              <path strokeWidth=".8" d="M1228 411a98 98 0 10-196 0 98 98 0 00196 0z" />
              <path strokeWidth=".8" d="M1288 411a158 158 0 10-316 0 158 158 0 00316 0z" />
              <path
                strokeWidth=".8"
                d="M1540 410.5a410.5 410.5 0 10-821 0 410.5 410.5 0 00821 0z"
              />
              <path strokeWidth="6.8" d="M1147 411a17 17 0 10-34 0 17 17 0 0034 0z" />
              <line x2="971.5" y1="410.2" y2="410.2" strokeWidth="2" />
            </g>
          </svg>
        </Header>
        <Sidebar>
          <Logo color="#102632" circleColor="#fff"></Logo>
          <p>copyright {year}</p>
        </Sidebar>
        <Main>
          <p>Exploring complex data visualizations from wordwide trending topics!</p>
          <section>
            <SectionTitle>Trending now</SectionTitle>
            <Link href={mockData[0].link}>
              <a>
                <HeroImage src={mockData[0].imgPreview} />
              </a>
            </Link>
          </section>
          <section>
            <ProjectCardList list={mockData}></ProjectCardList>
          </section>
        </Main>
        <Footer />
        <FooterLogoContainer>
          <img src="/footer-logo.svg" alt="two icons"></img>
        </FooterLogoContainer>
      </Layout>
    </>
  );
};

export default Index;
