import Brands from "../components/home/Brands";
import Categories from "../components/home/Categories";
import Hero from "../components/home/Hero";
import NewArrivals from "../components/home/NewArrivals";
import Reviews from "../components/home/Reviews";
import TopSelling from "../components/home/TopSelling";

function Home() {
  return (
    <main className="">
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <Categories />
      <Reviews />
    </main>
  );
}

export default Home;
