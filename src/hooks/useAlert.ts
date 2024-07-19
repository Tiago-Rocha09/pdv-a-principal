import { useState } from "react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const useAlert = () => {
  const [swalShown, setSwalShown] = useState(false);

  const showAlert = (props: SweetAlertOptions) => {
    MySwal.fire(props).then(() => {
      return console.log("saiu ok");
    });
  };

  return { showAlert };
};
