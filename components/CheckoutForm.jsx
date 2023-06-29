import { useTestMutation } from "@/saleor/api";
import React, { useState } from "react";
import Router from "next/router";

function CheckoutForm() {
  if (typeof window !== "undefined") {
  const products = JSON.parse(localStorage.getItem("products"));
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

  const saveButton = () => {
    const shouldSaveAddress = window.confirm(
      "Do you want to save this address?"
    );

    if (shouldSaveAddress) {
      const newAddress = {
        firstName: values.firstName,
        lastName: values.lastName,
        streetAddress1: values.streetAddress1,
        city: values.city,
        postalCode: values.postalCode,
        country: "IN",
        countryArea: "delhi",
      };

      console.log(newAddress)

      setSavedAddresses([...savedAddresses, newAddress]);
    }
  };
  const handleButtonClick = async () => {
    // Perform the mutation
    const mutationResult = await checkoutCreate({
      variables: {
        email: values.email,
        variantId: products[0]?.variant?.id,
        quantity: 1,
        firstName: values.firstName,
        lastName: values.lastName,
        streetAddress1: values.streetAddress1,
        city: values.city,
        postalCode: values.postalCode,
        country: "IN",
        countryArea: "delhi",
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

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full px-8 py-12 bg-white rounded-md shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Checkout
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2">
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
                <label htmlFor="lastName" className="block text-gray-700 mb-2">
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
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
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
            <div className="flex justify-between items-center">
              <button
                onClick={saveButton}
                className="bg-[#f02d34] text-white px-6 py-2 rounded-md hover:bg-[#f02d34] border-none"
              >
                Save Address
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-[#f02d34] text-white px-6 py-2 rounded-md hover:bg-[#f02d34] border-none"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {address.firstName} {address.lastName}, {address.streetAddress1},{" "}
              {address.city}, {address.postalCode}, {address.countryArea},{" "}
              {address.country}
            </span>
            <button
              type="button"
              onClick={() => handleSelectAddress(address)}
              className="text-blue-500"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutForm;
