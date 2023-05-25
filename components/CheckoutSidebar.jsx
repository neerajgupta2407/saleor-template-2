import React from 'react'
import Router from 'next/router'

const styles = {
  product: {
    image: 'flex-shrink-0 bg-white w-28 h-28 border object-center object-cover',
    container: 'ml-8 flex-1 flex flex-col justify-center',
    name: 'text-xl font-bold',
  }
}

function CheckoutSidebar(){
  const products = JSON.parse(Router.query.data);
//   const total = products.reduce((acc, item) => {
//     const price = item.totalPrice.gross.amount;
//     return acc + price;
//   }, 0);
  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-300">
        {products.map((item) => (
          <li key={item.id} className="py-2">
            <div className="flex justify-between items-center">
              <img className={styles.product.image} src={item.variant.product.thumbnail.url}></img>
              <span className="text-gray-700">{item.totalPrice.gross.amount/item.variant.pricing.price.gross.amount}</span>
              <span className="text-gray-700">{item.variant.product.slug}</span>
              <span className="text-gray-700">${item.totalPrice.gross.amount}</span>
            </div>
          </li>
         ))} 
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">Total:</span>
        <span className="text-gray-600">${item.totalPrice.gross.amount}</span>
      </div>
    </div>
  )
}

export default CheckoutSidebar