import { render, screen } from '@testing-library/react';

import { describe, it } from 'vitest';
import Loader from './Loader';

describe('App', () => {
  it('renders headline', () => {
    render((
      <Loader />
    ));

    screen.debug();

    // check if App components renders headline
  });
});