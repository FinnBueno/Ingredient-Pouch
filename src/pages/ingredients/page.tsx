import React, { useState } from 'react';
import { FaCarrot, FaMinus, FaMortarPestle, FaPlus } from 'react-icons/fa';
import { Flex, Heading, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useContentManager } from 'src/services/database/ingredients';
import { AddIngredient } from './add';
import { IngredientCard } from './item';

export const IngredientsPage: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState<'base' | 'tastemaker'>('base');
    const { ingredients } = useContentManager();

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                <AddIngredient close={() => setModalOpen(false)} />
            </Modal>
            <Flex justifyContent='center' my={3}>
                <MButton onClick={() => setTab('base')} variant={tab === 'base' ? 'action' : 'actionHollow'} mr={4}>
                    <FaCarrot size={30} />
                </MButton>
                <MButton onClick={() => setTab('base')} variant={tab === 'tastemaker' ? 'action' : 'actionHollow'} ml={4}>
                    <FaMortarPestle size={30} />
                </MButton>
            </Flex>
            <Flex mx={2} py={0} flexDirection='row' flexWrap='wrap' variant='scrollList' maxHeight='calc(100% - 120px)' justifyContent='space-around'>
                {ingredients.list.filter(ingredient => ingredient.type === tab).map(ingredient => (
                    <Flex width='100%' key={ingredient.id} my={2}>
                        <IngredientCard ingredient={ingredient} />
                    </Flex>
                ))}
            </Flex>
            <Flex width='100%' my={2}>
                <MButton variant='primaryLarge' width='100%' onClick={() => setModalOpen(true)}>
                    <Text variant='body'>
                        Add ingredient
                    </Text>
                </MButton>
            </Flex>
        </Flex>
    );
}