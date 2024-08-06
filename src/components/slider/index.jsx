import React, { useState } from 'react';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceSlider = () => {
    const [value, setValue] = useState([0, 100]);

   
  return (
    <div>
      <p>Price range from {value[0]} to {value[1]}</p>

      <Slider
      range
      defaultValue={[20, 50]}
      onChange={value => setValue(value)}
      
      />
    </div>
  );
};

export default PriceSlider;
