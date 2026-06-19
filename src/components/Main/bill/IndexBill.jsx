import React, { useState } from 'react'
import OrderBill from './orderBill'
import TotalBill from './totalBill'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const BillIndex = () => {
  const [customerData, setCustomerData] = useState({
  name: "",
  number: "",
  address: "",
  tableNumber: "",
});
  return (
    <div className='bg-bodyColor ' dir="rtl">
    <Header />
    <div className="xl:px-16 lg:px-16 md:px-5 xs:px-10  pt-28   pb-0">
    <div className='w-full min-h-screen lg:gap-10   '>
    
        <div >
          <TotalBill customerData={customerData}
  setCustomerData={setCustomerData} />
        </div>
            <div className=" ">
            <OrderBill customerData={customerData} />
        </div>
    </div>
    </div>
    <Footer />
    </div>
  )
}

export default BillIndex