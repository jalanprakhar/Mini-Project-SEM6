/* eslint-disable */
import React from "react";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import ProfileCard from "../components/ProfileCard";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ users, setCurUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const handleMatch = async (id) => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: id,
      };
      const data = await api.matchUser(params);
      // console.log(data);
      setCurUser(data.data);
      navigate('/chat');
    } catch (e) {
      console.log(e);
    }
  };
  const handleReject = async (id) => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: id,
      };
      const data = await api.rejectUser(params);
      // console.log(data);
      setCurUser(data.data);
      navigate('/rejectedusers');
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(users)
  if (!users) {
    return (
      <div
        className="flex justify-center items-center h-[100vh] bg-[#FFD9C0] bg-opacity-25"
        style={{
          backgroundImage: 'url("../img/blob.svg"), url("../img/blob.svg")',
          backgroundSize: "80% 80%,70% 70%",
          backgroundPosition: "-140% 20%, 200% 100%",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col snap-y overflow-y-auto lg:snap-x snap-mandatory lg:flex-row lg:overflow-x-auto lg:overflow-y-hidden bg-[#FFD9C0] bg-opacity-25 h-[100vh] pb-10 lg:pb-0"
      style={{
        backgroundImage: 'url("../img/blob.svg"), url("../img/blob.svg")',
        backgroundSize: "80% 80%,70% 70%",
        backgroundPosition: "-170% -70%, 190% 110%",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {users.map((user, _index) => (
        <ProfileCard
          user={user}
          setCurUser={setCurUser}
          key={_index}
          handleMatch={handleMatch}
          handleReject={handleReject}
        />
      ))}
      {/* <h1>hi</h1> */}
    </div>
  );
}
