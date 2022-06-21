import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Flex, Heading, Text } from 'rebass';
import { Input, MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useRecipeBook } from 'src/services/database/recipebook';
import { useDebouncedState } from 'src/services/debounced-state';
import { RecipeCard } from './card';
import { CreateRecipeForm, RecipeForm } from './forms/create';

export const RecipesPage: React.FC<{}> = () => {
    // const [searchHeight, setSearchHeight] = useState(0);
    // const searchRef = useRef<any>(null);
    // useEffect(() => {
    //     setSearchHeight(searchRef?.current?.clientHeight || 0);
    // });
    const [modalOpen, setModalOpen] = useState(false);
    const methods = useForm<{ search: string }>({
        defaultValues: {
            search: ''
        }
    });
    const recipeBook = useRecipeBook();

    const [searchTerm, setSearchTerm] = useDebouncedState(methods.getValues().search, 200);

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                {/* TODO: Move this shit to Modal */}
                <Flex flexDirection='column' height='100%' width='100%' p={3} maxHeight='calc(100vh - 180px)' overflowY='scroll' overflowX='hidden'>
                    <Heading variant='heading2' mb={2}>Add recipe</Heading>
                    <CreateRecipeForm onCreate={(_recipe: RecipeForm) => setModalOpen(false)} />
                </Flex>
            </Modal>
            {/* ref={searchRef} */}
            <Flex justifyContent='center' mx={2} my={3} flex={1} alignItems='center'>
                <Flex flex={1} >
                    <FormProvider {...methods}>
                        <form style={{ width: '100%' }} onSubmit={() => { }}>
                            <Input
                                width='100%'
                                name='search'
                                onChange={e => setSearchTerm(e.target.value || '')}
                            />
                        </form>
                    </FormProvider>
                </Flex>
                {/* <Flex>
                    <MButton variant='icon' ml={2}>
                        <FaSlidersH size={30} />
                    </MButton>
                </Flex> */}
            </Flex>
            <Flex
                mx={2}
                py={0}
                flexDirection='column'
                variant='scrollList'
                height='100%'
                flexGrow={1}
                justifyContent='flex-start'
            >
                {recipeBook.recipes.filter(r => r.name.includes(searchTerm)).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </Flex>
            <Flex width='100%' alignSelf='flex-end' mt={2} mb={3}>
                <MButton mx={3} variant='primaryLarge' width='100%' onClick={() => setModalOpen(true)}>
                    <Text variant='body'>
                        Add Recipe
                    </Text>
                </MButton>
            </Flex>
        </Flex>
    );
}