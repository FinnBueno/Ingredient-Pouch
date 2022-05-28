import React, { useState } from 'react';
import { FaCarrot, FaMortarPestle } from 'react-icons/fa';
import { Flex, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { usePouch } from 'src/services/database/pouch';
import { AddIngredient } from './add';
import { IngredientCard } from './item';

export const IngredientsPage: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState<'base' | 'tastemaker'>('base');
    const pouch = usePouch();

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                <AddIngredient close={() => setModalOpen(false)} />
            </Modal>
            <Flex justifyContent='center' my={3}>
                <MButton onClick={() => setTab('base')} variant={tab === 'base' ? 'action' : 'actionHollow'} mr={4}>
                    <FaCarrot size={30} />
                </MButton>
                <MButton onClick={() => setTab('tastemaker')} variant={tab === 'tastemaker' ? 'action' : 'actionHollow'} ml={4}>
                    <FaMortarPestle size={30} />
                </MButton>
            </Flex>
            <Flex mx={2} py={0} flexDirection='column' variant='scrollList' maxHeight='calc(100% - 120px)' flexGrow={1} justifyContent='flex-start'>
                {pouch.items.filter(item => item.ingredient.type === tab).map(item => (
                    <Flex width='100%' key={item.id} my={2}>
                        <IngredientCard item={item} onAmountChanged={amount => pouch.setAmount(item, amount)} />
                    </Flex>
                ))}
            </Flex>
            <Flex width='100%' alignSelf='flex-end' mt={2} mb={3}>
                <MButton mx={3} variant='primaryLarge' width='100%' onClick={() => setModalOpen(true)}>
                    <Text variant='body'>
                        Add ingredient
                    </Text>
                </MButton>
            </Flex>
        </Flex>
    );
}