import React from 'react';
import { Flex, Heading, Text } from 'rebass';

export const RulesPage: React.FC<{}> = () => (
    <Flex flexDirection='column' width='100%' variant='pageContent' p={3} overflowY='scroll'>
        <Text>
            As a student of the culinary arts, you are able to produce food of high quality standards.
            You use a recipe book to keep track of the recipes you're learning and have learned.
        </Text>
        <Heading variant='heading2' mt={3}>
            Recipe book
        </Heading>
        <Text>
            As a start, your recipe book contains 6 recipes from your past. You have mastered these recipes fully (more on this later).
            On your adventures, you might meet a fellow chef who wishes to share their favourite recipe with you, allowing 
            you to copy it into your book. Perhaps you'll find a long lost family recipe somewhere, after which you 
            can try to bring it's magic back to life. Regardless, you can copy any recipes you find into your recipe book. 
            Doing this takes an hour and can be done during a short rest.
            <br />
            <br />
            <b><i>Replacing the book.</i></b> When your recipe book is destroyed, you can replicate the recipes you've fully mastered 
            into any new empty book. This book then becomes your recipe book.
        </Text>
        <Heading variant='heading2' mt={3}>
            Mastering recipes
        </Heading>
        <Text>
            When you note down a new recipe in your book, you won't have mastered it yet. When making an unmastered recipe, you will
            have to make a series of skill checks as per the DM's discretion. Each recipe has it's own DC which you have to pass in 
            order to succeed. If you pass all the skill checks, the recipe will gain a progress point. Once you've passed a certain 
            amount of progress points on a recipe (amount varies per recipe), you'll have mastered the recipe. When preparing a recipe 
            you've mastered, you won't have to make any checks in order to prepare it successfully.
        </Text>
        <Heading variant='heading2' mt={3}>
            Ingredients
        </Heading>
        <Text>
            Each recipe has certain base ingredients and tastemakers associated with it. In order to make these recipes, you will need to 
            have these ingredients on hand. How you get your hands on these ingredients is up to you and the DM; you could buy them at a 
            local store or go hunt or forage for the right materials. You keep these ingredients in your component pouch. The amount of 
            ingredients a recipe needs is based on a portion for a single person. When making food for multiple people, you subtract ingredients 
            accordingly.
            <br />
            <br />
            <b><i>Ingredient types.</i></b> There are 3 types of ingredients; Base, Tastemaker (generic) and Tastemaker (special). Base ingredients are things that are the foundation 
            of the recipe. Tastemakers are spices and herbs that add a special flavour to the food. Generic tastemakers have no amount, and you always have 
            them on hand (sugar, salt, pepper, etc. Your DM tells you which tastemakers are generic). Special tastemakers are spices and herbs that do 
            have an amount. If unsure, ask your DM if a tastemaker is special or generic.
            <br />
            <br />
            <b><i>Expiration date.</i></b> Base ingredients have an expiration date, which is 5 days by default. The exception to this is meat, which 
            only lasts 2 days. If the ingredients are put in a <i>Bag of Colding</i>, they last twice as long.
        </Text>
    </Flex>
)