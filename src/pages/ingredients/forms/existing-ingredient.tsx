import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MButton, Select } from 'src/atoms';
import { Ingredient } from 'src/services/database/types';
import { useIngredients } from 'src/services/database/ingredients';

export const ExistingIngredientForm: React.FC<{ onSubmit: (_ingredient: Ingredient) => void }> = ({ onSubmit }) => {
    const methods = useForm<{ ingredients: string }>();
    const { items: allIngredients } = useIngredients();
    const { handleSubmit, reset } = methods;
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(v => {
                const ingredient = allIngredients.find(i => i.id === v.ingredients);
                if (ingredient) {
                    onSubmit(ingredient);
                }
                reset();
            })}>
                <Select
                    mb={1}
                    label='Ingredients'
                    name='ingredients'
                    required
                    defaultValue='Select an ingredient'
                >
                    {allIngredients.map(({ id, name, type, infinite }) => (
                        <option key={id} value={id}>
                            {name} - {
                                type === 'base' ? 'Base' : 'Spice/Herb'
                            }{
                                type === 'tastemaker' ?
                                    ` - ${infinite ? 'Generic' : 'Special'}` :
                                    ''
                            }
                        </option>
                    ))}
                </Select>
                <MButton mt={2} width='100%' variant='primary' type='submit'>
                    Add to list
                </MButton>
            </form>
        </FormProvider>
    )
}