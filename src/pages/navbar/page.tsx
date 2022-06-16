import _ from 'lodash';
import React, { useState } from 'react';
import {
    FaBacon, FaBookmark, FaBookOpen, FaBreadSlice, FaCarrot, FaCheese, FaCogs, FaCookie, FaEgg, FaFish, FaLemon, FaPepperHot, FaWineBottle 
} from 'react-icons/fa';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Flex, Heading } from 'rebass';
import { IngredientsPage } from '../ingredients';
import { RecipesPage } from '../recipes';
import { RulesPage } from '../rules/page';
import { SettingsPage } from '../settings';
import { NavbarButton } from './button';

export const NavigationBar: React.FC<{}> = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { pathname } = useLocation();
    console.log(pathname.replaceAll(`${path}/`, ''));
    const [tab, setCurrentTab] = useState(pathname.replaceAll(`${path}/`, '') || 'ingredients');

    return (
        <Flex flexDirection='column' justifyContent='space-between' height='100%'>
            <Flex variant='headerFrame' justifyContent='center' pt={2} pb={3} style={{ borderRadius: '0 0 50% 50%' }}>
                <Heading variant='heading2'>{_.capitalize(tab)}</Heading>
            </Flex>
            <Flex height='100%' width='100%'>
                <Switch>
                    <Route path={`${path}/rules`}>
                        <RulesPage />
                    </Route>
                    <Route path={`${path}/recipes`}>
                        <RecipesPage />
                    </Route>
                    <Route path={`${path}/settings`}>
                        {/* Settings */}
                        <SettingsPage />
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
                            setCurrentTab('ingredients');
                        }}
                        title='Ingredients'
                        icon={findIngredientIcon()}
                        active={tab === 'ingredients'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/recipes`);
                            setCurrentTab('recipes');
                        }}
                        title='Recipes'
                        icon={FaBookOpen}
                        active={tab === 'recipes'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/rules`);
                            setCurrentTab('rules');
                        }}
                        title='Rules'
                        icon={FaBookmark}
                        active={tab === 'rules'}
                    />
                    <NavbarButton
                        onClick={() => {
                            history.push(`${url}/settings`);
                            setCurrentTab('settings');
                        }}
                        title='Settings'
                        icon={FaCogs}
                        active={tab === 'settings'}
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
