import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../assets/banner/banner1.jpg';
import img2 from '../../../assets/banner/banner2.jpg';

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay 
                infiniteLoop 
                showThumbs={false} 
                showArrows={false} 
                showStatus={false}
                interval={1500}
                transitionTime={30}>
                <div>
                    <img 
                        src={img1}
                        alt="Banner 1" 
                        style={{height:'500px', objectFit: 'cover', }} 
                    />
                    <p 
                        className="legend" 
                        style={{ 
                            background: 'rgba(0, 0, 0, 0.5)', 
                            color: '#fff', 
                            fontSize: '1.5em', 
                            padding: '10px' 
                        }}
                    >
                        Music Classes for All Ages
                    </p>
                </div>
                <div>
                    <img 
                        src={img2}
                        alt="Banner 2" 
                        style={{ maxHeight: '500px', objectFit: 'cover' }} 
                    />
                    <p 
                        className="legend" 
                        style={{ 
                            background: 'rgba(0, 0, 0, 0.5)', 
                            color: '#fff', 
                            fontSize: '1.5em', 
                            padding: '10px' 
                        }}
                    >
                        Professional Instructors
                    </p>
                </div>
                <div>
                    <img 
                        src={img1} 
                        alt="Banner 3" 
                        style={{ maxHeight: '500px', objectFit: 'cover' }} 
                    />
                    <p 
                        className="legend" 
                        style={{ 
                            background: 'rgba(0, 0, 0, 0.5)', 
                            color: '#fff', 
                            fontSize: '1.5em', 
                            padding: '10px' 
                        }}
                    >
                        Join Our Community
                    </p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
