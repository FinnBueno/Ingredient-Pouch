import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Flex, Heading, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useContentManager } from 'src/services/database/ingredients';
import { AddIngredient } from './add';

export const IngredientsPage: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { ingredients } = useContentManager();
    console.log(ingredients);
    return (
        <Flex flexDirection='column' height='100%' width='100%'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                <AddIngredient close={() => setModalOpen(false)} />
            </Modal>
            <Flex mx={2} variant='scrollList' py={2} flexDirection='column'>
                {ingredients.list.map(ingredient => (
                    <Flex variant='card' width='100%' key={ingredient.id} my={2} justifyContent='space-between' alignItems='center'>
                        <Flex flexDirection='column'>
                            <Heading variant='heading4'>{ingredient.name}</Heading>
                            {ingredient.notes ? <Text variant='body' mt={2}>{ingredient.notes}</Text> : <></>}
                        </Flex>
                        <Flex alignItems='center'>
                            <MButton variant='icon'>
                                <FaMinus size={24} />
                            </MButton>
                            <Text variant='body' fontSize='34px' mx={2}>{ingredient.amount}</Text>
                            <MButton variant='icon'>
                                <FaPlus size={24} />
                            </MButton>
                        </Flex>
                    </Flex>
                ))}
                <Flex variant='action'>
                    <MButton variant='action' onClick={() => setModalOpen(true)}>
                        <FaPlus size={25} />
                    </MButton>
                </Flex>
            </Flex>
        </Flex>
    );
}