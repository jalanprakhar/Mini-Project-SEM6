import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Hackathons() {
  const [hackathons, setHackathons] = useState(null);

  const [ongoingTab, setOngoingTab] = useState(true);

  useEffect(() => {
    fetch("https://kontests.net/api/v1/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHackathons(data);
      });
  }, []);

  if(!hackathons){
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  const ongoing = hackathons?.filter(
    (hackathon) => hackathon.status === "CODING"
  );
  const upcoming = hackathons?.filter(
    (hackathon) => hackathon.status === "BEFORE"
  );

  const displayHackathons=ongoingTab?ongoing:upcoming;

  return (
    <div className="mt-28 w-[90%] m-auto mb-24">
      <div className="flex flex-row items-center justify-center">
        <h1
          className={`text-2xl cursor-pointer font-semibold ${
            ongoingTab ? "underline underline-offset-8 text-[#fd2f6e]" : ""
          } mr-8`}
          onClick={() => setOngoingTab(true)}
        >
          Ongoing
        </h1>
        <h1
          className={`text-2xl cursor-pointer font-semibold ${
            ongoingTab ? "" : "underline underline-offset-8 text-[#fd2f6e]"
          }`}
          onClick={() => setOngoingTab(false)}
        >
          Upcoming
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {displayHackathons.map((hackathon, _index) => (
            <div
              key={_index}
              className="bg-[#FFD9C0] bg-opacity-25 p-4 rounded-md flex flex-col justify-between"
            >
                <div>
              <h1 className="font-semibold text-lg">
                {hackathon.name}
              </h1>
              <div className="text-sm mt-2">
                <p>Date: {hackathon.start_time.slice(0, 10)}</p>
                <p>
                  Start Time:{" "}
                  {new Date(hackathon.start_time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                    minute: "numeric",
                  })}
                </p>
                <p>
                  End Time:{" "}
                  {new Date(hackathon.end_time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                    minute: "numeric",
                  })}
                </p>
              </div>
              </div>
              <div className="mt-4 flex justify-center">
                <a
                  className="py-1.5 px-3 text-base bg-gradient-to-r from-[#FFD9C0] to-[#FFD9C0] rounded-full hover:text-white hover:from-[#fd2f6e] hover:to-[#fe5740]"
                  href={hackathon.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Participate
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
