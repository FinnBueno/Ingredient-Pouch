import React from 'react';
import { Flex, Heading, Text } from 'rebass';
import { Recipe } from 'src/services/database/types';

export const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    return (
        <Flex variant='cardClickable' flexDirection='column' mb={3}>
            <Heading variant='heading2'>
                {recipe.name}
            </Heading>
            <Text>
                {recipe.notes}
            </Text>
        </Flex>
    )
}