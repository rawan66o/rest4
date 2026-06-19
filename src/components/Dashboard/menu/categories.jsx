
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdMoreVert } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FiUploadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Button from "../../ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "../../../api/index";

// const Categories = ({ selectedCategoryId, setSelectedCategoryId }) => {
 const Categories = () => {
  const [allcategories, setAllcategories] = useState([]);
const [addCategory, setAddCategory] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
const [editCategory, setEditCategory] = useState(null);
const [editLoading, setEditLoading] = useState(false);

const [editForm, setEditForm] = useState({
  name: "",
  description: "",
  is_active: true,
  image: null,
  preview: "",
});
  const fileInputRef = useRef(null);

const [openMenuAdd, setOpenMenuAdd] = useState(null);

const [addLoading, setAddLoading] = useState(false);
const [addForm, setAddForm] = useState({
  name: "",
  description: "",
  image: null,
  is_active: true,
});
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const swiperRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await api.get(`/admin/categories`)
        console.log(response.data.data)
        const categories = response.data.data;

        setAllcategories(categories);

        // if (categories.length > 0) {
        //   setSelectedCategoryId(categories[0].id);
        // }
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchData();
  }, []);

  // حذف category
  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await api.delete(`/admin/categories/${id}`)
        // `https://menu.teknova-sy.com/api/admin/categories/${id}`,

      setAllcategories((prev) =>
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
    await api.put( `admin/categories/${id}`,
      {
        name: editForm.name,
        description: editForm.description,
        is_active: editForm.is_active ? 1 : 0,
      },
    );

    // ✅ أهم سطر (تحديث مباشر في الشاشة)
    setAllcategories((prev) =>
      prev.map((item) =>
        Number(item.id) === Number(id)
          ? {
              ...item,
              name: editForm.name,
              description: editForm.description,
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

    setEditCategory(null);
  } catch (error) {
    console.log("DATA:", error.response?.data);
    setToast({
        show: true,
        message: "فشل التعديل",
        type: "error",
      });
  } finally {
    setEditLoading(false);
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
const formData = new FormData();

formData.append("name", addForm.name);
formData.append("description", addForm.description);
formData.append("is_active", addForm.is_active ? 1 : 0);

if (addForm.image) {
 formData.append("image_url", addForm.image);
}
    const response = await api.post("/admin/categories", formData);

    // المنتج الجديد (حسب API عندك)
    const newProduct = response.data.data;

    // ✅ تحديث القائمة مباشرة
setAllcategories((prev) => [...prev, newProduct]);

    setToast({
      show: true,
      message: "تمت الإضافة بنجاح",
      type: "success",
    });
  console.log(response.data.data);
  setAddCategory(null);
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
    <div className="flex flex-col pt-2 gap-1 px-10 pb-3 w-full">

      {/* Header */}
      <div className="flex justify-between items-center me-12">
        <div className="text-[#474747] text-h1">الأصناف</div>
        <Button
          title="إضافة قسم"
          className="bg-white text-textPrimary rounded-full border-0 shadow-md"
                      onClick={() => {
  setAddCategory(true);
  setOpenMenuAdd(null);
}}
        />
      </div>
      {/* Swiper */}
      <div className="flex items-center gap-1 w-full">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="size-8 rounded-full bg-[#FF7200] text-white flex justify-center items-center"
        >
          <FaArrowRight />
        </button>
        <Swiper
          slidesPerView="auto"
          className="flex-1 !w-32 min-w-0"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {allcategories.map((category) => (
            <SwiperSlide
              key={category.id}
              className="xl:!w-40 lg:!w-24 md:!w-36 w-24 xl:mx-4 lg:mx-10 mx-6"
            >
              <div
                // onClick={() => setSelectedCategoryId(category.id)}
                className={`relative cursor-pointer group flex flex-col lg:w-40 justify-center items-center gap-2 h-48`}
              >

                {/* Menu */}
                <div
                  className="absolute top-3 text-2xl text-[#B2B2B2] -right-3 lg:right-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdMoreVert
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === category.id ? null : category.id
                      );
                    }}
                  />

                  {openMenuId === category.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-lg overflow-hidden text-sm">

                      <button
                        className="w-full px-3 py-2 hover:bg-gray-100 text-right"
                     onClick={() => {
  setEditCategory(category);
setEditForm({
  name: category.name || "",
  description: category.description || "",
  is_active: category.is_active,
  image: null,
  preview: category.image_url,
});
  setOpenMenuId(null);
}}
                      >
                        تعديل
                      </button>

                      <button
                        className="w-full px-3 py-2 hover:bg-red-100 text-red-600 text-right"
                        onClick={() => {
                          setDeleteId(category.id);
                          setOpenMenuId(null);
                        }}
                      >
                        حذف
                      </button>

                    </div>
                  )}
                </div>

                {/* Image */}
                <div className="size-[80px] bg-white z-10 absolute top-5 flex justify-center items-center rounded-full group-hover:border group-hover:shadow-md">
                  <img
                    className="size-[75px] rounded-full"
                    src={category.image_url}
                    alt={category.name}
                  />
                </div>

                {/* Text */}
                <div className="text-center text-black w-40 h-32 top-7 relative z-0 py-14 rounded-2xl group-hover:text-white group-hover:bg-gradient-to-t group-hover:from-[#FF7200] group-hover:to-[#ffffff]">

                  <p className="text-h1 font-bold pb-2">
                    {category.name}
                  </p>

                  <p className="text-h3 text-[#807E7D] group-hover:text-white">
                    {category.products_count}
                    <span className="mx-1">صنف</span>
                  </p>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="size-8 rounded-full bg-[#FF7200] text-white flex justify-center items-center"
        >
          <FaArrowLeft />
        </button>
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
{editCategory && (
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
  className="border p-2 w-full rounded mb-3"
  value={editForm.name}
  onChange={(e) =>
    setEditForm({ ...editForm, name: e.target.value })
  }
  placeholder="اسم الصنف"
/>

<textarea
  className="border p-2 w-full rounded mb-3"
  value={editForm.description}
  onChange={(e) =>
    setEditForm({ ...editForm, description: e.target.value })
  }
  placeholder="الوصف"
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
          onClick={() => setEditCategory(null)}
        >
          إلغاء
        </button>

        <button
          className="bg-orange-500 text-white w-full py-2 rounded"
          onClick={() => handleEdit(editCategory.id)}
        >
          {editLoading ? "جاري الحفظ..." : "حفظ"}
        </button>

      </div>

    </div>
  </div>
)}
{addCategory && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-xl w-96">
       <div className="flex justify-between  ">
      <h2 className="font-bold mb-3">إضافة صنف</h2>

      <div onClick={() => setAddCategory(null)} className=""><IoMdClose/></div>
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

     <label className='font-medium'>
      اسم الصنف
       <input
        className="border mt-2 p-2 text-[#BCBCBC] text-sm w-full rounded mb-3"
        value={addForm.name}
        onChange={(e) =>
          setAddForm({
            ...addForm,
            name: e.target.value,
          })
        }
        placeholder="اسم الصنف"
      />
     </label>

      <label className='font-medium'>
        وصف الصنف
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
  );
};

export default Categories;