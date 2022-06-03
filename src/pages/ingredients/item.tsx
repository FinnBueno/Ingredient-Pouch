import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Flex, Heading, Image, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { usePouch } from 'src/services/database/pouch';
import { PouchItem } from 'src/services/database/types';

type IngredientCardProps = {
    item: PouchItem;
    onAmountChanged: (_newAmount: number) => void;
};

const waits: { [key: string]: NodeJS.Timeout | undefined } = {};

export const IngredientCard: React.FC<IngredientCardProps> = ({ item, onAmountChanged }) => {
    const { ingredient, amount, receivedOn } = item;
    const [amountDebounceCounter, setAmountDebounceCounter] = useState(amount);
    const { currentDay } = usePouch();

    const updateAmount = (i: number) => {
        onAmountChanged(i);
    }

    useEffect(() => {
        if (amountDebounceCounter !== item.amount) {
            if (waits[item.id]) {
                clearTimeout(waits[item.id])
            }
            waits[item.id] = setTimeout(() => updateAmount(amountDebounceCounter), 1000);
        }
        return () => {
            if (waits[item.id]) {
                clearTimeout(waits[item.id]);
                waits[item.id] = undefined;
            }
        }
    }, [amountDebounceCounter]);

    return (
        <Flex variant='card' pl={2} width='100%'>
            <Flex mr={2} width='65px' justifyContent='flex-start'>
                <Image src={item.ingredient.url} style={{ objectFit: 'contain', borderRadius: '15px' }} maxHeight='65px' width='100%' />
            </Flex>
            <Flex flexDirection='column' flex={1} justifyContent='center'>
                <Heading variant='heading4'>{ingredient.name}</Heading>
                {ingredient.notes ? <Text variant='body' mt={2}>{ingredient.notes}</Text> : <></>}
                <Text variant='body' mt={2}>
                    {currentDay === receivedOn ? 'Bought this today' : `${currentDay - receivedOn} day${currentDay - receivedOn === 1 ? '' : 's'} old`}
                </Text>
            </Flex>
            <Flex alignItems='center'>
                <MButton variant='icon' onClick={() => setAmountDebounceCounter(amountDebounceCounter - 1)}>
                    <FaMinus size={24} />
                </MButton>
                <Text variant='body' fontSize='34px' mx={2}>{amountDebounceCounter}</Text>
                <MButton variant='icon' onClick={() => setAmountDebounceCounter(amountDebounceCounter + 1)}>
                    <FaPlus size={24} />
                </MButton>
            </Flex>
        </Flex>
    );
}