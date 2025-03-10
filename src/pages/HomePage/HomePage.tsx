import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { RecipesList } from '../../components/RecipesList';
import { Loader } from '../../components/Loader';

import styles from './HomePage.module.scss';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { SearchBar } from '../../components/SearchField';
import { SortField } from '../../components/SortField';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchRecipeByName, fetchRecipes } from '../../features/reducers/thunk';
import { PaginationComponent } from '../../components/Pagination';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, recipes } = useAppSelector(
    (state) => state.recipesReducer
  );

  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories.map((cat: any) => cat.strCategory));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trimStart());
  }, []);

  const handleStatus = useCallback((category: string) => {
    setFilterBy(category);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchRecipeByName(debouncedQuery));
    } else {
      dispatch(fetchRecipes());
    }
  }, [debouncedQuery, dispatch]);

  const visibleList = useMemo(() => {
    if (!filterBy) return recipes;
    return recipes.filter((recipe: { strCategory: string }) => recipe.strCategory === filterBy);
  }, [recipes, filterBy]);

  const totalPages = visibleList ? Math.ceil(visibleList.length / itemsPerPage) : 1;

  const paginatedRecipes = useMemo(() => {
    if (!visibleList || visibleList.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return visibleList.slice(startIndex, startIndex + itemsPerPage);
  }, [visibleList, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Recipes List</h1>

      <SearchBar searchQuery={query} handleOnChange={onChangeHandler} />

      <SortField filterBy={filterBy} handleStatus={handleStatus} categories={categories} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <RecipesList recipes={paginatedRecipes || []} />

          {totalPages > 1 && (
            <div className={styles.home__container}>
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
