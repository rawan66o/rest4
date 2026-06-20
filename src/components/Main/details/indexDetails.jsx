import React, { useState } from 'react'
import details from '../../../data/details/details'
import Button from '../../ui/button';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const IndexDetails = () => {
    const [detail, setDetail] = useState(details);
 const increaseQuantity = () => {
  setDetail(prev => ({
    ...prev,
    quantity: prev.quantity + 1
  }));
};

const decreaseQuantity = () => {
  setDetail(prev => ({
    ...prev,
    quantity: prev.quantity > 1
      ? prev.quantity - 1
      : prev.quantity
  }));
};
 // حساب النجوم
  const rate = Math.floor(detail.stars);
  const hasHalfStar = detail.stars % 1 >= 0.5 && detail.stars % 1 < 1;
  const stars = Array.from({ length: rate }, (_, index) => (
    <i key={index} className="ri-star-fill  text-primary "></i>
  ));
  if (hasHalfStar) {
    stars.push(
      <i
        key="half-star"
        className="ri-star-half-line text-primary "
      ></i>,
    );
  }
  return (
  <div className='bg-bodyColor ' dir="rtl">
      <Header />
      <div className="xl:px-16 lg:px-16 md:px-5 xs:px-10  pt-12   pb-0">
    <div className='w-full flex-col min-h-screen md:flex lg:gap-7  '>
        <div className="md:flex xl:w-[80%] ">
            <div className="lg:w-[350px] md:w-[310px]  relative md:right-0 sm:right-20 md:mb-0 xs:mb-10"><img  src={detail.image}></img ></div>
            <div className="flex-col lg:space-y-3 mx-6">
                <div className="flex justify-between">
                    <p className='text-textPrimary text-h1 font-bold'>{detail.title}</p>
                    <p className='bg-[#6666660D] px-4 py-1 text-center'>{detail.category}</p>
                </div>
                 <div className="flex justify-between">
                    <p className='text-textPrimary text-h1 font-bold'>{detail.price}</p>
                    <p className='flex gap-2 text-textPrimary '> {detail.numComment} < BiCommentDots className='my-1'/>{stars}</p>
                </div>
                <div className="flex-col space-y-1 text-textSecondary">
                    <p className='font-medium text-h3'>الوصف</p>
                    <p>{detail.description}</p>
                    <p className='font-medium text-h3'>المكونات</p>
                    <p>{detail.ingredients}</p>
                </div>
                <div className=" py-3   flex justify-between  items-center ">
                    <div className="flex  gap-5">
                        <p className='font-medium  '>الكمية</p>
                        <div className="h-8 border flex justify-center rounded-md items-center text-slate-200 text-sm   ">
                        <Button title="+"  onClick={() => increaseQuantity()} className="bg-transparent border-0 lg:text-2xl xs:text-2xl md:text-sm lg:px-5 xs:px-5 md:px-2 text-primary  " />
                        |<span className='lg:px-4 md:px-1 sm:px-4 xs:px-1 text-black  '>{detail.quantity}</span>|
                        <Button title="-"  onClick={() => decreaseQuantity()} className="bg-transparent border-0 lg:text-2xl xs:text-2xl md:text-sm lg:px-5 xs:px-5 md:px-2 text-primary " />
                    </div>
                </div>
                    <div className="">
                    <Button title={"أضف للسلة "} icon={<AiOutlineShoppingCart/>} className='bg-[#FE942A]'/>
                    </div>
                </div>
            </div>
        </div>
        <div className=" mx-2">
            <div className="text-textSecondary text-h3 font-bold ">الملاحظات</div>
            <div className='m-4' >
                <input name="notes" className="w-[77%] border px-6 pb-16 h-32" placeholder='أضف ملاحظاتك'>
                </input>
            </div>
             </div>
    </div>
    </div>
    <Footer />
  </div>
  )
}

export default IndexDetails