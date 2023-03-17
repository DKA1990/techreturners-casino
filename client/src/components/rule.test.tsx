import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rules } from "./rule"

test('renders "show rules" button and no text when component is initially rendered', () => {
    render(<Rules/>);
    const ruleButton = screen.getByRole('button', {
        name: /Show Rules/i
    });
    expect(ruleButton).toBeInTheDocument();
    const rulesText = screen.queryByText('BlackJack Rules');
    expect(rulesText).not.toBeInTheDocument();
});

test('upon clicking "show rules" button, button text changes to "Hide Rules" and text is shown detailing how to play', () => {
    render(<Rules/>);
    const showButton = screen.getByRole('button', {
        name: /Show Rules/i
    });
    expect(showButton).toBeInTheDocument();
    userEvent.click(showButton);
    const hideButton = screen.getByRole('button', {
        name: /Hide Rules/i
    });
    expect(hideButton).toBeInTheDocument();
    const rulesText = screen.queryByText('BlackJack Rules');
    expect(rulesText).toBeInTheDocument();
});