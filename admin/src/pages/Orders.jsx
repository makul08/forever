import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency} from '../App'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
  <div>
    <h3>Order Page</h3>
    <div>
      {orders.map((order, index) => (
        <div className='grid grid-cols-1 grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
        <img className='w-12' src={assets.parcel_icon} alt="" />

        {/* Column 1 (content-wise): items + name + address, all stacked */}
        <div>
          {order.items.map((item, index) => {
            if (index === order.items.length - 1) {
              return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span> </p>
            }
            else {
              return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span> ,</p>
            }
          })}
          <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
          <p>{order.address.street + ","}</p>
          <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
          <p>{order.address.phone}</p>
        </div>

        {/* Column 2: number of items + mode of payment */}
        <div>
          <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
          <p className='mt-3'>Method : {order.paymentMethod}</p>
          <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
          <p>Date : {new Date(order.date).toLocaleDateString()}</p>
        </div>

        {/* Column 3: price */}
        <div>
          <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
        </div>

        {/* Column 4: status */}
        <div>
          <select>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
      ))}
    </div>
  </div>
  )
}

export default Orders