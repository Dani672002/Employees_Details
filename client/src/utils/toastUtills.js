import { toast } from "react-toastify";

const DEFAULT_TOAST_CONFIG = (type = 'default') => {
  const darkMode = localStorage.getItem('darkMode') === 'true';

  return {
    type,
    autoClose: 3000,
    draggable: true,
    position: 'top-right',
    hideProgressBar: false,
    pauseOnHover: false,
    closeOnClick: true,
    theme: darkMode ? "dark" : "light",
    newestOnTop: true
  };
};

export const _toast = (msg, type = 'default') => toast(msg, DEFAULT_TOAST_CONFIG(type));
