import React from 'react';
import { Flex, Text } from 'rebass';
import './animation.css';
import { theme } from 'src/services/theme/configuration';

interface NavbarButtonProps {
    onClick: () => void;
    icon: any; // what type is this supposed to be?
    title: string;
    active: boolean;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick, icon: Icon, title, active }) => (
    <Flex flex={1} justifyContent='center' style={{ background: active ? theme.colors.secondaryDarker : '' }}>
        <Flex alignItems='center' flexDirection='column' onClick={onClick}>
            <Icon size='100%' style={{ zIndex: 1, paddingTop: '20px' }} />
            <Text variant='caption' mt={1} mb={3}>
                {title}
            </Text>
        </Flex>
    </Flex>
);
