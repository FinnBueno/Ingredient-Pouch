import React from 'react';
import { Flex, FlexProps } from 'rebass';

export const Divider: React.FC<FlexProps> = (props) => (
    <Flex {...props}>
        <hr style={{ width: '100%', borderTop: 'rgba(0, 0, 0, .25) 1px solid', borderStyle: 'solid' }} />
    </Flex>
);