'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { generateImageAPI } from '@/apiUtils/generateImage';
import CTAButton from '@/components/UI/CTAButton';
import InputBox from '@/components/UI/Input';
import TextArea from '@/components/UI/TextArea';
import { useGenerateImage } from '@/context/Generate';
import {
  GenerateImageSchema,
  GenerateImageSchemaType,
} from '@/utils/FormSchema';
import RHFSelect, { SelectOptions } from './RHFSelect';
import { aspectRatio } from '@/utils/imageDimension';
import { type Models } from '@/apiUtils/models';

const imageDimensions: SelectOptions[] = aspectRatio.map((item) => {
  return { label: item, value: item };
});

export default function GenerateSidebar({ models }: { models: Models[] }) {
  const { setImageDesc, setIsLoading, setImages } = useGenerateImage();

  const parsedModels: SelectOptions[] = models.map((item) => {
    return {
      label: item.displayName,
      value: item.id.toString(),
    };
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<GenerateImageSchemaType>({
    defaultValues: {
      aspectRatio: '1:1',
    },
    resolver: zodResolver(GenerateImageSchema),
  });

  const onSubmit: SubmitHandler<GenerateImageSchemaType> = async (data) => {
    setIsLoading(true);
    try {
      setImageDesc({
        prompt: data.prompt,
        imageCount: data.imageCount,
      });
      const res = await generateImageAPI({
        prompt: data.prompt,
        imageCount: data.imageCount,
        aspectRatio: data.aspectRatio,
        modelId: data.model,
      });

      if (res?.data) {
        const images = res.data;
        setImages(images);
      }
    } catch (e: any) {
      toast.error('Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex-Col gap-4 bg-black  py-5 px-3 h-full max-h-screen overflow-y-auto hide-scrollbar relative'
    >
      <TextArea
        title={
          <div>
            <span className='text-primaryCTA'>Describe</span> what you want
          </div>
        }
        placeholder='Enter your prompt'
        register={register('prompt')}
        error={errors.prompt?.message}
      />

      <InputBox
        title='Image Count'
        type='number'
        placeholder='Number of Images'
        register={register('imageCount')}
        error={errors.imageCount?.message}
      />

      <RHFSelect<GenerateImageSchemaType>
        control={control}
        label='Model'
        placeholder='Select model'
        name='model'
        options={parsedModels}
      />

      <RHFSelect<GenerateImageSchemaType>
        control={control}
        label='Aspect Ratio'
        placeholder='Select aspect ratio'
        name='aspectRatio'
        options={imageDimensions}
      />

      {/* Generate Button */}
      <div className='md:absolute bottom-0 left-0 right-0 md:px-3 mb-4'>
        <CTAButton disabled={isSubmitting}>
          {isSubmitting ? 'Generating...' : 'Generate'}
        </CTAButton>
      </div>
    </form>
  );
}
