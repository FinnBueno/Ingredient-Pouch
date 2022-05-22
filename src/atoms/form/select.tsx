import React from 'react';
import { Select as RebassSelect, SelectProps } from '@rebass/forms';
import { Flex, Text } from 'rebass';
import { useFormContext } from 'react-hook-form';

export const Select: React.FC<SelectProps & { label: string }> = ({ children, label, name, required, ...rest }) => {
    const { register } = useFormContext();
    return (
        <Flex flexDirection='column'>
            <Text variant='label' ml={1} mb={1}>
                {label}
            </Text>
            <RebassSelect {...register(name || 'name', { required })} {...rest} >
                {children}
            </RebassSelect>
        </Flex>
    );
};
