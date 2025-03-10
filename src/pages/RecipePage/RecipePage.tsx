import { useParams } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText, Link } from '@mui/material';
import { useAppSelector } from '../../features/hooks/hooks';
import { Recipe } from '../../types/Recipe';
import { useEffect } from 'react';

export const RecipePage = () => {
  const { idMeal } = useParams();
  const { recipes } = useAppSelector((state) => state.recipesReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipe = recipes ? recipes.find((recipe: Recipe) => recipe.idMeal === idMeal) : null;

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h3" align="center" gutterBottom>
        {recipe.strMeal}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ maxWidth: '100%', borderRadius: 8 }} />
      </Box>
      <Typography variant="h6" gutterBottom>
        <strong>Category:</strong> {recipe.strCategory}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>Area:</strong> {recipe.strArea}
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Instructions:
        </Typography>
        <Typography variant="body1" paragraph>
          {recipe.strInstructions}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ingredients:
        </Typography>
        <List>
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((num) => ({
              ingredient: recipe[`strIngredient${num}` as keyof Recipe],
              measure: recipe[`strMeasure${num}` as keyof Recipe],
            }))
            .filter((item) => item.ingredient && item.ingredient.trim())
            .map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.measure} ${item.ingredient}`} />
              </ListItem>
            ))}
        </List>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Video:
        </Typography>
        <Link href={recipe.strYoutube} target="_blank" color="primary">
          Watch on YouTube
        </Link>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Source:
        </Typography>
        <Link href={recipe.strSource} target="_blank" color="primary">
          View original recipe
        </Link>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" href={recipe.strSource} target="_blank">
          Go to the source
        </Button>
      </Box>
    </Box>
  );
};
