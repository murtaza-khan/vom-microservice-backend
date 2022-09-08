import { render } from '@testing-library/react';

import VomHelpers from './vom-helpers';

describe('VomHelpers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VomHelpers />);
    expect(baseElement).toBeTruthy();
  });
});
