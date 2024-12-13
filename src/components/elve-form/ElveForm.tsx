import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Elve as ElveInterface } from '../../interfaces/elvesResponse.interface';
import { ElveSchema } from '../../validations/ElveSchema';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../ui/Input/Input';
import './ElveForm.scss';

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
  const navigate = useNavigate();

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
      const { image, ...rest } = elve;
      reset(rest);
    }
  }, [elve, reset]);

  const handlerData = (data: FormData) => {
    const url = `http://127.0.0.1:8000/api/v1/labor-registration`;
    const formData = new FormData();
    const selectedFile2 = data.image?.[0];
    // Add data to formData
    formData.append('image', selectedFile2);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('age', data.age.toString());
    formData.append('address', data.address);
    formData.append('height', data.height.toString());

    const data2 = fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    toast.promise(data2, {
      loading: 'Loading',
      success: 'Elve added',
      error: 'Error adding elve',
    });
    navigate('/elves');
  };

  const onEditElve = async (data: FormData) => {
    const toastId = toast.loading('Loading...');
    const selectedFile = data.image?.[0];
    const url = `http://127.0.0.1:8000/api/v1/labor-registration/${elve?.id}`;

    const payload: Partial<FormData> = {
      name: data.name,
      age: data.age,
      address: data.address,
      height: data.height,
    };

    if (data.email !== elve?.email) {
      payload.email = data.email;
    }
    try {
      const updateElvePromise = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
        },
      });

      const promises = [updateElvePromise];

      if (selectedFile) {
        const uploadImagePromise = fetch(url, {
          method: 'POST',
          body: (() => {
            const formData = new FormData();
            formData.append('image', selectedFile);
            return formData;
          })(),
          headers: {
            'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
          },
        });

        promises.push(uploadImagePromise);
      }
      const [updateElveResponse, uploadImageResponse] = await Promise.all(promises);

      if (uploadImageResponse && !uploadImageResponse.ok) {
        throw new Error('Error uploading image');
      }

      if (!updateElveResponse.ok) {
        throw new Error('Error updating elveeee');
      }

      toast.success('Elve updated correctly!', {
        id: toastId,
      });
      navigate('/elves');
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error to update elve', {
          id: toastId,
        });
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(!elve ? handlerData : onEditElve)}>
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
        step="any"
        error={errors['height']}
        {...register('height')}
      />

      <div className="form__btns">
        <button type="submit" className="btn--submit">
          {!elve ? 'Add' : 'Edit'}
        </button>

        <NavLink className="btn" to="/elves">
          Cancel
        </NavLink>
      </div>
    </form>
  );
};

export default ElveForm;
