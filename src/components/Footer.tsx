import { Link } from "react-router-dom";
import ApplePay from "../assets/icons/ApplePay";
import GooglePay from "../assets/icons/GooglePay";
import Mastercard from "../assets/icons/Mastercard";
import Paypal from "../assets/icons/Paypal";
import Visa from "../assets/icons/Visa";
import Container from "./Container";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

function Footer() {
  return (
    <footer className="bg-[#f0f0f0] pt-[190px] lg:pt-[140px] pb-[78px] lg:pb-[82px]">
      <Container className="mb-6 md:mb-[50px]">
        <div className="flex justify-between gap-y-6 flex-wrap">
          <div className="w-full lg:w-auto flex flex-col lg:max-w-[248px]">
            <Logo />
            <p className="pt-3.5 pb-5 lg:pb-9 lg:pt-6 text-sm leading-[22px] text-[#727272]">
              We have clothes that suit your style and which you're proud to
              wear. From women to men.
            </p>
            <SocialIcons />
          </div>
          <div className=" w-1/2 lg:w-auto gap-4 lg:gap-[26px]  text-sm lg:text-base flex flex-col">
            <h3 className="uppercase satoshi font-medium leading-[18px]">
              Company
            </h3>
            <ul className="text-[#757575] flex flex-col gap-4 duration-200 leading-5">
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-auto gap-4 lg:gap-[26px] text-sm lg:text-base flex flex-col">
            <h3 className="uppercase satoshi font-medium leading-[18px]">
              Help
            </h3>
            <ul className="text-[#757575] flex flex-col gap-4 duration-200 leading-5">
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-auto gap-4 lg:gap-[26px] text-sm lg:text-base flex flex-col">
            <h3 className="uppercase satoshi font-medium leading-[18px]">
              Faq
            </h3>
            <ul className="text-[#757575] flex flex-col gap-4 duration-200 leading-5">
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Manage Deliveries
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Payments
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-auto gap-4 lg:gap-[26px] text-sm lg:text-base flex flex-col">
            <h3 className="uppercase satoshi font-medium leading-[18px]">
              Resources
            </h3>
            <ul className="text-[#757575] flex flex-col gap-4 duration-200 leading-5">
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  How to - Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-black transition-colors ease-in-out"
                >
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="">
        <div className="border-t  border-t-[#e4e4e4] pt-4 sm:pt-5 flex flex-col sm:flex-row justify-between gap-y-4 items-center">
          <p className="text-sm text-[#727272]">
            Salem.co © {new Date().getFullYear()}, All Rights Reserved
          </p>
          <ul className="flex items-center gap-2.5 sm:gap-3">
            <li className="w-[46px] h-[30px] bg-white rounded-md border border-[#D6DCE5] flex items-center justify-center ">
              <Visa />
            </li>
            <li className="w-[46px] h-[30px] bg-white rounded-md border border-[#D6DCE5] flex items-center justify-center ">
              <Mastercard />
            </li>
            <li className="w-[46px] h-[30px] bg-white rounded-md border border-[#D6DCE5] flex items-center justify-center ">
              <Paypal />
            </li>
            <li className="w-[46px] h-[30px] bg-white rounded-md border border-[#D6DCE5] flex items-center justify-center">
              <ApplePay />
            </li>
            <li className="w-[46px] h-[30px] bg-white rounded-md border border-[#D6DCE5] flex items-center justify-center">
              <GooglePay />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
