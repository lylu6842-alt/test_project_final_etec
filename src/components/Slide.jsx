import React, { useEffect, useState } from 'react'
import './Slide.css'

const slide = [
    { image: "https://i.pinimg.com/736x/71/25/50/71255099cd9d9a8f621132a75948ba22.jpg" },
    { image: "https://i.pinimg.com/736x/60/e4/ea/60e4ea8f1c03862d0333523d2f644e64.jpg" },
    { image: "https://i.pinimg.com/736x/99/77/37/99773798afdccaefc4f125a514ed62d8.jpg" },
    { image: "https://i.pinimg.com/1200x/b8/3f/6c/b83f6c2bb10b0bfe7cf4ab07e3e35b41.jpg" },
];

function Slide({ children }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const time = setInterval(() => {
            setCurrent((pre) => (pre === slide.length - 1 ? 0 : pre + 1));
        }, 3000);
        return () => clearInterval(time);
    }, []);

    return (
        <div className="slide-container">
            {slide.map((item, index) => (
                <div key={index} className={`slide-item ${index === current ? 'active' : ''}`}>
                    <img src={item.image} alt={`slide-${index}`} className="slide-image" />
                    <div className="slide-overlay" />
                </div>
            ))}
            <div className="slide-content">{children}</div>
            <div className="slide-dots">
                {slide.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`slide-dot ${index === current ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slide;