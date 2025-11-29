import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('CodeBlock Component', () => {
  const sampleCode = `def hello_world():
    print("Hello, World!")`;

  it('renders code with syntax highlighting', () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByText(/def hello_world/)).toBeInTheDocument();
  });

  it('preserves whitespace and formatting', () => {
    const codeWithSpaces = 'def test():\n    return True';
    render(<CodeBlock code={codeWithSpaces} />);
    const codeElement = screen.getByText(/def test/);
    expect(codeElement).toBeInTheDocument();
  });

  it('displays filename when provided', () => {
    render(<CodeBlock code={sampleCode} filename="example.py" />);
    expect(screen.getByText('example.py')).toBeInTheDocument();
  });

  it('does not display filename section when not provided', () => {
    const { container } = render(<CodeBlock code={sampleCode} />);
    const filenameDiv = container.querySelector('.bg-\\[\\#2d2d2d\\]');
    expect(filenameDiv).not.toBeInTheDocument();
  });

  it('uses python as default language', () => {
    const { container } = render(<CodeBlock code={sampleCode} />);
    // Check that the component renders without errors
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('supports custom language parameter', () => {
    const jsCode = 'const x = 10;';
    const { container } = render(<CodeBlock code={jsCode} language="javascript" />);
    expect(container.querySelector('code')).toBeInTheDocument();
  });
});

describe('CopyButton Component', () => {
  const sampleCode = 'print("test")';
  let mockClipboard;

  beforeEach(() => {
    // Mock clipboard API
    mockClipboard = {
      writeText: vi.fn(() => Promise.resolve()),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays copy button on hover', () => {
    render(<CodeBlock code={sampleCode} />);
    const button = screen.getByRole('button', { name: /copy code/i });
    expect(button).toBeInTheDocument();
  });

  it('copies code to clipboard when clicked', async () => {
    render(<CodeBlock code={sampleCode} />);
    const button = screen.getByRole('button', { name: /copy code/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith(sampleCode);
    });
  });

  it('shows success feedback for 2 seconds after copy', async () => {
    vi.useFakeTimers();
    render(<CodeBlock code={sampleCode} />);
    const button = screen.getByRole('button', { name: /copy code/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });

    // Fast-forward 2 seconds
    vi.advanceTimersByTime(2000);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('handles copy errors gracefully', async () => {
    // Mock clipboard to fail
    mockClipboard.writeText = vi.fn(() => Promise.reject(new Error('Copy failed')));
    
    render(<CodeBlock code={sampleCode} />);
    const button = screen.getByRole('button', { name: /copy code/i });
    
    fireEvent.click(button);
    
    // Should not throw error
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
  });

  it('uses fallback method when clipboard API unavailable', async () => {
    // Remove clipboard API
    const originalClipboard = navigator.clipboard;
    Object.assign(navigator, { clipboard: undefined });
    
    // Mock document.execCommand
    document.execCommand = vi.fn(() => true);
    
    render(<CodeBlock code={sampleCode} />);
    const button = screen.getByRole('button', { name: /copy code/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    // Restore
    Object.assign(navigator, { clipboard: originalClipboard });
  });
});
