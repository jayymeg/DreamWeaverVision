import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  tagClassName?: string;
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  className,
  tagClassName,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    
    if (!tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      onTagsChange(newTags);
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onTagsChange(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      addTag(inputValue);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 border border-input rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary bg-transparent",
        className
      )}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className={cn(
            "bg-accent/20 text-primary px-3 py-1 rounded-full text-sm flex items-center",
            tagClassName
          )}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-1 text-primary-dark hover:text-primary focus:outline-none"
            aria-label={`Remove ${tag}`}
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-grow min-w-[120px] bg-transparent outline-none text-sm px-2 py-1"
        {...props}
      />
    </div>
  );
}
