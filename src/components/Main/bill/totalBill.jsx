
import React, { useState } from 'react';

const TotalBill = ({ customerData, setCustomerData }) => {
    const [toast, setToast] = useState({
        show: false,
    message: "",
    type: "",
  });
  // const [customerData, setCustomerData] = useState({
  //   name: '',
  //   number: '',
  //   address: '',
  //   tableNumber: '',
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const [open, setOpen] = useState(false);
const [message, setMessage] = useState("");
const [severity, setSeverity] = useState("success");

const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من صحة البيانات
    if (!customerData.name || !customerData.number || !customerData.address || !customerData.tableNumber) {
      setMessage('يرجى ملء جميع الحقول');
      setSeverity('error');
      setOpen(true);
      return;
    }

    setMessage("تم الإرسال بنجاح");
    setSeverity('success');
    setOpen(true);

    console.log("", customerData);
};



  return (
    <>
      <div className="md:right-[58%] -top-16 sm:right-[10%] md:mb-0 mb-5 relative p-6 pb-3 border xl:w-[370px] lg:w-[330px] md:w-[274px] sm:w-[370px] xs:w-[300px] xs:mx-16 rounded-lg bg-white">
        <p className="text-center font-bold pb-1 text-h1">معلومات الزبون</p>
        
        <form onSubmit={handleSubmit}>
          <label className="font-medium">
            اسم الزبون
            <input
              name="name"
              value={customerData.name}
              onChange={handleChange}
              className="border p-1 my-1 w-full text-[#BCBCBC] rounded mb-3"
            />
          </label>
          <label className="font-medium">
            رقم الزبون
            <input
              type="number"
              min={1}
              name="number"
              value={customerData.number}
              onChange={handleChange}
              className="border p-1 my-1 w-full text-[#BCBCBC] rounded mb-3"
            />
          </label>
          <label className="font-medium">
            عنوان الزبون
            <input
              name="address"
              value={customerData.address}
              onChange={handleChange}
              className="border p-1 my-1 w-full text-[#BCBCBC] rounded mb-3"
            />
          </label>
          <label className="font-medium">
            رقم الطاولة
            <input
            min={1}
              type="number"
              name="tableNumber"
              value={customerData.tableNumber}
              onChange={handleChange}
              className="border p-1 my-1 w-full text-[#BCBCBC] rounded mb-3"
            />
          </label>
          <button type="submit" className="mt-3 bg-blue-500 text-white p-2 rounded">إرسال</button>
          {
        message&&(
          <div className="">{message}</div>
        )
      }
        </form>
      </div>
      
  {/* Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-5 left-5 px-4 py-2 rounded-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
};

export default TotalBill;

