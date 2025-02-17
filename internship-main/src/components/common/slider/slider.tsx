import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '@/helpers/slider';

const SliderComponent = ({ children }) => (
  <section className="mx-auto w-9/12 p-6">
    <Slider {...sliderSettings}>{children}</Slider>
  </section>
);

export default SliderComponent;
