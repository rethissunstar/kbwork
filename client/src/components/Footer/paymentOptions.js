import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmazonPay } from "react-icons/fa";

const payments = [
  {
    brand: FaCcVisa,
    label: "Visa",
    id: "visa",
  },
  {
    brand: FaCcMastercard,
    label: "Mastercard",
    id: "mastercard",
  },
  {
    brand: FaCcPaypal,
    label: "Paypal",
    id: "paypal",
  },
  {
    brand: FaCcAmazonPay,
    label: "Amazon Pay",
    id: "amazon",
  },
];

export default payments;
