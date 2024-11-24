import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import bellIcon from "../../../assets/Images/bell.svg";
import check from "../../../assets/Images/check.svg";
import bus from "../../../assets/Images/bus.svg";
import complain from "../../../assets/Images/examsIcon.svg";
import card from "../../../assets/Images/card.svg";
import { Link } from "react-router-dom";
function Dashboard({ setToken }) {
  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data");
    }
  };
  const clickHandler = () => {
    removeItem("token");
    setToken(true);
  };

  let count = 0;
  const [complainData, setComplainData] = useState([]);
  const [busOrderData, setBusOrderData] = useState([]);
  const [transportCardData, setTransportCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://public-transport-4b3f5-default-rtdb.asia-southeast1.firebasedatabase.app/complaints.json"
      );
      const data = await res.json();
      let formatData = [];
      for (const key in data) {
        formatData.push({ ...data[key], id: key });
      }
      setComplainData(formatData);
    };
    const timer = setTimeout(fetchData, 100);
    return () => clearTimeout(timer);
  }, []);

  console.log(count);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://public-transport-4b3f5-default-rtdb.asia-southeast1.firebasedatabase.app/bus-order.json"
      );
      const data = await res.json();
      let formatData = [];
      for (const key in data) {
        formatData.push({ ...data[key], id: key });
      }
      setBusOrderData(formatData);
    };
    const timer = setTimeout(fetchData, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://public-transport-4b3f5-default-rtdb.asia-southeast1.firebasedatabase.app/transport-cards.json"
      );
      const data = await res.json();
      let formatData = [];
      for (const key in data) {
        formatData.push({ ...data[key], id: key });
      }
      setTransportCardData(formatData);
    };
    const timer = setTimeout(fetchData, 100);
    return () => clearTimeout(timer);
  }, []);

  for (let i = 0; i < complainData.length; i++) {
    if (complainData[i].complainStatus === true) {
      count++;
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between shadow-md w-full pt-[15px] pb-[15px] pl-[94px] pr-[100px] bg-[#FCFAFA] ">
        <div className="flex flex-col">
          <strong className="text-[#424242] text-[16px]">
            Jamoat Transporti
          </strong>
          <p className="text-[#424242] text-[16px]">
            Shaxsiy transportdan ko‘ra jamoat transporti afzal
          </p>
        </div>
        <div className="flex items-center space-x-[48px]">
          <img src={bellIcon} alt="bell Icon here" width={28} height={28} />
          <button
            onClick={clickHandler}
            className="text-[#FCFAFA] text-[16px] font-semibold w-[120px] rounded-[8px] bg-[#509CDB] py-[10px] text-center logout-dash transition-[0.3s]"
          >
            Chiqish
          </button>
        </div>
      </div>
      <div className="py-[45px] px-[100px]">
        <div className="grid grid-cols-2 gap-10 border-2">
          <div className="border-2 w-[100%] px-5 pt-10 pb-2 bg-blue-500 rounded-xl">
            <Link to="/complain">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <img src={complain} className="w-[50px] " />
                  <span className="text-[35px] text-white">
                    {complainData.length}
                  </span>
                </div>
                <p>Shikoyatlar</p>
              </div>
            </Link>
          </div>
          <div className="border-2 w-[100%] px-5 pt-10 pb-2 bg-green-500 rounded-xl">
            <Link to="/views">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <img src={check} className="w-[50px] " />
                  <span className="text-[35px] text-white">{count}</span>
                </div>
                <p>Ko'rilganlar</p>
              </div>
            </Link>
          </div>
          <div className="border-2 w-[100%] px-5 pt-10 pb-2 bg-red-400 rounded-xl">
            <Link to="/transport-cards">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <img src={card} className="w-[50px] " />
                  <span className="text-[35px] text-white">
                    {transportCardData.length}
                  </span>
                </div>
                <p>Karta buyurtmalar</p>
              </div>
            </Link>
          </div>
          <div className="border-2 w-[100%]  px-5 pt-10 pb-2 bg-yellow-400 rounded-xl">
            <Link to="/bus-order">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <img src={bus} className="w-[50px] " />
                  <span className="text-[35px] text-white">
                    {busOrderData.length}
                  </span>
                </div>
                <p>Avtobus buyurtmalar</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;