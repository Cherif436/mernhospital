import React from "react";
import medecin from "../assets/medecin.jpg";

const Biography = () => {
  return (
    <div
      className="container flex flex-col gap-8 px-4 py-12 mx-auto bg-indigo-200 md:flex-row"
    >
      <div className="flex items-center justify-center flex-1">
        <img
          src={medecin}
          alt="whoweare"
          className="object-cover w-full h-auto rounded-md hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <p className="text-2xl font-bold text-center text-gray-800 ">
          Biography
        </p>
        <h3 className="text-lg font-bold text-gray-800">Who We Are</h3>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex magnam
          voluptatum consectetur reprehenderit fugiat recusandae aut similique
          illum natus velit, praesentium nostrum nesciunt. Deleniti, nesciunt
          laboriosam totam iusto!
        </p>
        <p className="text-lg text-gray-700">We are all in 2024 !</p>
        <p className="text-lg text-gray-700">
          We are Working on Hospital Management Systems
        </p>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex magnam
          voluptatum consectetur reprehenderit fugiat recusandae aut similique
          illum natus velit, praesentium nostrum nesciunt. Deleniti, nesciunt
          laboriosam totam iusto!
        </p>
        <p className="text-lg text-gray-700">
          This is Hospital Management system part One{" "}
        </p>
        <p className="text-lg text-gray-700">
          This is Hospital Management system part two is coming On this Years{" "}
        </p>
      </div>
    </div>
  );
};

export default Biography;