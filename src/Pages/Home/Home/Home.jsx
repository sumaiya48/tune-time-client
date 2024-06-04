import AboutScl from "../AboutScl/AboutScl";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <AboutScl></AboutScl>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;