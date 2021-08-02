import { useEffect, useState, useCallback } from 'react';
import get from 'lodash/get';

export const useKeyDownOptions = (searchOptions, setSearchQuery) => {
  const [ selected, setSelected ] = useState({
    index: -1,
    isUpdate: false
  });
  
  const _setSearchQuery = useCallback(() => {
    const title = get(searchOptions[selected.index], 'Title', '');
    if (title) {
      setSearchQuery(title);
    }
  }, [searchOptions, selected.index, setSearchQuery]);

  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.keyCode) {
        case 38:
          setSelected(({ index }) => ({
            index: index === -1 ? -1 : (index - 1),
            isUpdate: true
          }));
          break;
        case 40:
          const lastIndex = searchOptions.length - 1;
          
          setSelected(({ index }) => ({
            index: index === lastIndex ? lastIndex : (index + 1),
            isUpdate: true
          }));
          break;
        default:
          break;
      }
    };

    if (selected.isUpdate) {
      _setSearchQuery();
      setSelected({
        ...selected,
        isUpdate: false
      });
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
        document.removeEventListener('keydown', onKeyDown);
    }
  }, [searchOptions, selected, _setSearchQuery]);

  const resetKeyDownOptions = () => {
    setSelected({
      index: -1,
      isUpdate: false
    });
  };

  return [ selected, resetKeyDownOptions ];
};

