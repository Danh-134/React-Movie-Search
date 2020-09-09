import React from 'react';
import { render } from '@testing-library/react';
import SearchMovie from "./searchMovie";

test('renders learn react link', () => {
  const { getByText } = render(<SearchMovie />);
});
