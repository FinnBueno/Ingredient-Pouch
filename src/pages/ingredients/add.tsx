import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import { Flex, Heading, Image, Text } from 'rebass';
import { MButton, ProgressButton } from 'src/atoms';
import { Divider } from 'src/atoms/divider';
import { Ingredient, useContentManager } from 'src/services/database/ingredients';
import { NewIngredientForm } from './new-ingredient';

export const AddIngredient: React.FC<{ close: () => void }> = ({ close }) => {
    const { ingredients } = useContentManager();
    const [formSelection, setFormSelection] = useState('new');
    const [newIngredients, setNewIngredients] = useState<Ingredient[]>([]);

    return (
        <Flex flexDirection='column' height='100%' width='100%' p={3} maxHeight='540px' overflowY='scroll' overflowX='hidden'>
            <Heading variant='heading2' mb={2}>Add ingredients</Heading>
            <Flex bg='secondary' variant='scrollList' minHeight='100px' maxHeight='300px' flexDirection='column' pt={1}>
                {newIngredients.length === 0 ? (
                    <Flex height='100px' width='100%' justifyContent='center' alignItems='center'>
                        <Text variant='body'>Add some stuff!</Text>
                    </Flex>
                ) : (
                    newIngredients.map(i => (
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
                                        i.type
                                    }{
                                        i.type === 'tastemaker' ?
                                            ` - ${i.infinite ? 'Generic' : 'Special'}` :
                                            ''
                                    }
                                </Text>
                            </Flex>
                            <MButton variant='icon' onClick={
                                () => setNewIngredients(newIngredients.filter(ni => ni.id !== i.id))
                            }>
                                <FaTrash />
                            </MButton>
                        </Flex>
                    ))
                )}
            </Flex>
            <Flex justifyContent='center' my={3}>
                <MButton onClick={() => setFormSelection('new')} width='100%' mr={2} variant={formSelection === 'new' ? 'primary' : 'hollow'}>
                    New
                </MButton>
                <MButton onClick={() => setFormSelection('existing')} width='100%' ml={2} variant={formSelection === 'existing' ? 'primary' : 'hollow'}>
                    Existing
                </MButton>
            </Flex>
            {formSelection === 'new' ? (
                <Flex mx={2} flexDirection='column'>
                    <NewIngredientForm
                        onSubmit={
                            (i) => {
                                setNewIngredients(
                                    [
                                        ...newIngredients,
                                        {
                                            ...i,
                                            id: String(newIngredients.length + 1)
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
            <ProgressButton scope='save-ingredient' minHeight='35px' onClick={() => {
                console.log(newIngredients);
                close();
            }} type='submit' width='100%'>
                Save
            </ProgressButton>
        </Flex>
    );
}