import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import data from '../../../data/dataBill/dataBill';
import Button from '../../ui/button';
import { IoMdClose } from "react-icons/io";
import api from '../../../api/index';

const OrderBill = ({customerData}) => {
  const [totalQuantity, setTotalQuantity] = useState(localStorage.getItem("totalQuantity"));
  const [Loading , setLoading]=useState(null);
    const [toast, setToast] = useState({
          show: false,
      message: "",
      type: "",
    });
    // const [subtotal, setSubtotal] = useState(localStorage.getItem("subtotal"));
    const [total, setTotal] = useState(localStorage.getItem("total"));
    const [orderForm, setOrderForm] = useState({
      customer_name: "",
      customer_phone: "",
     customer_address:"",
      status:"internal",
      table_number:"",
      payment_method:"cash",
      notes:"",
      items: [
    {
      product_id: "",
      quantity: 1,
    },
  ],
    });
  const [items, setItems] = useState(() => {
    // localStorage.removeItem('items');
    const savedItems = localStorage.getItem("items");
    

    if (savedItems) {
      return JSON.parse(savedItems);
    }

    return data;
  });

  const order = async () => {
     try {
         setLoading(true);
const formData = new FormData();
formData.append("customer_name", customerData.name);
formData.append("customer_phone", customerData.number);
formData.append("customer_address", customerData.address);
formData.append("status", orderForm.status);
formData.append("table_number", customerData.tableNumber);
formData.append("payment_method", orderForm.payment_method);
formData.append("notes", orderForm.notes);

// items
orderForm.items.forEach((item, index) => {
  console.log(item.id)
  formData.append(`items[${index}][product_id]`, item.id);
  formData.append(`items[${index}][quantity]`, item.quantity);
});

    const response = await api.post("/orders/create", formData);

    setToast({
      show: true,
      message: "تمت تأكيد الطلب بنجاح",
      type: "success",
    });
  console.log(response.data.data);
  } catch (error) {
 console.log("STATUS:", error.response?.status);
console.log("DATA:", error.response?.data);
    setToast({
      show: true,
      message: "فشلت تأكيد الطلب",
      type: "error",
    });
    
  } finally {
    setLoading(false);
     setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2000);
  }
};
  useEffect(() => {
     const update = () => {
       const storedSubtotal = localStorage.getItem("total");
       const storedTotalQuantit  =localStorage.getItem("totalQuantity");
       if (storedSubtotal) {
        //  setSubtotal(Number(storedSubtotal));
         setTotalQuantity(Number(storedTotalQuantit))
         setTotal(Number(storedSubtotal));
       }
     };
 
     // استدعاء الدالة لتحديث السعر عند التحميل
     update();
 
     // إعداد Interval لتحديث السعر كل ثانية (أو حسب الحاجة)
     const intervalId = setInterval(update, 600);
 
     // تنظيف الـ interval عند إلغاء التركيب
     return () => clearInterval(intervalId);
   }, []);
  useEffect(() => {
    if (items.length > 0) {
      const Total = items.reduce((accumulator, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        return accumulator + price * quantity;
      }, 0);

  const totalQuantity = items.reduce((accumulator, item) => {
      return accumulator + Number(item.quantity);
    }, 0);

    console.log('Total Quantity:', totalQuantity); // طباعة مجموع الكميات
    console.log('total:', Total);
    localStorage.setItem("totalQuantity", totalQuantity); // تخزين مجموع الكميات
    localStorage.setItem("total", Total);

    }
  }, [items]); // تأكد من أن لديك قوسين هنا



useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items));
}, [items]);

const increaseQuantity = (index) => {
  setItems((prevItems) => {
    const updatedItems = prevItems.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return updatedItems; // إرجاع العناصر المحدثة
  });
};

const decreaseQuantity = (index) => {
  setItems((prevItems) => {
    const updatedItems = prevItems.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
        : item
    );
    return updatedItems; // إرجاع العناصر المحدثة
  });
};

  // حذف عنصر
    const deleteItem = (index) => {
  setItems((prevItems) =>
    prevItems.filter((_, i) => i !== index)
  );
};

  return (
  <div className="flex justify-center md:flex-row flex-col items-center">
    <div className="md:absolute md:top-[135px] md:left-[50%] lg:left-[600px] xl:left-[590px] 2xl:right-[300px]">
       {items.map((item , index) => (
            <div
              key={item.id}
              className="mb-5 flex border  xl:w-[700px] lg:w-[447px] md:w-[334px] sm:w-[540px] xs:w-[420px]  items-center lg:gap-8 xs:gap-8 md:gap-3  rounded-lg bg-white p-3  shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-28 w-32  rounded-lg object-cover"
              />
             <div className="">
                 <div className='text-textPrimary  mb-1 text-h2'>
                {item.title}
              </div>
                <div className='text-textSecondary text-h3 md:text-sm'>
                {item.description}
              </div>
              <div className='text-primary md:text-sm  font-bold'>{item.price}ل.س</div>
              
             <div className="flex xl:py-1 md:py-2 pb-2 md:pb-1  lg:gap-5 md:gap-2 sm:gap-4 xs:gap-2">
                 <p className='font-medium  '>الكمية</p>
                 <div className="h-8 border flex justify-center rounded-md items-center text-slate-200 text-sm   ">
                  <Button title="+"  onClick={() => increaseQuantity(index)} className="bg-transparent border-0 lg:text-2xl xs:text-2xl md:text-sm lg:px-5 xs:px-5 md:px-2 text-primary  " />
                  |<span className='lg:px-4 md:px-1 sm:px-4 xs:px-1 text-black  '>{item.quantity}</span>|
                  <Button title="-"  onClick={() => decreaseQuantity(index)} className="bg-transparent border-0 lg:text-2xl xs:text-2xl md:text-sm lg:px-5 xs:px-5 md:px-2 text-primary " />
                  </div>
              <button

                onClick={() => deleteItem(index)}
                className="rounded bg-[#6666660D] relative xl:right-56 lg:right-0 md:right-0 xs:right-5  p-2 text-lg"
              >
              <RiDeleteBinLine />
              </button>
             </div>
             </div>
            </div>
          ))}
          </div>
           <div className=" space-y-2 p-6 border xl:w-[370px] lg:w-[330px] md:w-[274px] sm:w-[370px] xs:w-[300px] xs:mx-16 md:-left-[266px] lg:-left-[306px] xl:-left-[343px] relative xs:my-10 rounded-lg bg-white">
                  <p className="text-center font-bold text-h1">ملخص الطلب </p>
                  <div className="flex items-center justify-between p-2 border-b">
                      <p>عدد الأصناف</p>
                      <p>{totalQuantity}</p>
                  </div>
                  {items.map((item , index) => (
                      <div   key={item.id} className="flex items-center justify-between p-2 border-b">
                       <div className="">
                        <p> {item.title}</p>
                        <p className='flex pt-2'> {item.quantity} <IoMdClose className=' relative top-2 mx-1' size={11}/> {item.price}</p>
                       </div>
                      <p>{item.quantity*item.price}</p>
                  </div>
                  ))}
                 
                  <div className="flex items-center font-bold  text-h1 md:text-h3  justify-between p-2 border-b">
                      <p> المجموع الكلي </p>
                      <p>{total}</p>
                  </div>
                  <input className='border w-full h-20 px-5 pb-6' placeholder="اضف ملاحظاتك" value={orderForm.notes}
        onChange={(e) =>
          setOrderForm({
            ...orderForm,
            notes: e.target.value,
          })
        } ></input>
                  <button  className=" text-primary w-full bg-[#F496181A] py-2  font-bold"  onClick={order}
        >
          {Loading ? "جاري التأكيد..." : "تأكيد"}
          </button>
              </div>
                   {toast.show && (
        <div
          className={`fixed bottom-5 left-5 px-4 py-2 rounded-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
  </div>


  )
  
}

export default OrderBill
