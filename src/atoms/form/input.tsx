import React from 'react';
import { Input as RebassInput, InputProps } from '@rebass/forms';
import { Flex, Text } from 'rebass';
import { UseControllerProps, useFormContext } from 'react-hook-form';

export const Input: React.FC<InputProps & { label?: string, textAlign?: string } & UseControllerProps<any>> =
    ({
        children,
        label,
        name,
        required,
        rules,
        ...rest
    }) => {
        const { formState: { errors }, register } = useFormContext();
        const fieldErrors = errors[name];
        return (
            <Flex flexDirection='column'>
                <Text variant='label' ml={1} mb={1}>
                    {label || ''}
                </Text>
                <RebassInput {...(rest.type === 'file' ? {} : register(name, { required }))} autoComplete='off' variant='input' {...rest}>
                    {children}
                </RebassInput>
                {fieldErrors?.type === 'validate' ? <Text mt={1} variant='error'>{fieldErrors.message}</Text> : ''}
                {fieldErrors?.type === 'required' ? <Text mt={1} variant='error'>{fieldErrors.message || 'This value is required'}</Text> : ''}
                {fieldErrors?.type === 'min' ? <Text mt={1} variant='error'>{fieldErrors.message || `Number must be more than ${rules?.min}`}</Text> : ''}
                {fieldErrors?.type === 'max' ? <Text mt={1} variant='error'>{fieldErrors.message || `Number must be more than ${rules?.max}`}</Text> : ''}
                {fieldErrors?.type === 'minLength' ? <Text mt={1} variant='error'>{fieldErrors.message || `${label} must have more than ${rules?.minLength} characters`}</Text> : ''}
                {fieldErrors?.type === 'maxLength' ? <Text mt={1} variant='error'>{fieldErrors.message || `${label} must have less than ${rules?.maxLength} characters`}</Text> : ''}
                {fieldErrors?.type === 'pattern' ? <Text mt={1} variant='error'>{fieldErrors.message || `Please enter a valid ${label ? label.toLowerCase() : 'value'}`}</Text> : ''}
            </Flex>
        );
    }