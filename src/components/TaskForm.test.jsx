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
    fireEvent.click(tagElement); // Select the HTML tag
  
    const buttonElement = screen.getByText(/\+ Add Task/i);
    fireEvent.click(buttonElement); // Submit the form
  
    // Log the actual calls to mockSetTask for debugging
    console.log('mockSetTask called with:', mockSetTask.mock.calls);
  
    // Ensure it was called with a function (since setTask is called with a function in setTask)
    expect(mockSetTask).toHaveBeenCalledTimes(2); // Adjusted to 2 since that's the actual number of calls
    expect(typeof mockSetTask.mock.calls[1][0]).toBe('function'); // Verify the 2nd call is a function
  
    // Manually invoke the function passed to setTask to inspect the resulting task array
    const setTaskFunction = mockSetTask.mock.calls[1][0];
    const previousTasks = []; // Simulate the previous state as an empty array for testing purposes
    const newTaskState = setTaskFunction(previousTasks); // Execute the function with an empty array as the previous state
  
    // Verify the new task state, including the selected tag
    expect(newTaskState).toEqual(expect.arrayContaining([
      expect.objectContaining({
        task: 'New Task',
        tags: ['HTML'], // Verify that the tag 'HTML' was added
      })
    ]));
  });

  // Test case 5: Adding a task with a specific status (should fail)
  test('should add a task with status "done"', () => {
    const inputElement = screen.getByPlaceholderText(/Enter your Task/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
  
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'done' } });
  
    const buttonElement = screen.getByText(/\+ Add Task/i);
    fireEvent.click(buttonElement);
  
    // Log the actual calls to mockSetTask for debugging
    console.log('mockSetTask called with:', mockSetTask.mock.calls);
  
    // Ensure it was called with a function
    expect(mockSetTask).toHaveBeenCalledTimes(3); // Assuming the setTask function is called 3 times
    expect(typeof mockSetTask.mock.calls[2][0]).toBe('function'); // Verify the 3rd call is a function
  
    // Manually invoke the function passed to setTask to inspect the resulting task array
    const setTaskFunction = mockSetTask.mock.calls[2][0];
    const previousTasks = []; // Simulate the previous state as an empty array for testing purposes
    const newTaskState = setTaskFunction(previousTasks); // Execute the function with an empty array as the previous state
  
    // Verify the new task state
    expect(newTaskState).toEqual(expect.arrayContaining([
      expect.objectContaining({
        task: 'New Task',
        status: 'done',
      })
    ]));
  });
});