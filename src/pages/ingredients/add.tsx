import React, { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import { Flex, Heading, Text } from 'rebass';
import { Input, MButton, ProgressButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useContentManager } from 'src/services/database/ingredients';

export const AddIngredient: React.FC<{ close: () => void }> = ({ close }) => {
    const { ingredients } = useContentManager();
    const methods = useForm();
    const [formSelection, setFormSelection] = useState('new');
    const { fields, append } = useFieldArray({
        control: methods.control,
        name: 'ingredients',
    });
    const { register, handleSubmit } = methods;

    return (
        <Flex flexDirection='column' height='100%' width='100%' p={3} maxHeight='500px'>
            <Heading variant='heading2' mb={2}>Add ingredients</Heading>
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
                    <Flex bg='secondary' variant='scrollList' minHeight='100px' maxHeight='350px'>
                        <Flex height='100px' width='100%' justifyContent='center' alignItems='center'>
                            <Text variant='body'>Add some stuff!</Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent='center' mt={3}>
                        <MButton onClick={() => setFormSelection('new')} width='100%' mr={2} variant={formSelection === 'new' ? 'primary' : 'hollow'}>
                            Add New
                        </MButton>
                        <MButton onClick={() => setFormSelection('existing')} width='100%' ml={2} variant={formSelection === 'existing' ? 'primary' : 'hollow'}>
                            Add Existing
                        </MButton>
                    </Flex>
                    {/* <Input label='Name' {...register('name', { required: true })} mb={2} />
                    <Input label='Notes' defaultValue='' {...register('notes', { value: '' })} mb={2} />
                    <Input label='Amount' defaultValue={1} type='number' {...register('amount', { required: true, value: 1 })} mb={2} /> */}
                    <ProgressButton scope='save-ingredient' onClick={() => {}} type='submit' width='100%' mt={4}>
                        Save
                    </ProgressButton>
                </form>
            </FormProvider>
        </Flex>
    );
}