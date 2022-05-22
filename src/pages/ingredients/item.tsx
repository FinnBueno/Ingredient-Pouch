import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Flex, Heading, Text } from 'rebass';
import { MButton } from 'src/atoms';
import { Ingredient } from 'src/services/database/ingredients';

export const IngredientCard: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
    return (
        <Flex variant='card' width='100%'>
            <Flex flexDirection='column'>
                <Heading variant='heading4'>{ingredient.name}</Heading>
                {ingredient.notes ? <Text variant='body' mt={2}>{ingredient.notes}</Text> : <></>}
            </Flex>
            <Flex alignItems='center'>
                <MButton variant='icon'>
                    <FaMinus size={24} />
                </MButton>
                <Text variant='body' fontSize='34px' mx={2}>1</Text>
                <MButton variant='icon'>
                    <FaPlus size={24} />
                </MButton>
            </Flex>
        </Flex>
    );
}