import React, {FC, ReactNode, useEffect, useState} from 'react';
import './PoolSlider.scss';

interface PoolSliderProps {
  children: ReactNode;
  closeDelay?: number;
  isOpen: boolean;
  openDelay?: number;
}

const PoolSlider: FC<PoolSliderProps> = ({children, closeDelay=500, isOpen, openDelay=100}) => {
  const [isRendered, setIsRendered] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    setIsTransitioning(true);
    if (!isOpen) {
      setTimeout(() => {
        setIsRendered(isOpen)
        setIsTransitioning(false);
      }, closeDelay);
    }
    else if (!isTransitioning) {
      setIsRendered(isOpen)
      setTimeout(() => {
        setIsTransitioning(false);
      }, openDelay);
    }
  }, [isOpen]);
  const finalIsOpen = isTransitioning ? false : isOpen;

  return isRendered ? <div className={`pool-slider ${finalIsOpen ? 'open' : ''}`}>
    {children}
  </div> : null;
};

export default PoolSlider;