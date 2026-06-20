// import React from 'react'
// import Categories from './categories'
// import Product from './product'
// const IndexMenu = () => {
//   return (
//   <div className="">
//       <Categories/>
//       <Product />
//   </div>
//   )
// }
// export default IndexMenu
import React, { useState } from 'react'
import Categories from './categories'
import Product from './product'

const IndexMenu = () => {
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div>
      <Categories
        // selectedCategoryId={selectedCategoryId}
        // setSelectedCategoryId={setSelectedCategoryId}
      />

      <Product
        // selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
};

export default IndexMenu;