import React, { useEffect, useState } from "react";
import "./Complain.css";
import bellIcon from "../../../assets/Images/bell.svg";

function Complain() {
  const [loading, setLoading] = useState(true);
  const [complainData, setComplainData] = useState([]);

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
      setLoading(false);
    };
    const timer = setTimeout(fetchData, 100);
    return () => clearTimeout(timer);
  }, []);

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
        </div>
      </div>
      <div className="pl-[30px] pr-[30px] pt-[45px] pb-[45px]">
        <div className="flex justify-around mb-5">
          <h1 className="text-[#4F4F4F] text-[36px] font-semibold">
            Kelib tushgan shikoyatlar
          </h1>
          <span className="text-[#4F4F4F] text-[36px] font-semibold">
            {complainData.length}
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center pt-[200px]">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>I.F.SH</th>
                <th>Telefon</th>
                <th>Elektron pochta</th>
                <th>Murojaat mavzusi</th>
                <th>Murojaat turi</th>
                <th>Murojaat matni</th>
                <th>Murojaat raqami</th>
                <th>Murojaat statusi</th>
              </tr>
            </thead>
            <tbody>
              {complainData.map((data) => (
                <tr key={data.id}>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.nameFull}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.phone.split("998")}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.email}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.subjectComplain}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.typeComplain}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.textComplain}
                  </td>
                  <td
                    className={
                      data.complainStatus
                        ? "text-black text-center"
                        : "text-red-500 text-center"
                    }
                  >
                    {data.complainNumber}
                  </td>
                  <td>
                    {data.complainStatus ? (
                      <span className="flex justify-center">&#9989;</span>
                    ) : (
                      <span className="flex justify-center">&#10062;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Complain;
