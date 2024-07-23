import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const mockSetTask = vi.fn(); // Use `vi.fn()` for mocking functions with Vitest

  beforeEach(() => {
    render(<TaskForm setTask={mockSetTask} />);
  });

  // Test case 1: Check if the input field is rendered
  test('should render the input field', () => {
    const inputElement = screen.getByPlaceholderText(/Enter your Task/i);
    expect(inputElement).toBeInTheDocument();
  });

  // Test case 2: Check if the select element is rendered
  test('should render the select element', () => {
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  // Test case 3: Adding a task (should pass)
  test('should add a task', () => {
    const inputElement = screen.getByPlaceholderText(/Enter your Task/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    const buttonElement = screen.getByText(/\+ Add Task/i);
    fireEvent.click(buttonElement);

    expect(mockSetTask).toHaveBeenCalled();
  });

  // Test case 4: Adding a task with a tag (should fail)
  test('should add a task with a tag', () => {
    const inputElement = screen.getByPlaceholderText(/Enter your Task/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    const tagElement = screen.getByText(/HTML/i);
    fireEvent.click(tagElement);

    const buttonElement = screen.getByText(/\+ Add Task/i);
    fireEvent.click(buttonElement);

    console.log(mockSetTask.mock.calls);
    expect(mockSetTask).toHaveBeenCalledWith(expect.objectContaining({
      task: 'New Task',
      tags: ['HTML'],
    }));
  });

  // Test case 5: Adding a task with a specific status (should fail)
  test('should add a task with status "done"', () => {
    const inputElement = screen.getByPlaceholderText(/Enter your Task/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'done' } });

    const buttonElement = screen.getByText(/\+ Add Task/i);
    fireEvent.click(buttonElement);

    console.log(mockSetTask.mock.calls);
    expect(mockSetTask).toHaveBeenCalledWith(expect.objectContaining({
      task: 'New Task',
      status: 'done',
    }));
  });
});
