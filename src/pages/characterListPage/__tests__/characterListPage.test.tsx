import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterListPage from '..';
import { render, screen } from '@testing-library/react';
import { setupStore } from '../../../store/store';
import { Provider } from 'react-redux';

describe('CharacterListPage', () => {
  // check home route render
  it('Verify home screen rendered', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="/home" element={<CharacterListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/characters/i)).toBeInTheDocument();
  });
});
