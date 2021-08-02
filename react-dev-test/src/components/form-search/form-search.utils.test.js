import { 
  getMoviesList,
  filterSearchPattern,
  setAutocompleteOptions
} from './form-search.utils';
import axios from 'axios';

jest
  .mock('axios', () => ({
    get: jest.fn()
  }))

describe('form search utils test', () => {
  beforeEach(jest.clearAllMocks);

  describe('getMoviesList', () => {
    it('should return list of movies if exist', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            Search: [{
              Title: "title123"
            }]
          }
        })
      );

      const result = await getMoviesList('batman', 1);

      expect(result).toEqual({ list: [ { Title: 'title123' } ], error: '' });
    });

    it('should return error of if fetch error', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            Search: [],
            Error: 'Error'
          }
        })
      );

      const result = await getMoviesList('batman', 1);

      expect(result).toEqual({ list: [], error: 'Error' });
    });

    it('should throw error of if catch error', async () => {
      axios.get.mockImplementationOnce(() => Promise.reject('something went wrong'));

      try {
        await getMoviesList('batman', 1);
      } catch (error) {
        expect(error).toEqual('something went wrong');
      }
    });
  });

  describe('filterSearchPattern', () => {
    it('should return value start with keyword batman', () => {
      const mockOptions = [{
        Title: 'batman 1'
      }, {
        Title: 'batman 2'
      }, {
        Title: 'transformer 1'
      }];
      const mockKeyword = 'batman';

      const result = filterSearchPattern(mockOptions, mockKeyword);

      expect(result).toEqual([{
        Title: 'batman 1'
      }, {
        Title: 'batman 2'
      }]);
    });
  });

  describe('setAutocompleteOptions', () => {
    it('should return new list from getMoviesList function and filtered by keyword', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            Search: [{
              Title: "batman 123"
            }, {
              Title: "pokemon"
            }]
          }
        })
      );

      const mockKeyword = 'batman';
      const mockCurrentOptions = [];
      const mockCallback = (val) => val;

      const result = await setAutocompleteOptions(mockKeyword, mockCurrentOptions, mockCallback);

      expect(result).toEqual([{
        Title: 'batman 123'
      }]);
    });

    it('should filter options by keyword if fetch movies not exist', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            Search: []
          }
        })
      );

      const mockKeyword = 'batman';
      const mockCurrentOptions = [{
        Title: "batman 123"
      }, {
        Title: "pokemon"
      }];
      const mockCallback = (val) => val;

      const result = await setAutocompleteOptions(mockKeyword, mockCurrentOptions, mockCallback);

      expect(result).toEqual([{
        Title: 'batman 123'
      }]);
    });

    it('should throw error if fetch movies failed', async () => {
      axios.get.mockImplementationOnce(() => Promise.reject('something went wrong'));

      const mockKeyword = 'batman';
      const mockCurrentOptions = [];
      const mockCallback = (val, error) => ({ val, error });

      const result = await setAutocompleteOptions(mockKeyword, mockCurrentOptions, mockCallback);

      expect(result).toEqual({ val: [], error: 'something went wrong' });
    });

  });

});
