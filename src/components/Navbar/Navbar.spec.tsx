import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom'

import Navbar from './Navbar';
import { describe, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render((
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    ));

    screen.debug();

    // check if App components renders headline
  });
});