import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
    const [current, setCurrent] = useState(0)

    const onPreviousSlide = () => {
        if (current === 0)
            setCurrent(images.length - 1)
        else
            setCurrent(current - 1)
    }

    const onNextSlide = () => {
        if (current === images.length - 1)
            setCurrent(0)
        else
            setCurrent(current + 1)
    }

    return (
        <div className="slider">
            <NavigateBeforeIcon className="left-arrow" onClick={onPreviousSlide} />
            <NavigateNextIcon className="right-arrow" onClick={onNextSlide} />
            {images.map((image, index) => {
                return (
                    <div className={current === index ? "slide active" : "slide"}>
                        {current === index && <img className="image" src={image} />}
                    </div>
                )
            })}
        </div>
    )
}

export default ImageSlider