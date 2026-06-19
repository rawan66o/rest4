import React, { useEffect, useRef, useState } from 'react'
import { MdMoreVert } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
// import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '../../ui/button';
import axios from 'axios';
import api from '../../../api/index';
// import Products from '../../data/dataProduct/prodect';
const Product = () => {
// 
const [products, setProducts] = useState([]);
const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
const [addProduct, setAddProduct] = useState(null);
const [editProduct, setEditProduct] = useState(null);
const [editLoading, setEditLoading] = useState(false);
const [editForm, setEditForm] = useState({
  name: "",
  description: "",
   price:0,
  is_active: true,
  image: null,
  preview: "",
});
//
// const [openAddProduct, setOpenAddProduct] = useState(null);
// const [addProduct, setAddProduct] = useState(null);
// const [addProduct, setAddProduct] = useState(null);
const [openMenuAdd, setOpenMenuAdd] = useState(null);

const [addLoading, setAddLoading] = useState(false);
const [addForm, setAddForm] = useState({
  category_id: "",
  name: "",
  description: "",
  price: "",
  image: null,
  is_active: true,
});
  const fileInputRef = useRef(null);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
    // const [product , setProduct] =useState(Products);
    //  const [allcategories, setProducts] = useState([]);
useEffect(() => {
  // if (!selectedproductId) return;

  const fetchProducts = async () => {
    try {
      const response =  await api.get(`/admin/products`)
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching products:", error?.response?.data || error);
    }
  };
  fetchProducts();
}, []);
  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await api.delete(`/admin/products/${id}`)

      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      setToast({
        show: true,
        message: "تم الحذف بنجاح",
        type: "success",
      });

      setDeleteId(null);
      setOpenMenuId(null);
    } catch (error) {
  console.log("DELETE ERROR:", error.response?.data);
  console.log("STATUS:", error.response?.status);

      setToast({
        show: true,
        message: "فشل الحذف",
        type: "error",
      });
    } finally {
      setLoadingDelete(false);

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2000);
    }
  };
  
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setEditForm({
      ...editForm,
      image: file,
      preview: URL.createObjectURL(file),
    });
  }
};
const handleEdit = async (id) => {
  try {
    setEditLoading(true);
    await api.put( `/admin/products/${id}`,
      {
        name: editForm.name,
        description: editForm.description,
              price: parseInt(editForm.price, 10),
        is_active: editForm.is_active ? 1 : 0,
      },
    );

    // ✅ أهم سطر (تحديث مباشر في الشاشة)
    setProducts((prev) =>
      prev.map((item) =>
         item.id === id
          ? {
              ...item,
              name: editForm.name,
              description: editForm.description,
              price:editForm.price,
              is_active: editForm.is_active,
            }
          : item
      )
    );

    setToast({
      show: true,
      message: "تم التعديل بنجاح",
      type: "success",
    });

    setEditProduct(null);
  } catch (error) {
  console.log("EDIT ERROR:", error.response?.data);
  console.log("STATUS:", error.response?.status);

    console.log("DATA:", error.response?.data);
    setToast({
        show: true,
        message: "فشل التعديل",
        type: "error",
      });
  } finally {
    setEditLoading(false);
     setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2000);
  }
};
const handleAddImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setAddForm({
      ...addForm,
      image: file,
    });
  }
};
 const handleButtonClick = () => {
    fileInputRef.current.click(); // تفعيل input عند الضغط على الزر
  };
const handleAdd = async () => {
     try {
         setAddLoading(true);
    //  const payload = {
    //   category_id: addForm.category_id,
    //   name: addForm.name,
    //   description: addForm.description,
    //   price: Number(addForm.price),
    //   is_active: addForm.is_active ? 1 : 0,
    // };
const formData = new FormData();

formData.append("category_id", addForm.category_id);
formData.append("name", addForm.name);
formData.append("description", addForm.description);
formData.append("price", addForm.price);
formData.append("is_active", addForm.is_active ? 1 : 0);

if (addForm.image) {
 formData.append("image_url", addForm.image);
}
    const response = await api.post("/admin/products", formData);

    // المنتج الجديد (حسب API عندك)
    const newProduct = response.data.data;

    // ✅ تحديث القائمة مباشرة
setProducts((prev) => [...prev, newProduct]);

    setToast({
      show: true,
      message: "تمت الإضافة بنجاح",
      type: "success",
    });
  console.log(response.data.data);
   setAddProduct(null); 
  } catch (error) {
 console.log("STATUS:", error.response?.status);
console.log("DATA:", error.response?.data);
    setToast({
      show: true,
      message: "فشلت الإضافة",
      type: "error",
    });
    
  } finally {
    setAddLoading(false);
     setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2000);
  }
};

  return (
    <div className='flex flex-col  gap-5 min-h-screen    w-full '>
        <div className="flex  px-10  justify-between items-center me-10">
            <div className='text-[#474747] text-h1'>المنتجات</div>
            <Button    
               onClick={() => {
  setAddProduct(true);
  setOpenMenuAdd(null);
}}
              title="إضافة منتج" className="bg-white text-textPrimary rounded-full border-0 shadow-md" />
        </div>
        <div className="bg-[#F5F5F5] px-7 w-full">
              <div className="grid xl:grid-cols-4  md:grid-cols-3  grid-cols-2 gap-7 pt-5 pb-8 px-3 ">
 {products.map((product) => (
  <div
    key={product.id}
    className="relative rounded-2xl bg-white group flex flex-col justify-center items-center gap-2 lg:w-48 w-40 border h-52"
  >
      <div className="absolute top-3 z-40  text-2xl text-[#B2B2B2] lg:right-0 xl:right-2"
       onClick={(e) => e.stopPropagation()}>
                    <MdMoreVert
                       className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === product.id ? null : product.id
                      );
                    }} />
                      {openMenuId === product.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-lg overflow-hidden text-sm">

                      <button
                        className="w-full px-3 py-2 hover:bg-gray-100 text-right"
                     onClick={() => {
  setEditProduct(product);
setEditForm({
  name: product.name || "",
  description: product.description || "",
  price:product.price || "",
  is_active: product.is_active,
  image: null,
  preview: product.image_url,
});
  setOpenMenuId(null);
}}
                      >
                        تعديل
                      </button>

                      <button
                        className="w-full px-3 py-2 hover:bg-red-100 text-red-600 text-right"
                        onClick={() => {
                          setDeleteId(product.id);
                          setOpenMenuId(null);
                        }}
                      >
                        حذف
                      </button>

                    </div>
                  )}
                </div>
                <div className="size-[95px] bg-white   z-10 absolute top-4 flex justify-center items-center rounded-full   group-hover:border group-hover:shadow-md ">
                    <img
        className="size-[90px]  rounded-full"
        src={product.image_url}
        alt={product.name}
      />
                </div>

    <div className="text-center w-full h-36 text-black top-8 relative py-14 rounded-2xl group-hover:text-white  group-hover:bg-gradient-to-t group-hover:from-[#FF7200]  hover:to-[#ffffff]">
      <p className="text-xl pb-2">{product.name}</p>

      <p className="text-h3 text-[#A3A3A3] group-hover:text-white">
        {product.price}
        <span className="mx-1 ">ل.س</span>
      </p>
    </div>
  </div>
))}
        </div>
        </div>
            {/* Modal Delete */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-5 rounded-xl w-80 text-center">

            <p className="mb-4 text-lg font-bold">
              هل أنت متأكد من الحذف؟
            </p>

            <div className="flex gap-3">

              <button
                className="bg-gray-200 px-4 py-2 rounded-lg w-full"
                onClick={() => setDeleteId(null)}
              >
          إلغاء
                
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                onClick={() => handleDelete(deleteId)}
              >
                {loadingDelete ? "جاري الحذف..." : "حذف"}
              </button>

            </div>
          </div>
        </div>
      )}

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
{editProduct && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-5 rounded-xl w-96">

      <h2 className="font-bold mb-3">Modify Categories</h2>

      {/* Image */}
      <div className="flex justify-center mb-3">
        <img
          src={editForm.preview}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
<input
  className="border mt-2 p-2 w-full rounded mb-3"
  value={editForm.name}
  onChange={(e) =>
    setEditForm({ ...editForm, name: e.target.value })
  }
  placeholder="اسم الصنف"
/>

<textarea
  className="border mt-2 p-2 w-full rounded mb-3"
  value={editForm.description}
  onChange={(e) =>
    setEditForm({ ...editForm, description: e.target.value })
  }
  placeholder="الوصف"
/>
<input
  type="number"
  className="border mt-2 p-2 w-full rounded mb-3"
  value={editForm.price}
  onChange={(e) =>
    setEditForm({
      ...editForm,
      price: e.target.value,
    })
  }
  placeholder="السعر"
/>
<label className="flex items-center gap-2 mb-3">
  <input
    type="checkbox"
    checked={editForm.is_active}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        is_active: e.target.checked,
      })
    }
  />
  فعال
</label>

<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

      <div className="flex gap-3">

        <button
          className="bg-gray-200 w-full py-2 rounded"
          onClick={() => setEditProduct(null)}
        >
          إلغاء
        </button>

        <button
          className="bg-orange-500 text-white w-full py-2 rounded"
          onClick={() => handleEdit(editProduct.id)}
        >
          {editLoading ? "جاري الحفظ..." : "حفظ"}
        </button>

      </div>

    </div>
  </div>
)}
  
{addProduct && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-xl w-96">
       <div className="flex justify-between  ">
      <h2 className="font-bold mb-3">إضافة منتج</h2>

      <div onClick={() => setAddProduct(null)} className=""><IoMdClose/></div>
      </div>
      <div className="flex flex-col justify-center items-center mb-2 border-primary  border-dashed border-2 h-36">
        <div className="-scale-x-100 text-[#BCBCBC]"><FiUploadCloud size={36} /></div>
           <div>
      <button 
        onClick={handleButtonClick} 
        className="bg-primary p-2 w-36 m-2 rounded-2xl text-white"
      >
        تحميل صورة
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleAddImageChange}
        className='hidden'
        ref={fileInputRef} 
      />
    </div>
      <p className='text-[#BCBCBC] text-sm '>فقط PNG , JPG , JPEG</p>
      </div>
      <input
        type="number"
        className="border mt-2 p-2 w-full rounded mb-3"
        value={addForm.category_id}
        onChange={(e) =>
          setAddForm({
            ...addForm,
            category_id: e.target.value,
          })
        }
        placeholder="رقم الصنف"
      />

     <label className='font-medium'>
      اسم المنتج
       <input
        className="border mt-2 p-2 text-[#BCBCBC] text-sm w-full rounded mb-3"
        value={addForm.name}
        onChange={(e) =>
          setAddForm({
            ...addForm,
            name: e.target.value,
          })
        }
        placeholder="اسم المنتج"
      />
     </label>

      <label className='font-medium'>
        وصف المنتج
      <input
        className="border mt-2 p-2 w-full text-[#BCBCBC] text-sm rounded mb-3"
        value={addForm.description}
        onChange={(e) =>
          setAddForm({
            ...addForm,
            description: e.target.value,
          })
        }
        placeholder="الوصف"
      />
      </label>
      <label className='font-medium'>
        سعر المنتج
      <input
        type="number"
        className="border mt-2 p-2 w-full text-[#BCBCBC] text-sm rounded mb-3"
        value={addForm.price}
        onChange={(e) =>
          setAddForm({
            ...addForm,
            price: e.target.value,
          })
        }
        placeholder="السعر"
      />
      </label>
      {/* <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={addForm.is_active}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              is_active: e.target.checked,
            })
          }
        />
        فعال
      </label> */}

    

      <div className="flex">
        <button
          className="bg-orange-500 text-white w-28 py-2 rounded-2xl"
          onClick={handleAdd}
        >
          {addLoading ? "جاري الإضافة..." : "إضافة"}
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  )
}

export default Product