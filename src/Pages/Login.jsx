import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendLoginData } from "../Services/authServices";
import { useContext, useState } from "react";
import { schema } from "../Schema/loginSchema ";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signIn(userData) {
    setLoading(true);
    const response = await sendLoginData(userData);
    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token);
      navigate("/");
    } else {
      setApiError(response.error);
    }
    setLoading(false);
    console.log(response);
  }

  return (
    <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
      <h1 className='text-2xl text-center mb-6'>Login Now</h1>
      <form onSubmit={handleSubmit(signIn)} className='flex flex-col gap-4'>
        <Input
          isInvalid={errors.email && touchedFields.email}
          errorMessage={errors.email?.message}
          variant='bordered'
          label='Email'
          type='email'
          {...register("email")}
        />
        <Input
          isInvalid={errors.password && touchedFields.password}
          errorMessage={errors.password?.message}
          variant='bordered'
          label='Password'
          type='password'
          {...register("password")}
        />

        <Button isLoading={loading} type='submit' color='primary'>
          Login
        </Button>
        <div>
          if you haven't account please,{" "}
          <Link to={"/register"} className='text-blue-500'>
            sign Up
          </Link>
        </div>
        {apiError && (
          <span className='text-center text-red-500'>{apiError}</span>
        )}
      </form>
    </div>
  );
}

export default Login;
