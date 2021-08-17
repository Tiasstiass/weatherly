import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

const responsive = {
  smallMobile: {
    breakpoint: { max: 363, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
  mobile: {
    breakpoint: { max: 549, min: 364 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1199, min: 550 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
    partialVisibilityGutter: 20,
  },
};

function Caroussel(props) {
  const ButtonGroup = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          className={`left-arrow ${currentSlide === 0 ? 'disable' : ''}`}
          onClick={() => previous()}
        />
        <FontAwesomeIcon
          className={`right-arrow ${currentSlide === 7 ? 'disable' : ''}`}
          icon={faChevronCircleRight}
          onClick={() => next()}
        />
      </div>
    );
  };

  return (
    <Carousel
      partialVisible={true}
      responsive={responsive}
      arrows={false}
      customButtonGroup={<ButtonGroup />}
    >
      {props.children}
    </Carousel>
  );
}

export default Caroussel;
