import ScCaretRight from "../assets/icons/ScCaretRight";
import Container from "./Container";
import { Link } from "react-router-dom";

function BreadCrumb({ links }: { links: { name: string; url?: string }[] }) {
  return (
    <Container className="mb-2 mt-5 lg:mb-6 lg:mt-6">
      <ul className="flex text-black/60 text-sm leading-3.5 lg:text-base lg:leading-4">
        <li className="flex items-center gap-1 mr-1.5 lg:mr-3">
          <Link
            to="/"
            className="hover:text-black duration-200 transition-all ease-in-out"
          >
            Home
          </Link>
          <ScCaretRight className="size-3.5 lg:size-4" />
        </li>
        {links.map((link, index) => (
          <li key={index} className="flex items-center gap-1 mr-1.5 lg:mr-3">
            {index < links.length - 1 ? (
              <Link
                to={link.url ?? "/"}
                className="hover:text-black duration-200 transition-all ease-in-out"
              >
                {link.name}
              </Link>
            ) : (
              <span className="text-black">{link.name}</span>
            )}
            {index < links.length - 1 && (
              <ScCaretRight className="size-3.5 lg:size-4" />
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default BreadCrumb;
