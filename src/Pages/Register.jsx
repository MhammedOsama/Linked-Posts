import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendRegisterData } from "../Services/authServices";
import { useState } from "react";
import { schema } from "../Schema/registerSchema";

function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signUp(userData) {
    setLoading(true);
    const response = await sendRegisterData(userData);
    if (response.message) {
      navigate("/login");
    } else {
      setApiError(response.error);
    }
    setLoading(false);
    console.log(response);
  }

  return (
    <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
      <h1 className='text-2xl text-center mb-6'>Register Now</h1>
      <form onSubmit={handleSubmit(signUp)} className='flex flex-col gap-4'>
        <Input
          isInvalid={errors.name && touchedFields.name}
          errorMessage={errors.name?.message}
          variant='bordered'
          label='Name'
          type='text'
          {...register("name")}
        />
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
        <Input
          isInvalid={errors.rePassword && touchedFields.rePassword}
          errorMessage={errors.rePassword?.message}
          variant='bordered'
          label='Re-password'
          type='password'
          {...register("rePassword")}
        />
        <div className='flex gap-4'>
          <Input
            isInvalid={errors.dateOfBirth && touchedFields.rePassword}
            errorMessage={errors.dateOfBirth?.message}
            variant='bordered'
            label='Date'
            type='date'
            {...register("dateOfBirth")}
          />
          <Select
            isInvalid={errors.gender && touchedFields.gender}
            errorMessage={errors.gender?.message}
            className='max-w-xs'
            label='Select an animal'
            {...register("gender")}>
            <SelectItem key={"male"}>Male</SelectItem>
            <SelectItem key={"female"}>Female</SelectItem>
          </Select>
        </div>
        <Button isLoading={loading} type='submit' color='primary'>
          Register
        </Button>
        <div>
          if you have account please,{" "}
          <Link to={"/login"} className='text-blue-500'>
            sign In
          </Link>
        </div>
        {apiError && (
          <span className='text-center text-red-500'>{apiError}</span>
        )}
      </form>
    </div>
  );
}

export default Register;
