import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Flex, Image } from 'rebass';
import _ from 'lodash';
import { Input, MButton, Select } from 'src/atoms';
import { Ingredient } from 'src/services/database/types';


export const NewIngredientForm: React.FC<{ onSubmit: (_ingredient: Ingredient) => void }> = ({ onSubmit }) => {
    const methods = useForm<Ingredient>();
    const { handleSubmit, reset, setValue } = methods;
    const [image, setImage] = useState<File | undefined>();
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(v => {
                onSubmit(v);
                reset();
                setImage(undefined);
            })}>
                <Input label='Name' name='name' required minLength={1} onChange={(_e) => {
                    _.debounce(async () => {
                    }, 1000);
                }} />
                <Flex mt={1} />
                <Select
                    label='Type'
                    name='type'
                    required
                    onChange={
                        (e) => setValue('infinite', +e.target.selectedIndex === 2 ? true : false)
                    }
                >
                    <option value='base'>Base ingredient</option>
                    <option value='tastemaker'>Spice/Herb - Special</option>
                    <option value='tastemaker'>Spice/Herb - Generic</option>
                </Select>
                <Flex>
                    {image ? (
                        <Flex>
                            <Image variant='thumbnail' src={URL.createObjectURL(image)} />
                        </Flex>
                    ) : (<></>)}
                    <Input type='file' name='image' label='Image' onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                            setImage(file);
                        } else {
                            setImage(undefined);
                        }
                        setValue('image', file);
                    }} />
                </Flex>
                <Input label='Lasts for' name='lasts' min={1} defaultValue={5} type='number' />
                <MButton mt={2} width='100%' variant='primary' type='submit'>
                    Add to list
                </MButton>
            </form>
        </FormProvider>
    )
}