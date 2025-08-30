import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray'>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
