import {
  useTestMutation,
  useUserAddressCreateMutation,
  useUserQuery,
} from "@/saleor/api";
import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";

function CheckoutForm() {
  let products;
  if (typeof window !== "undefined") {
    products = JSON.parse(localStorage.getItem("products"));
  }
  console.log(products);
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const initialCheckoutValues = {
    email: "",
    variantId: "",
    quantity: "",
    firstName: "",
    lastName: "",
    streetAddress1: "",
    city: "",
    postalCode: "",
    countryArea: "",
    country: "",
  };

  const [values, setValues] = useState(initialCheckoutValues);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [checkoutCreate, { loading, error }] = useTestMutation();
  const [accountAddressCreate] = useUserAddressCreateMutation();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const selectAddress = (address) => {
    setSelectedAddress(address);
    console.log("Selected address:", address);
  };

  const saveAdd = async () => {
    const mutationResult = await accountAddressCreate({
      variables: {
        address: {
          email: data?.user?.email,
          firstName: values.firstName,
          lastName: values.lastName,
          streetAddress1: values.streetAddress1,
          city: values.city,
          postalCode: values.postalCode,
          country: "IN",
          countryArea: "delhi",
        },
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      },
    });
  };

  const handleButtonClick = async () => {
    // Perform the mutation

    const mutationResult = await checkoutCreate({
      variables: {
        email: data?.user?.email,
        lineItems: products?.lines?.map((product) => ({
          variantId: product?.variant?.id,
          quantity: product?.quantity,
        })),
        firstName: values.firstName,
        lastName: values.lastName,
        streetAddress1: values.streetAddress1,
        city: values.city,
        postalCode: values.postalCode,
        country: "IN",
        countryArea: "delhi",
        ...(selectedAddress && {
          // Conditionally include the selected address values
          firstName: selectedAddress.firstName,
          lastName: selectedAddress.lastName,
          streetAddress1: selectedAddress.streetAddress1,
          city: selectedAddress.city,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country.code,
          countryArea: "delhi",
        }),
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      },
    });

    // Extract the necessary data from the mutation result
    const ctoken = mutationResult?.data?.checkoutCreate?.checkout?.token;
    console.log(ctoken);

    if (ctoken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("ctoken", ctoken);
      }

      Router.push(
        {
          pathname: "/shippingmethod",
          query: { data: JSON.stringify(ctoken) },
        },
        "/shippingmethod"
      );
    }
  };

  const handleSelectAddress = (address) => {
    setValues((prevValues) => ({
      ...prevValues,
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      streetAddress1: address.streetAddress1 || "",
      city: address.city || "",
      postalCode: address.postalCode || "",
      countryArea: address.countryArea || "",
      country: address.country || "",
    }));
  };

  const { data } = useUserQuery({
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    },
  });

  const [addbt, setAddbt] = useState(false);

  const handleAddbt = () => {
    setAddbt(!addbt);
  };

  return (
    <div>
      <div className="px-8 py-12 bg-white rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account</h1>
          <p className="font-semibold text-gray-900 mb-6">
            {data?.user?.email ? (
              data.user.email
            ) : (
              <>
                <Link href="/login">Sign in</Link>
              </>
            )}
          </p>
        </div>
        {addbt == true ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Address create
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="address" className="block text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="streetAddress1"
                  name="streetAddress1"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="country" className="block text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  onClick={handleAddbt}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    marginRight: "10px",
                    width: "200px",
                    float: "right",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Shipping Address
            </h1>
            <button
              onClick={handleAddbt}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                marginRight: "20px",
                width: "100%",
              }}
            >
              Add Address
            </button>
            <div className="flex flex-wrap">
              {data?.user?.addresses.map((address, index) => (
                <div
                  key={address.id}
                  style={{
                    border:
                      selectedAddress === address
                        ? "2px solid #000"
                        : "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    display: "inline-block",
                  }}
                  onClick={() => selectAddress(address)}
                >
                  <p>{`${address.firstName} ${address.lastName}`}</p>
                  <p>{address.streetAddress1}</p>
                  <p>{`${address.city}, ${address.postalCode}`}</p>
                  <p>{address.country.country}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Delivery methods
          </h1>
          <div className="flex flex-wrap">
            {products?.shipingMethods?.map((address, index) => (
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
                {/* <p>{`${address.firstName} ${address.lastName}`}</p>
                <p>{address.streetAddress1}</p>
                <p>{`${address.city}, ${address.postalCode}`}</p>
                <p>{address.country.country}</p> */}
              </div>
            ))}
          </div>
          <button
            onClick={handleButtonClick}
            className="bg-[#f02d34] text-white px-6 py-2 rounded-md hover:bg-[#f02d34] border-none"
            style={{
              width: "100%",
            }}
          >
            Place Order
          </button>
        </div>
        {/* <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Payment providers
          </h1>
        </div> */}
      </div>
    </div>
  );
}

export default CheckoutForm;
