import React from 'react';
import { Flex, Heading, Text } from 'rebass';
import { Recipe } from 'src/services/database/types';

export const RecipeCard: React.FC<{ recipe: Recipe, onClick: () => void }> = ({ recipe, onClick }) => {
    return (
        <Flex variant='cardClickable' flexDirection='column' mb={3} onClick={onClick}>
            <Heading variant='heading2'>
                {recipe.name}
            </Heading>
            <Text>
                {recipe.notes}
            </Text>
        </Flex>
    )
}