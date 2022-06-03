import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Flex, Heading } from 'rebass';
import { MButton } from 'src/atoms';
import { usePouch } from 'src/services/database/pouch';

export const SettingsPage: React.FC<{}> = () => {
    // const ingredientManager = useIngredients();
    const [amountDebounceCounter, setAmountDebounceCounter] = useState(0);
    const { currentDay, saveCurrentDay } = usePouch(i => setAmountDebounceCounter(i));
    const [timeoutId, saveTimeout] = useState<NodeJS.Timeout | undefined>();

    useEffect(() => {
        if (amountDebounceCounter !== currentDay) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const timeout = setTimeout(() => saveCurrentDay(amountDebounceCounter), 1000);
            saveTimeout(timeout);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [amountDebounceCounter]);

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Heading variant='heading3' textAlign='center' mt={4}>
                Current day
            </Heading>
            <Flex justifyContent='space-evenly' my={3} alignItems='center'>
                <MButton onClick={() => setAmountDebounceCounter(i => i - 1)} variant='action'>
                    <FaMinus size={30} />
                </MButton>
                <Heading>
                    {amountDebounceCounter}
                </Heading>
                <MButton onClick={() => setAmountDebounceCounter(i => i + 1)} variant='action'>
                    <FaPlus size={30} />
                </MButton>
            </Flex>
        </Flex>
    );
}