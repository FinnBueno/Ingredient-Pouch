import React from 'react';
import { Flex } from 'rebass';

export const LandingStructure: React.FC<{ img: string }> = ({ img, children }) => (
    <Flex flexDirection='column' width='100%' alignItems='center' justifyContent='flex-end' height='100%' maxHeight='100vh'>
        <Flex style={{ position: 'absolute', top: 0 }}>
            <img src={img} width='100%' />
        </Flex>
        <Flex
            style={{
                zIndex: 1,
                borderRadius: '50%/30px 30px 0 0',
                boxShadow: '0px -3px 40px 15px #000000',
            }}
            flexDirection='column'
            width='100%'
            height='60%'
            maxHeight='60%'
            bg='background'
            pt='32px'
            justifyContent='space-between'
            alignItems='center'
            px={2}
        >
            {children}
        </Flex>
    </Flex>
);
