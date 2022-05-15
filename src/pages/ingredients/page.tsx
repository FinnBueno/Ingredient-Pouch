import React, { useState } from 'react';
import { FaCarrot, FaMinus, FaMortarPestle, FaPlus } from 'react-icons/fa';
import { Flex, Heading, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useContentManager } from 'src/services/database/ingredients';
import { AddIngredient } from './add';

export const IngredientsPage: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState<'food' | 'spices'>('food');
    const { ingredients } = useContentManager();
    console.log(ingredients);
    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                <AddIngredient close={() => setModalOpen(false)} />
            </Modal>
            <Flex justifyContent='center' my={3}>
                <MButton onClick={() => setTab('food')} variant={tab === 'food' ? 'action' : 'actionHollow'} mr={4}>
                    <FaCarrot size={30} />
                </MButton>
                <MButton onClick={() => setTab('spices')} variant={tab === 'spices' ? 'action' : 'actionHollow'} ml={4}>
                    <FaMortarPestle size={30} />
                </MButton>
            </Flex>
            <Flex mx={2} py={0} flexDirection='row' flexWrap='wrap' variant='scrollList' maxHeight='calc(100% - 120px)'>
                {ingredients.list.map((ingredient, index) => (
                    <Flex width='100%' key={ingredient.id} my={2}>
                        <Flex variant='card' width='100%'>
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
                    </Flex>
                ))}
            </Flex>
            <Flex width='100%' my={2}>
                <MButton variant='primaryLarge' width='100%'>
                    <Text variant='body'>
                        Add ingredient
                    </Text>
                </MButton>
            </Flex>
        </Flex>
    );
}