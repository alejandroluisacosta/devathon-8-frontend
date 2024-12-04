import { useForm } from 'react-hook-form';
import { ElveSchema } from '../../validations/ElveSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Elve as ElveInterface } from '../../interfaces/elvesResponse.interface';

import './ElveForm.scss';
import Input from '../ui/Input/Input';
import { useEffect } from 'react';

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
  const handleData = (data: FormData) => {
    if (elve) {
      console.log('Updating elve:', elve.id);
    } else {
      console.log('Adding new elve');
    }
    console.log(data);
  };

  const handleCancelBtn = () => {
    console.log('Return to elves list page');
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleData)}>
      <Input
        id="name"
        label="Name"
        type="text"
        placeholder="Slinky"
        //? I need to know what are this two under lines
        error={errors['name']}
        {...register('name')}
      />
      <Input
        id="image"
        label="Image"
        type="text"
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

        {/* Button that return you to elves page without save */}
        <button className="btn" onClick={handleCancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ElveForm;
