import { toast } from 'react-toastify';

const notify = (message, type) => {
  const option = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };
  switch (type) {
    case 'info':
      toast.info(message, option);
      break;
    case 'success':
      toast.success(message, option);
      break;
    case 'warning':
      toast.warn(message, option);
      break;
    case 'error':
      toast.error(message, option);
      break;
    default:
      toast(message, option);
  }
};

export { notify };
