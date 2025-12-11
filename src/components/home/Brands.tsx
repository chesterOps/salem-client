import CalvinKlein from "../../assets/logos/CalvinKlein";
import Gucci from "../../assets/logos/Gucci";
import Prada from "../../assets/logos/Prada";
import Versace from "../../assets/logos/Versace";
import Zara from "../../assets/logos/Zara";
import Container from "../Container";

function Brands() {
  return (
    <section className="bg-black lg:py-11 py-10">
      <Container className="flex items-center flex-wrap lg:flex-nowrap justify-center md:justify-between gap-x-8.5 gap-y-5">
        <Versace />
        <Zara />
        <Gucci />
        <Prada />
        <CalvinKlein />
      </Container>
    </section>
  );
}

export default Brands;
