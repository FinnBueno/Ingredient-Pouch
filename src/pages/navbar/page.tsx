import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    FaApple, FaBacon, FaBookmark, FaBookOpen, FaBreadSlice, FaCarrot, FaCheese, FaCogs, FaCookie, FaEgg, FaFish, FaLemon, FaPepperHot, FaWineBottle 
} from 'react-icons/fa';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { Flex, Text } from 'rebass';
import { NavbarButton } from './button';

export const NavigationBar: React.FC<{}> = ({ children }) => {
    const history = useHistory();
    const { path, url } = useRouteMatch();

    return (
        <Flex flexDirection='column' justifyContent='space-between' height='100%' variant='appBarFrame'>
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
                    {/* Ingredient list */}
                    <Flex>
                        <Text>Ingredients</Text>
                    </Flex>
                </Route>
            </Switch>
            <Flex justifyContent='center' height='80px' bg='secondary' pt='20px' pb={3} style={{ borderRadius: '30px 30px 0 0' }}>
                <Flex maxWidth='600px' justifyContent='space-evenly' width='100%'>
                    <NavbarButton
                        onClick={() => history.push(url)}
                        title='Ingredients'
                        icon={findIngredientIcon()}
                        active={false}
                    />
                    <NavbarButton
                        onClick={() => history.push(`${url}/recipes`)}
                        title='Recipes'
                        icon={FaBookOpen}
                        active={false}
                    />
                    <NavbarButton
                        onClick={() => history.push(`${url}/rules`)}
                        title='Rules'
                        icon={FaBookmark}
                        active={false}
                    />
                    <NavbarButton
                        onClick={() => history.push(`${url}/settings`)}
                        title='Settings'
                        icon={FaCogs}
                        active={false}
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
