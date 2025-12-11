import { BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: <BsTwitterX size={12} />,
    href: "https://twitter.com/YourProfile",
  },
  {
    icon: <FaFacebookF size={12} />,
    href: "https://facebook.com/YourProfile",
  },
  {
    icon: <BsInstagram size={12} />,
    href: "https://instagram.com/YourProfile",
  },
  {
    icon: <BsGithub size={12} />,
    href: "https://github.com/YourProfile",
  },
];

function SocialIcons() {
  return (
    <ul className="flex items-center gap-3">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <Link
            to={link.href}
            className="bg-white size-7 border border-[#d5d5d5] transition-all text-black rounded-full flex items-center hover:bg-black hover:border-black hover:text-white justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SocialIcons;
