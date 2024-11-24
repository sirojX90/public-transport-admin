import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import bellIcon from "../../../assets/Images/bell.svg";

function BusOrder() {
  const [loading, setLoading] = useState(true);
  const [complainData, setComplainData] = useState([]);

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
      <div className="pl-[50px] pr-[30px] pt-[45px]">
        <div className="flex justify-around mb-5">
          <h1 className="text-[#4F4F4F] text-[36px] font-semibold">
            Buyurtma qilingan avtobuslar
          </h1>
          <span className="text-[#4F4F4F] text-[36px] font-semibold">
            {complainData.length}
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center pt-[200px]">
            Loading...
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="px-12">I.F.SH</th>
                <th className="px-12">Telefon</th>
                <th className="px-12">Avtobus rusumi</th>
                <th className="px-12">Hudud</th>
                <th className="px-12">Vaqt</th>
              </tr>
            </thead>
            <tbody>
              {complainData.map((data) => (
                <tr key={data.id}>
                  <td className="px-12">{data.nameFull}</td>
                  <td className="px-12">{data.phone.split("998")}</td>
                  <td className="px-12">{data.busType}</td>
                  <td className="px-12">{data.territory}</td>
                  <td className="px-12">
                    {format(new Date(data.timeStamp), "HH:mm dd.MM.yyyy")}
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

export default BusOrder;
