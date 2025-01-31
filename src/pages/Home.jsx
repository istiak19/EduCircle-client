import { Helmet } from "react-helmet";
import Banner from "../components/Banner/Banner";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Reviews from "../components/Reviews/Reviews";

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home - EduCircle</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Banner></Banner>
            <Features></Features>
            <Reviews></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;