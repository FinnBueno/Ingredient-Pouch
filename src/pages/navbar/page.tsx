import React, { useState } from 'react';
import {
    FaBacon, FaBookmark, FaBookOpen, FaBreadSlice, FaCarrot, FaCheese, FaCogs, FaCookie, FaEgg, FaFish, FaLemon, FaPepperHot, FaWineBottle 
} from 'react-icons/fa';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { Flex, Heading, Text } from 'rebass';
import { IngredientsPage } from '../ingredients';
import { NavbarButton } from './button';

export const NavigationBar: React.FC<{}> = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const [tab, setCurrentTab] = useState('Ingredients');

    return (
        <Flex flexDirection='column' justifyContent='space-between' height='100%'>
            <Flex variant='headerFrame' justifyContent='center' pt={2} pb={3} style={{ borderRadius: '0 0 50% 50%' }}>
                <Heading variant='heading2'>{tab}</Heading>
            </Flex>
            <Flex height='100%' width='100%'>
                <Switch>
                    <Route path={`${path}/rules`}>
                        {/* Rules explanation */}
                        <Flex>
                            <Text>Rules</Text>
                        </Flex>
                    </Route>
                    <Route path={`${path}/recipes`}>
                        {/* Recipe list */}
                        <Flex>
                            <Text>Recipes</Text>
                        </Flex>
                    </Route>
                    <Route path={`${path}/settings`}>
                        {/* Settings */}
                        <Flex>
                            <Text>Settings</Text>
                        </Flex>
                    </Route>
                    <Route path={path}>
                        <IngredientsPage />
                    </Route>
                </Switch>
            </Flex>
            <Flex variant='appBarFrame' justifyContent='center'>
                <Flex maxWidth='600px' justifyContent='space-evenly' width='100%'>
                    <NavbarButton
                        onClick={() => {
                            history.push(url);
                            setCurrentTab('Ingredients');
                        }}
                        title='Ingredients'
                        icon={findIngredientIcon()}
                        active={tab === 'Ingredients'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/recipes`);
                            setCurrentTab('Recipes');
                        }}
                        title='Recipes'
                        icon={FaBookOpen}
                        active={tab === 'Recipes'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/rules`);
                            setCurrentTab('Rules');
                        }}
                        title='Rules'
                        icon={FaBookmark}
                        active={tab === 'Rules'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/settings`);
                            setCurrentTab('Settings');
                        }}
                        title='Settings'
                        icon={FaCogs}
                        active={tab === 'Settings'}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

const INGREDIENT_ICONS = [
    FaBacon,
    FaCarrot,
    FaEgg,
    FaBreadSlice,
    FaCheese,
    FaCookie,
    FaFish,
    FaLemon,
    FaPepperHot,
    FaWineBottle,
]

function findIngredientIcon(): any {
    return INGREDIENT_ICONS[Math.floor(Math.random() * INGREDIENT_ICONS.length)];
}
