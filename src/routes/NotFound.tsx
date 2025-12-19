import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

function NotFound({
  title = "Page Not Found",
  message = "Sorry, the page you're looking for doesn't exist.",
  showHomeButton = true,
}: NotFoundProps) {
  useDocumentTitle("404 Not Found");
  return (
    <main>
      <section className="py-20 lg:py-32">
        <Container>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <h1 className="satoshi text-6xl lg:text-8xl font-bold text-black/20 mb-4">
              404
            </h1>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-base lg:text-lg text-black/60 mb-6">{message}</p>
            {showHomeButton && (
              <Link to="/">
                <Button color="black" className="px-8" size="md">
                  Return Home
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}

export default NotFound;
