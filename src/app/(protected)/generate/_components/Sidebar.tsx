'use client';
import { useEffect, useState } from 'react';
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
import { getModels, type Models } from '@/apiUtils/models';

export default function GenerateSidebar() {
  const { setImageDesc, setIsLoading, setImages } = useGenerateImage();
  const [models, setModels] = useState<Models[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<GenerateImageSchemaType>({
    defaultValues: {},
    resolver: zodResolver(GenerateImageSchema),
  });

  const selectedModel = watch('model');

  const parsedModels: SelectOptions[] = models.map((item) => {
    return {
      label: item.displayName,
      value: item.id.toString(),
    };
  });

  const filteredAspectRatios =
    models
      .find((item) => item.id === Number(selectedModel))
      ?.supportedDimensions?.map((ratio: string) => ({
        label: ratio,
        value: ratio,
      })) ?? [];

  const onSubmit: SubmitHandler<GenerateImageSchemaType> = async (data) => {
    setIsLoading(true);
    setImages([]);
    setImageDesc({
      prompt: '',
      imageCount: 0,
    });
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
      toast.error(e?.cause || 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getModels();
        setModels(data);
      } catch (e) {
        console.error('Failed to fetch models', e);
      }
    })();
  }, []);

  useEffect(() => {
    setValue('aspectRatio', '');
  }, [selectedModel]);

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
        options={filteredAspectRatios}
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
