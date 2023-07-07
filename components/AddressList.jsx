import {
  useAddressDeleteMutation,
  useAddressSetDefaultMutation,
  useCurrentUserAddressesQuery,
  useSetAddressMutation,
} from "@/saleor/api";
import React, { useEffect, useState } from "react";

const AddressList = ({ addresses }) => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const [items, setItems] = useState([]);
  const [billingDefault, setBillingDefault] = useState(null);
  const [shippingDefault, setShippingDefault] = useState(null);

  const [accountSetDefaultAddress] = useSetAddressMutation();
  const [accountAddressDelete] = useAddressDeleteMutation();

  const handleSetBillingDefault = (addressIndex, addressId) => {
    const { data } = accountSetDefaultAddress({
      variables: { id: addressId, type: "BILLING" },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      },
    });
  };

  const handleSetShippingDefault = (addressIndex, addressId) => {
    const { data } = accountSetDefaultAddress({
      variables: { id: addressId, type: "SHIPPING" },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
      },
    });
  };

  const handleRemoveAddress = (addressIndex, id) => {
    accountAddressDelete({
      variables: { id: id },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
      },
    }).then(() => {
      
      const updatedItems = [...items];
      updatedItems.splice(addressIndex, 1);
      setItems(updatedItems);
    });
  };

  const { loading, error, data } = useCurrentUserAddressesQuery({
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    },
  });

  useEffect(() => {
    if (data && data.me && data.me.addresses) {
      setItems(data.me.addresses);
    }
  }, [data]);

  return (
    <div className="flex flex-wrap">
      {items.map((address, index) => (
        <div
          key={address.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            marginRight: "20px",
            width: "200px",
            display: "inline-block",
          }}
        >
          <p>{`${address.firstName} ${address.lastName}`}</p>
          <p>{address.streetAddress1}</p>
          <p>{`${address.city}, ${address.postalCode}`}</p>
          <p>{address.country.country}</p>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => handleSetBillingDefault(index, address?.id)}
              style={{
                backgroundColor: "#DDEAFF",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 1)",
                marginBottom: "8px",
              }}
              className="px-4 py-2 text-white rounded"
            >
              Set as Billing Default
            </button>
            <button
              onClick={() => handleSetShippingDefault(index, address?.id)}
              style={{
                backgroundColor: "#DDEAFF",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 1)",
                marginBottom: "8px",
              }}
              className="px-4 py-2 text-white rounded"
            >
              Set as Shipping Default
            </button>
            <button
              onClick={() => handleRemoveAddress(index, address.id)}
              style={{
                backgroundColor: "#DDEAFF",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 1)",
              }}
              className="px-4 py-2 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
