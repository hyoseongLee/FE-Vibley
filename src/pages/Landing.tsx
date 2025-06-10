import React from "react";
import Button from "../components/common/Button";
import spotifyLogo from "../assets/Spotify_Full_Logo_RGB_White.png";
import AIChat from "../assets/AIChat.png";

const loginurl = import.meta.env.VITE_API_URL;

const Landing: React.FC = () => {
    const handleLogin = () => {
        window.location.href = `${loginurl}/api/auth/login`;
      };      
  return (
    <div className="w-screen h-screen flex">
        <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-[48px] font-bold mb-6 font-shrikhand text-center">welcome to <br/> Vibely</h1>
    <p className="text-20-semibold mb-2 font-sans">AI와 스포티파이로 즐기는 맞춤 음악!</p>
    <p className="mb-[93px] text-20-semibold font-sans">지금, 당신만을 위한 음악을 만나보세요.</p>
           <Button onClick={handleLogin} className= "px-[35px] py-[17px] font-sans flex items-center justify-center">
         Log in with  <img src={spotifyLogo} alt="Spotify" className="w-[111px] h-[30px] ml-3" /> </Button>
        </div>
 
        <div className="w-1/2 bg-[#E2F0EF] flex items-center justify-center">
        <img src={AIChat} alt="AIChat" className="w-[438px] h-[660px] m-5 p-10 "/></div>
    </div>
  );
};

export default Landing;
