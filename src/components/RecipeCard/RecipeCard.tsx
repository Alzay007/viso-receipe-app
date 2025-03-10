import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
} from '@mui/material';
import { Recipe } from '../../types/Recipe';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { addItem, removeItem } from '../../features/reducers/savedSlice';

import styles from './RecipeCard.module.scss';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strMealThumb,
  } = recipe;

  const dispatch = useAppDispatch();
  const { saved } = useAppSelector((state) => state.savedReducer);

  const isCardInArray = saved.includes(idMeal);

  const handleSetCardInData = () => {
    const itemId = idMeal;
    dispatch(isCardInArray ? removeItem(itemId) : addItem(itemId));
  };

  return (
    <Card className={styles.card}>
      <Link to={`/recipe/${idMeal}`}>
        <CardHeader
          title={strMeal}
          subheader={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span>Category: {strCategory}</span>
              <span>Area: {strArea}</span>
            </div>
          }
        />
        {strMealThumb && (
          <CardMedia
            component="img"
            alt={strMeal}
            height="200"
            image={strMealThumb}
            title={strMeal}
          />
        )}
      </Link>
      <CardActions className={styles.card__container}>
        <Button
          className={classNames(styles.card__checkout, {
            [styles.card__uncheckout]: isCardInArray
          })}
          onClick={handleSetCardInData}
        >
          {isCardInArray ? 'Remove' : 'Add to favorites'}
        </Button>
      </CardActions>
    </Card>
  );
};
