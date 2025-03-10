import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../features/hooks/hooks';
import { RecipesList } from '../../components/RecipesList';
import { Recipe } from '../../types/Recipe';
import { Title } from '../../components/Title';

import styles from './SavedPage.module.scss';
import { IngredientsList } from '../../components/IngredientsList';
import { Instructions } from '../../components/Instructions';

export const SavedPage = () => {
  const { saved } = useAppSelector((state) => state.savedReducer);
  const { recipes } = useAppSelector((state) => state.recipesReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return recipes.filter((recipe: Recipe) => saved.includes(recipe.idMeal + ''));
  }, [saved, recipes]);

  const ingredientsList = useMemo(() => {
    const allIngredients: string[] = [];

    visibleList.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Recipe;
        const measureKey = `strMeasure${i}` as keyof Recipe;

        const ingredient = recipe[ingredientKey];
        const measure = recipe[measureKey];

        if (ingredient && typeof ingredient === "string" && ingredient.trim()) {
          allIngredients.push(`${measure || ''} ${ingredient}`.trim());
        }
      }
    });

    return Array.from(new Set(allIngredients));
  }, [visibleList]);

  return (
    <div className={styles.saved}>
      <Title title={'Saved'} />

      {saved.length < 1 ? (
        <div className={styles.saved__empty}>
          <span>saved is empty</span>
        </div>
      ) : (
        <div className={styles.saved__content}>
          <RecipesList recipes={visibleList} />

          <IngredientsList ingredients={ingredientsList} />

          {visibleList.map((recipe) => (
            <Instructions key={recipe.idMeal} instructions={recipe.strInstructions} />
          ))}
        </div>
      )}
    </div>
  );
};

