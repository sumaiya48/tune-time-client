import { Link } from "react-router-dom";
import img from '../../../assets/popularclass/family.jpg';

const AboutScl = () => {
    return (
        <div 
            className="hero min-h-screen bg-cover bg-center flex flex-col lg:flex-row items-center justify-around px-12"
            style={{
                backgroundImage: `url("http://notacorda.like-themes.com/wp-content/uploads/2017/09/parallax_about.jpg")`
            }}
        >
            <div className="text-white text-center lg:text-left lg:w-1/2 lg:mr-5 p-6">
                <p className="text-2xl font-bold">Our Classes</p>
                <h1 className="text-4xl font-extrabold mb-4">About School</h1>
                <p className="mb-4">
                    Integer in justo euismod nulla feugiat lacinia non porta velit. Vestibulum vulputate purus sit amet vestibulum ultrices mauris malesuada.
                </p>
                <p className="mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sem ligula. Phasellus eleifend vel justo sit amet volutpat. Duis vitae maximus ligula, nec mattis libero. Donec eget felis odio.
                </p>
                <Link to="/all-classes">
                    <button className="btn bg-amber-700 text-white hover:bg-amber-800">
                        View All Classes
                    </button>
                </Link>
            </div>
            <div className="lg:w-1/2 lg:ml-5 p-6">
                <img src={img} alt="Family" className="w-[400px] h-[370px] rounded-lg shadow-lg" />

                <p className="px-[40px] py-[180px] bg-amber-700 rounded-lg shadow-lg" style={{marginTop:'-400px',marginLeft:'30px',marginRight:'135px'}}></p>
            </div>
        </div>
    );
};

export default AboutScl;
