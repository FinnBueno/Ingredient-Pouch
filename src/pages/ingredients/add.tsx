import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import { Flex, Heading } from 'rebass';
import { Input, MButton, ProgressButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useContentManager } from 'src/services/database/ingredients';

export const AddIngredient: React.FC<{ close: () => void }> = ({ close }) => {
    const { ingredients } = useContentManager();
    const methods = useForm();
    const { register, handleSubmit } = methods;

    return (
        <Flex flexDirection='column' height='100%' width='100%' p={3}>
            <Heading variant='heading2' mb={2}>Add new ingredient</Heading>
            <FormProvider {...methods}>
                <form onSubmit={
                    handleSubmit(
                        (t: any) => trackPromise(ingredients.create(t), 'save-ingredient')
                            .then(() => {
                                toast('Added a new ingredient');
                                close();
                            })
                    )
                }>
                    <Input label='Name' {...register('name', { required: true })} mb={2} />
                    <Input label='Notes' defaultValue='' {...register('notes', { value: '' })} mb={2} />
                    <Input label='Amount' defaultValue={1} type='number' {...register('amount', { required: true, value: 1 })} mb={2} />
                    <ProgressButton scope='save-ingredient' onClick={() => {}} type='submit' width='100%' mt={2}>
                        Save
                    </ProgressButton>
                </form>
            </FormProvider>
        </Flex>
    );
}