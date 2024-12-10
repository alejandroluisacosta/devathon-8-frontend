import { useForm } from 'react-hook-form';
import { ElveSchema } from '../../validations/ElveSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Elve as ElveInterface } from '../../interfaces/elvesResponse.interface';

import './ElveForm.scss';
import Input from '../ui/Input/Input';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

interface FormData {
  name: string;
  image: string;
  email: string;
  age: number;
  address: string;
  height: number;
}

interface ElveFormProps {
  elve?: ElveInterface;
}

const ElveForm: React.FC<ElveFormProps> = ({ elve }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(ElveSchema),
    defaultValues: elve || {},
  });

  useEffect(() => {
    if (elve) {
      reset(elve);
    }
  }, [elve, reset]);

  // Handler of Submit data. Two cases update an elve or update one created yet
  const handlerData = (data: FormData) => {
    if (elve) {
      console.log('Updating elve:', elve.id);
    } else {
      // Add new Elve
      const url = `http://127.0.0.1:8000/api/v1/labor-registration`;

      const formData = new FormData();

      const fileInput = document.querySelector('input[type="file"]');
      const selectedFile = fileInput.files[0];

      // Add data to formData
      formData.append('image', selectedFile);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('age', data.age);
      formData.append('address', data.address);
      formData.append('height', data.height);

      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(handlerData)}>
      <Input
        id="name"
        label="Name"
        type="text"
        placeholder="Slinky"
        error={errors['name']}
        {...register('name')}
      />
      <Input
        id="image"
        label="Image"
        type="file"
        placeholder="https://yourimage.com"
        error={errors['image']}
        {...register('image')}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="slinky.elves@northpole.com"
        error={errors['email']}
        {...register('email')}
      />
      <Input
        id="age"
        label="Age"
        type="number"
        placeholder="182"
        error={errors['age']}
        {...register('age')}
      />
      <Input
        id="address"
        label="Address"
        type="text"
        placeholder="Third house at left in the road of candies"
        error={errors['address']}
        {...register('address')}
      />
      <Input
        id="height"
        label="Height"
        type="number"
        placeholder="143"
        error={errors['height']}
        {...register('height')}
      />

      <div className="form__btns">
        <button type="submit" className="btn">
          Confirm
        </button>

        <NavLink className="btn" to="/elves">
          Cancel
        </NavLink>
      </div>
    </form>
  );
};

export default ElveForm;
