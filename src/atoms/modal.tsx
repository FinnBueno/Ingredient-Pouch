import React from 'react';
import { Flex, FlexProps } from 'rebass';

export const Modal: React.FC<FlexProps & { isOpen: boolean, onBgClick: () => void }> = ({ isOpen, children, onBgClick, ...flex }) => {
    if (!isOpen) {
        return (<></>);
    }
    return (
        <Flex variant='modalBackground' onClick={onBgClick}>
            <Flex variant='modalContainer' {...flex} onClick={e => e.stopPropagation()}>
                {children}
            </Flex>
        </Flex>
    );
}