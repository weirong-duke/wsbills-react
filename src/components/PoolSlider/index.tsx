import React, {FC, ReactNode, useEffect, useState} from 'react';
import './PoolSlider.scss';

interface PoolSliderProps {
  children: ReactNode;
  isOpen: boolean;
}

const PoolSlider: FC<PoolSliderProps> = ({children, isOpen}) => {
  return <div className={`pool-slider ${isOpen ? 'open' : ''}`}>
    {children}
  </div>;
};

export default PoolSlider;