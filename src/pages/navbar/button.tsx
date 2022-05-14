import React from 'react';
import { FaCogs } from 'react-icons/fa';
import { useRouteMatch, Switch, Route } from 'react-router';
import { Flex, Text } from 'rebass';

interface NavbarButtonProps {
    onClick: () => void;
    icon: any; // what type is this supposed to be?
    title: string;
    active: boolean;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick, icon: Icon, title, active }) => {
    return (
        <Flex flex={1} justifyContent='center'>
            <Flex alignItems='center' flexDirection='column' onClick={onClick}>
                <Icon size='100%' />
                <Text variant='caption' mt={1}>
                    {title}
                </Text>
            </Flex>
        </Flex>
    )
}