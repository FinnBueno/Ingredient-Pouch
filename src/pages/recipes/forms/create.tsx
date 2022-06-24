import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Flex, Text, Image } from 'rebass';
import { Checkbox, Input, ProgressButton } from 'src/atoms';
import { Ingredient, Recipe } from 'src/services/database/types';
import { IngredientSelector } from 'src/molecules/ingredient-selector';
import { Tag } from 'src/atoms/tag';

export const CreateRecipeForm: React.FC<{ onCreate: (_: Recipe) => void }> = ({ onCreate }) => {
    const form = useForm<Recipe>();
    const { handleSubmit, reset, setValue } = form;
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [image, setImage] = useState<File | undefined>();
    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(v => {
                onCreate(v);
                setImage(undefined);
                reset();
            })}>
                <Input label='Name' name='name' required minLength={1} mb={1} />
                <Input label='Notes' name='notes' type='textarea' mb={1} />
                <Flex>
                    <Input label='Tries to master' name='triesTillMastered' type='number' min={1} required defaultValue={3} mr={2} />
                    <Input label='DC' name='dc' type='number' min={1} required ml={2} />
                </Flex>
                <Flex my={1} flexWrap='wrap'>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Strength' name='check.strength' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Dexterity' name='check.dexterity' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Constitution' name='check.constitution' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Intelligence' name='check.intelligence' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Wisdom' name='check.wisdom' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Charisma' name='check.charisma' />
                    </Flex>
                </Flex>
                {/* <ImageSearch /> */}
                
                <Flex>
                    {image ? (
                        <Flex>
                            <Image variant='thumbnail' src={URL.createObjectURL(image)} />
                        </Flex>
                    ) : (<></>)}
                    <Input mb={1} type='file' name='image' label='Image' accept='image/png, image/gif, image/jpeg' onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                            setImage(file);
                        } else {
                            setImage(undefined);
                        }
                        setValue('image', file);
                    }} />
                </Flex>
            </form>
            <Flex flexDirection='column' mt={1}>
                <Text variant='label' mb={2}>Ingredients</Text>
                <IngredientSelector
                    onSelect={
                        i => setIngredients(old =>
                            [
                                ...old,
                                {
                                    ...i,
                                    id: i.id || `${old.length + 1}`,
                                }
                            ]
                        )
                    }
                    name='ingredients'
                />
            </Flex>
            <Flex flexDirection='column' mt={2}>
                {ingredients.map(i => (
                    <Tag
                        key={i.id || i.name}
                        content={i.name}
                        onDelete={() => setIngredients(old => old.filter(removable => removable !== i))}
                    />
                ))}
            </Flex>
            <ProgressButton
                scope='save-recipe'
                onClick={handleSubmit(e => {
                    onCreate({
                        ...e,
                        ingredients,
                    });
                    setIngredients([]);
                })}>
                Save recipe
            </ProgressButton>
        </FormProvider>
    )
}