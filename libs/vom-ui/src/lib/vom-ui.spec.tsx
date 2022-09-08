import { render } from '@testing-library/react';

import VomUi from './vom-ui';

describe('VomUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VomUi />);
    expect(baseElement).toBeTruthy();
  });
});
