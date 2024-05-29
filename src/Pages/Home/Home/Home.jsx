import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Recommendatons from "../Recommendations/Recommendatons";
import FeaturedTests from "../featuredTests/FeaturedTests";


const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <FeaturedTests></FeaturedTests>

            <Recommendatons></Recommendatons>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;