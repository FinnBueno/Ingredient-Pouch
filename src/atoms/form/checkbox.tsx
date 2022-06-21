import React from 'react';
import { Checkbox as RebassCheckbox, InputProps, Label } from '@rebass/forms';
import { Text } from 'rebass';
import { UseControllerProps, useFormContext } from 'react-hook-form';

export const Checkbox: React.FC<InputProps & { label?: string, textAlign?: string, icon?: React.ReactNode } & UseControllerProps<any>> =
    ({
        children,
        label,
        name,
        required,
        ...rest
    }) => {
        const { register } = useFormContext();
        return (
            <Label width='100%' alignItems='center' flexDirection='column'>
                <Text variant='label' mb={1}>
                    {label || ''}
                </Text>
                <RebassCheckbox
                    variant='checkbox'
                    {...register(name, { required })}
                    {...rest}
                    mr={0}
                >
                    {children}
                </RebassCheckbox>
            </Label>
        );
    }