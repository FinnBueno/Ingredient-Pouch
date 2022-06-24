import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Flex, Text } from 'rebass';
import { MButton } from './mbutton';

export const Tag: React.FC<{ onDelete?: () => void, content: string }> = ({ onDelete, content }) => (
    <Flex my={1} variant='tag'>
        <Text my={2} ml={3} variant='body'>{content}</Text>
        {onDelete ? <MButton mr={2} variant='icon' onClick={onDelete}>
            <FaTrash />
        </MButton> : <></>}
    </Flex>
)