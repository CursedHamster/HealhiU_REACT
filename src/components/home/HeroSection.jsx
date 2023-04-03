import "./HeroSection.css";
import Button from "../Button";
import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function HeroSection() {
  const context = useContext(Context);
  const { title, info, cta } = context.text.home.hero;
  const leavesRef = useRef(null);
  const wreathRef = useRef(null);
  const foodRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".img2", {
      scrollTrigger: {
        trigger: ".perk-item",
        toggleActions: "restart pause reverse pause",
        scrub: true,
      },
      y: 100,
      duration: 1,
    });
    gsap.to(".img1", {
      scrollTrigger: {
        trigger: ".perk-item",
        toggleActions: "restart pause reverse pause",
        scrub: true,
      },
      y: -100,
      duration: 1,
    });
    gsap.to(".img3", {
      scrollTrigger: {
        trigger: ".perk-item",
        toggleActions: "restart pause reverse pause",
        scrub: true,
      },
      y: -300,
      duration: 1,
    });
  }, []);

  return (
    <section className="section-padding hero-section d-flex">
      <div className="left d-flex">
        <h1 id="hero_title">{title}</h1>
        <div className="info">{info}</div>
        <Link to="/test">
          <Button buttonSize="medium" buttonStyle="cta">
            {cta}
            <i className="bi bi-arrow-right"></i>
          </Button>
        </Link>
      </div>
      <div className="right images">
        <img className="img3" src="food/food3.jpg" ref={foodRef} />
        <img className="img1" src="wreath.png" ref={wreathRef} />
        <img className="img2" src="leaves.png" ref={leavesRef} />
      </div>
    </section>
  );
}

export default HeroSection;
