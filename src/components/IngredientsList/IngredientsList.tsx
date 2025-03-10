import styles from './IngridientsList.module.scss';

export const IngredientsList: React.FC<{ ingredients: string[] }> = ({ ingredients }) => {
  return (
    <div className={styles.ingredients} >
      <h2 className={styles.ingredients__title}> Ingredients</h2>
      <ul className={styles.ingredients__list} >
        {
          ingredients.map((item, index) => (
            <li key={index} className={styles.ingredients__item} >
              <span className={styles.ingredients__bullet} >•</span> {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
