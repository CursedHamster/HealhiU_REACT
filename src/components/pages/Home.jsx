import "./Home.css";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import HeroSection from "../home/HeroSection";
import PerkItem from "../PerkItem";
import CardSection from "../home/CardSection";

function Home() {
  const context = useContext(Context);
  const perks = context.text.home.perks;
  const perkItems = perks.map((perk, i) => (
    <PerkItem
      key={"perk-" + i}
      icon={perk.icon}
      title={perk.title}
      text={perk.text}
    />
  ));

  return (
    <>
      <HeroSection />
      <section className="perk-section section-padding d-flex">
        {perkItems}
      </section>
      <CardSection />
    </>
  );
}

export default Home;
