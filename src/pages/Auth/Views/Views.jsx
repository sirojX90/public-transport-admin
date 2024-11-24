import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../store/firebase-cofig";
import bellIcon from "../../../assets/Images/bell.svg";

function Views() {
  const [loading, setLoading] = useState(true);
  const [complainData, setComplainData] = useState([]);
  const [folders, setFolders] = useState([]);

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

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const mainFolderRef = ref(storage, "public-transport/");
        const folderList = await listAll(mainFolderRef);
        const folderData = await Promise.all(
          folderList.prefixes.map(async (folder) => {
            const folderRef = ref(storage, folder.fullPath);
            const files = await listAll(folderRef);

            if (files.items.length > 0) {
              const fileUrl = await getDownloadURL(files.items[0]);
              return { folderName: folder.name, imageUrl: fileUrl };
            }
            return { folderName: folder.name, imageUrl: null };
          })
        );
        setFolders(folderData);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };
    fetchFolders();
  }, []);

  const handleComplaintStatusChange = async (index) => {
    const updatedData = { ...complainData[index], complainStatus: true };
    try {
      await fetch(
        `https://public-transport-4b3f5-default-rtdb.asia-southeast1.firebasedatabase.app/complaints/${updatedData.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complainStatus: true }),
        }
      );
      setComplainData((prevData) => {
        const newData = [...prevData];
        newData[index] = updatedData;
        return newData;
      });
    } catch (error) {
      console.error("Shikoyat holatini yangilashda xato:", error);
    }
  };

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
          <div className="flex justify-center items-center pt-[200px]">
            Loading...
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {complainData.map((data, index) => {
              const folder = folders.find(
                (folder) => folder.folderName === data.complainNumber
              );
              return (
                <div className="flex gap-5" key={data.id}>
                  <div className="w-[50%] flex flex-col gap-2 border-2">
                    <span>Ismi sharifi: {data.nameFull}</span>
                    <span>Telefon raqami: {data.phone}</span>
                    <span>Elektron pochta: {data.email}</span>
                    <span>Shikoyat mavzusi: {data.subjectComplain}</span>
                    <span>Shikoyat turi: {data.typeComplain}</span>
                    <span>Shikoyat raqami: {data.complainNumber}</span>
                    <div>
                      <span>Shikoyat matni: </span>
                      <span>{data.textComplain}</span>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="chesk" value="Bike" />
                      <label for="chesk">O'qildi sifatida belgilash</label>
                    </div>
                    <button
                      className="border-2 mx-[200px] p-[5px] bg-green-600 rounded-xl"
                      onClick={() => handleComplaintStatusChange(index)}
                    >
                      Yuborish
                    </button>
                  </div>
                  <div className="w-[50%] flex justify-center items-center border-2">
                    {folder && folder.imageUrl ? (
                      <img
                        className="w-[400px] h-[250px]"
                        src={folder.imageUrl}
                        alt={`Rasm ${data.complainNumber}`}
                      />
                    ) : (
                      <p>Rasm mavjud emas</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Views;
