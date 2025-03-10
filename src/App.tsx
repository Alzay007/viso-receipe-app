import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { Footer } from './components/Footer';
import { Header, ROUTER } from './components/Header';
import {
  HomePage,
  NotFoundPage,
  RecipePage,
  SavedPage
} from './pages';

import { useAppDispatch, useAppSelector } from './features/hooks/hooks';
import { fetchRecipes } from './features/reducers/thunk';
import { addItems } from './features/reducers/savedSlice';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { saved } = useAppSelector((state) => state.savedReducer);

  useEffect(() => {
    dispatch(fetchRecipes());

    const idArray = window.localStorage.getItem('id');

    if (idArray) {
      dispatch(addItems(JSON.parse(idArray)));
    }

  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem('id', JSON.stringify(saved));
  }, [saved]);

  return (
    <>
      <Header />

      <div className="section">
        <Routes>
          <Route path={ROUTER.home} element={<HomePage />} />
          <Route path="/recipe/:idMeal" element={<RecipePage />} />
          <Route path={ROUTER.saved} element={<SavedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
