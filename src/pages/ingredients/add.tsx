import _ from 'lodash';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import { Flex, Heading, Image, Text } from 'rebass';
import { MButton, ProgressButton } from 'src/atoms';
import { Divider } from 'src/atoms/divider';
import { useIngredients } from 'src/services/database/ingredients';
import { usePouch } from 'src/services/database/pouch';
import { Ingredient } from 'src/services/database/types';
import { NewIngredientForm } from './forms/new-ingredient';

export const AddIngredient: React.FC<{ close: () => void }> = ({ close }) => {
    const ingredientManager = useIngredients();
    const [formSelection, setFormSelection] = useState('new');
    const [ingredientsToAdd, setNewIngredients] = useState<Ingredient[]>([]);
    const pouchManager = usePouch();

    return (
        <Flex flexDirection='column' height='100%' width='100%' p={3} maxHeight='calc(100vh - 180px)' overflowY='scroll' overflowX='hidden'>
            <Heading variant='heading2' mb={2}>Add ingredients</Heading>
            <Flex bg='secondary' variant='scrollList' minHeight='100px' maxHeight='300px' flexDirection='column' pt={1} mb={2}>
                {ingredientsToAdd.length === 0 ? (
                    <Flex height='100px' width='100%' justifyContent='center' alignItems='center'>
                        <Text variant='body'>Add some stuff!</Text>
                    </Flex>
                ) : (
                    ingredientsToAdd.map(i => (
                        <Flex width='100%' key={i.id} mb={1} justifyContent='space-between' alignItems='center'>
                            <Flex alignItems='center'>
                                {i.image ? (
                                    <Image
                                        ml={2}
                                        maxWidth='30px'
                                        maxHeight='30px'
                                        variant='thumbnail'
                                        src={URL.createObjectURL(i.image)}
                                    />
                                ) : (
                                    <></>
                                )
                                }
                                <Text
                                    ml={2}
                                    mt={2}
                                    variant='body'
                                    mb={1}>
                                    {
                                        i.name
                                    } - {
                                        i.type === 'base' ? 'Base' : 'Spice/Herb'
                                    }{
                                        i.type === 'tastemaker' ?
                                            ` - ${i.infinite ? 'Generic' : 'Special'}` :
                                            ''
                                    }
                                </Text>
                            </Flex>
                            <MButton variant='icon' onClick={
                                () => setNewIngredients(ingredientsToAdd.filter(ni => ni.id !== i.id))
                            }>
                                <FaTrash />
                            </MButton>
                        </Flex>
                    ))
                )}
            </Flex>
            <Divider />
            <Flex justifyContent='center' my={2}>
                <MButton onClick={() => setFormSelection('new')} width='100%' mr={2} variant={formSelection === 'new' ? 'primary' : 'hollow'}>
                    New
                </MButton>
                <MButton onClick={() => setFormSelection('existing')} width='100%' ml={2} variant={formSelection === 'existing' ? 'primary' : 'hollow'}>
                    Existing
                </MButton>
            </Flex>
            {formSelection === 'new' ? (
                <Flex mx={2} flexDirection='column' mb={2}>
                    <NewIngredientForm
                        onSubmit={
                            (i) => {
                                setNewIngredients(
                                    [
                                        ...ingredientsToAdd,
                                        {
                                            ...i,
                                            lasts: +(i.lasts || '1'),
                                            id: String(ingredientsToAdd.length + 1)
                                        }
                                    ]
                                );
                            }
                        }
                    />
                </Flex>
            ) : (
                <p>TODO: Make selection</p>
            )}
            <Divider />
            <ProgressButton scope='save-ingredient' minHeight='35px' mt={2} onClick={() => {
                const [newIngredients, existingIngredients] = _.partition(ingredientsToAdd, i => !Number.isNaN(Number(i.id)));
                trackPromise(pouchManager.addIngredientToPouch(...existingIngredients), 'save-ingredient').catch((e) => error(e));
                trackPromise(ingredientManager.createNewIngredients(newIngredients), 'save-ingredient').then(savedIngredients => {
                    trackPromise(pouchManager.addIngredientToPouch(...savedIngredients), 'save-ingredient').then(() => {
                        close();
                        toast('Succesfully added all items!');
                    }).catch((e) => error(e));
                }).catch((e) => error(e));
            }} type='submit' width='100%'>
                Save
            </ProgressButton>
        </Flex>
    );
}

function error(e: any) {
    toast(JSON.stringify(e) || 'no error');
    console.log(e);
}