import { useEffect, useCallback, useState, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import type { City } from 'api/getCities';
import { getCities } from 'api/getCities';
import './App.css';
import SortableTable from 'components/SortableTable';
import Loader from 'components/Loader'
import styled, { ThemeProvider, css } from "styled-components";
import theme from "./theme";
import { ReactComponent as ChevronLeft } from './assets/ChevronLeft.svg';
import { ReactComponent as ChevronRight } from './assets/ChevronRight.svg';
import { ReactComponent as FirstPage } from './assets/FirstPage.svg';
import { ReactComponent as LastPage } from './assets/LastPage.svg';
import { ReactComponent as Search } from './assets/Search.svg';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl}; 

  h1{
    margin: ${({ theme }) => theme.spacing.none}; ;
  }

  form {
    color: ${({ theme }) => theme.colors.gray}; 
    display: flex;
    padding: ${({ theme }) => theme.spacing.xxs}; 
    border-bottom: ${({ theme }) => theme.borderSize.sm}  solid currentColor;
    background-color: ${({ theme }) => theme.colors.background}; 
    align-items: center;
    svg{
      fill: ${({ theme }) => theme.colors.image}; 
    }
  }

  input[type="number"] {
    margin-left: ${({ theme }) => theme.spacing.sm}; 
    border-top: none;
    border-left: none;
    border-right: none;
    height:20px;
    width:60px;
    background: ${({ theme }) => theme.colors.superGray}; 
    margin: ${({ theme }) => theme.spacing.none}; ;
    padding: ${({ theme }) => theme.spacing.xs}; 
    font-size: ${({ theme }) => theme.fontSizes[1]};
    border-bottom: ${({ theme }) => theme.borderSize.sm} solid currentColor;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.text}; 
  }

  input[type="text"] {
    border: none;
    width:500px;
    background: transparent;
    margin: ${({ theme }) => theme.spacing.none};
    padding: ${({ theme }) => theme.spacing.xs}; 
    font-size: ${({ theme }) => theme.fontSizes[1]};
    border: ${({ theme }) => theme.borderSize.sm} solid transparent;
    border-radius: inherit;
    color: ${({ theme }) => theme.colors.text}; 
  }
  
  input[type="text"]::placeholder {
    color: ${({ theme }) => theme.colors.lightGray}; 
  }
  
  button{
    border: none;
    background-color: unset;
    svg{
      fill: ${({ theme }) => theme.colors.image}; 
    }
  }

  button:disabled{
    svg {
        fill: ${({ theme }) => theme.colors.disabled}; 
    }
  }

  .content{
    ${({ theme }) => theme.mediaQueries.tablet}{
      width:100%;
    }
  }

  .perPageSize{
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xs}; 
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.tablet}{
    padding:${({ theme }) => theme.spacing.xl}; 
    input[type="text"] {
      width:unset;
    }
  }
`;

const StyledPagination = styled.div`
  background-color: ${({ theme }) => theme.colors.background}; 
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm}; 
  height:40px;
  border-bottom: ${({ theme }) => theme.borderSize.xs} solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  .arrowButtons{
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg}; 
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  let paginationBtn = [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  for (let i = 1; i <= Math.ceil(cities.length / (postsPerPage ? postsPerPage : cities.length)); i++) {
    paginationBtn.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const cityRows = useMemo(() =>
    cities.map(s => <pre key={s.id}>{JSON.stringify(s)}</pre>),
    [cities]);

  const runSearch = useCallback(async (term: string) => {
    try {
      // Set loading before sending API request
      const searchResult = await getCities({ searchTerm: term });
      setCities(searchResult);
      setCurrentPage(1);
      setLoading(false); // Stop loading
    } catch (err: any) {
      setLoading(false); // Stop loading in case of error
      setError(err);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      runSearch(searchTerm);
    }, 150)
    return () => clearTimeout(delayDebounceFn)
  }, [runSearch, searchTerm]);

  const paginationFn = (event: ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    setPostsPerPage(parseInt(event.currentTarget.value));
    setCurrentPage(1);
  };

  const onSearchTermChange = async (event: ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    event.preventDefault();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onSearchTermChange(e)
    }
  }

  const handlePaginationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      paginationFn(e)
    }
  }

  return (
    <ThemeProvider theme={theme} >
      <StyledApp >
        <header className="App-header"></header>
        <h1>City List</h1>
        <form>
          <Search />
          <input id="search" name="search" type="text" onChange={onSearchTermChange} placeholder="Search for a city" onKeyDown={handleSearchKeyDown} />
        </form>
        <div className={"content"}>
          {loading ? <Loader /> : error ? <pre>{`Eek! ${error.message}`}</pre> : cities.length === 0 ? <pre>{`Search does not match any city`}</pre> :
            <>
              <SortableTable cities={cities.slice(indexOfFirstPost, indexOfLastPost)} />
              <StyledPagination>
                <div className={"perPageSize"}>
                  <span><b>{`Per Page:`}</b></span>
                  <input
                    id="pagination"
                    name="pagination"
                    type="number"
                    min="1"
                    value={postsPerPage}
                    onChange={paginationFn}
                    onKeyDown={handlePaginationKeyDown}
                  />
                </div>
                <div className="arrowButtons">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => paginate(1)}
                  >
                    <FirstPage />
                  </button>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    disabled={currentPage === Math.ceil(cities.length / postsPerPage)}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight />
                  </button>
                  <button
                    disabled={currentPage === Math.ceil(cities.length / postsPerPage)}
                    onClick={() => paginate(paginationBtn.length)}
                  >
                    <LastPage />
                  </button>
                </div>
              </StyledPagination>
            </>
          }

        </div>
      </StyledApp>
    </ThemeProvider>
  );
};



export default App;