import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import fetchImages from './fetchImages';
import { AppBox } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (page === 0 && text.length <= 0) {
      return;
    }
    setLoading(true);
    setShowBtn(false);
    fetchImages(text, page)
      .then(({ data }) => {
        setImages(prev => [...prev, ...data.hits]);
        setShowBtn(page < Math.ceil(data.total / 12));
        if (page < Math.ceil(data.total / 12)) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page, text]);

  const onSubmit = text => {
    setPage(1);
    setText(text);
    setImages([]);

    window.scroll({ top: 0 });
  };

  const onButtonHandleClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppBox>
      <SearchBar onSubmit={onSubmit} />;
      <ImageGallery images={images} />
      {loading && <Loader />}
      {showBtn && <Button onButtonHandleClick={onButtonHandleClick} />}
    </AppBox>
  );
};
