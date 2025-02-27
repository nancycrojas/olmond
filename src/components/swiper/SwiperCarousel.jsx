import "swiper/css";
import "./styles.css";

import { Image } from "@chakra-ui/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import active from "/swiper/activecampaign.svg";
import adobe from "/swiper/adobe.svg";
import airtable from "/swiper/airtable.svg";
import asana from "/swiper/asana.svg";
import aws from "/swiper/aws.svg";
import github from "/swiper/github.svg";
import google from "/swiper/google.svg";
import hubspot from "/swiper/hubspot.svg";
import jira from "/swiper/jira.svg";
import meta from "/swiper/meta.svg";
import microsoft from "/swiper/microsoft.svg";
import mongodb from "/swiper/mongodb.svg";
import mysql from "/swiper/mysql.svg";

export const SwiperCarousel = () => {
  const logos = [
    { src: jira, base: "20px", md: "60px" },
    { src: adobe, base: "80px", md: "60px" },
    { src: airtable, base: "80px", md: "120px" },
    { src: google, base: "60px", md: "120px" },
    { src: github, base: "60px", md: "120px" },
    { src: hubspot, base: "60px", md: "120px" },
    { src: active, base: "80px", md: "140px" },
    { src: asana, base: "30px", md: "80px" },
    { src: aws, base: "40px", md: "80px" },
    // { src: mailchimp, base: "80px", md: "120px" }, // Comentado si es necesario
    { src: microsoft, base: "80px", md: "120px" },
    { src: meta, base: "30px", md: "80px" },
    { src: mysql, base: "40px", md: "120px" },
    { src: mongodb, base: "30px", md: "120px" },
  ];
  return (
    <>
      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        loop={true}
        speed={10000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="swiper-integrations"
        breakpoints={{
          768: {
            spaceBetween: 30,
          },
          992: {
            spaceBetween: 50,
          },
          1280: {
            spaceBetween: 50,
          },
        }}
      >
        {logos.map(({ src, base, md }, index) => (
          <SwiperSlide key={index}>
            <Image src={src} boxSize={{ base, md }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
