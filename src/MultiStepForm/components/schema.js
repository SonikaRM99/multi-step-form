// /* eslint-disable import/no-anonymous-default-export */
// export default [
//   {
//     name: "name",
//     labelName: "Name",
//     type: "text",
//     validators: [
//       {
//         type: "required",
//         message: "This field required",
//       },
//       {
//         type: "regex",
//         pattern: /[A-Z,a-z]{0,50}$/,
//         message: "Invalid Name",
//       },
//     ],
//   },
// ];

import * as yup from "yup";

export default yup.object().shape({
  fullname: yup
    .string()
    .matches(/[A-Z,a-z]{0,8}$/, { message: "Please enter a valid name" })
    .required("This field is required!"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[6-9]{1}[0-9]{9}$/, {
      message: "Phone number is not valid",
    })
    .required("phoneNumber is required"),
});
