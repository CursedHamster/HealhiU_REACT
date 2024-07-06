import { useState, useEffect, useContext, useRef } from "react";
import "./CardSection.css";
import ResultCard from "../ResultCard";
import Button from "../Button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Context } from "../../Context";

function CardSection() {
  const context = useContext(Context);
  const cardsData = context.text.home.cards;
  const [currentCard, setCurrentCard] = useState(cardsData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setCurrentCard(cardsData[currentIndex]);
    gsap.fromTo(
      ".confession-container",
      {
        scrollTrigger: {
          trigger: ".confession-container",
          toggleActions: "restart pause none none",
        },
        autoAlpha: 0,
        y: 50,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
      }
    );
    gsap.fromTo(
      ".result-card",
      {
        autoAlpha: 0.5,
        y: 50,
        // scale: 0.95,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }
    );
    const timeout = setTimeout(() => {
      nextCard(currentIndex);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  function nextCard(index) {
    if (index + 1 >= cardsData.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  function prevCard(index) {
    if (index - 1 < 0) {
      setCurrentIndex(cardsData.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }

  return (
    <section
      ref={cardRef}
      className="card-section section-padding vertical d-flex"
    >
      <img className="green green-1" src="green.png" />
      <img className="green green-2" src="green.png" />
      <div className="card-container">
        <div className="ball ball-1 shadow"></div>
        <div className="ball ball-2 shadow"></div>
        <div className="ball ball-3 shadow"></div>
        <div className="ball ball-4 shadow"></div>
        <ResultCard cardType="type-d" resultInfo={currentCard.card} />
        <div className="card-buttons d-flex">
          <Button
            buttonStyle="icon"
            buttonSize="medium"
            onClick={() => prevCard(currentIndex)}
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Button
            buttonStyle="icon"
            buttonSize="medium"
            onClick={() => nextCard(currentIndex)}
          >
            <i className="bi bi-chevron-right"></i>
          </Button>
        </div>
      </div>
      <div className="confession-container d-flex flex-column">
        <img className="photo" src={currentCard.person.photoUrl} />
        <h2>{currentCard.person.name}</h2>
        <div className="quote">
          <i className="bi bi-quote quote-1"></i>
          <i className="bi bi-quote quote-2"></i>
          <p>{currentCard.person.quote}</p>
        </div>
      </div>
    </section>
  );
}

export default CardSection;
