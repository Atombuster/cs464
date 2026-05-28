'use client';

import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export type DatasetFormValues = {
  title: string;
  description: string;
  items: string[];
};

type DatasetFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  initialItems?: string[];
  loading?: boolean;
  error?: string | null;
  saveLabel?: string;
  showDelete?: boolean;
  onSave: (values: DatasetFormValues) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

const defaultItems = ['', ''];

export default function DatasetForm({
  initialTitle = '',
  initialDescription = '',
  initialItems = defaultItems,
  loading = false,
  error = null,
  saveLabel = 'SAVE',
  showDelete = false,
  onSave,
  onCancel,
  onDelete,
}: DatasetFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [items, setItems] = useState<string[]>(initialItems);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setItems(initialItems.length > 0 ? initialItems : ['', '']);
  }, [initialTitle, initialDescription, initialItems]);

  const handleAddItem = () => setItems(prev => [...prev, '']);

  const handleItemChange = (index: number, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleDeleteItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= items.length) {
      return;
    }

    setItems(prev => {
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  };

  const placeholderFor = (index: number) => {
    if (index === 0) return '1st Item';
    if (index === 1) return '2nd Item';
    if (index === 2) return '3rd Item';
    return `${index + 1}th Item`;
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2, position: 'relative', pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <IconButton onClick={onCancel} aria-label="close">
          <CloseIcon sx={{ fontSize: 36, fontWeight: 'bold' }} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Dataset name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          slotProps={{ input: { 'aria-label': 'dataset name' } }}
        />
      </Box>

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ width: 24, textAlign: 'right', flexShrink: 0, color: 'text.secondary' }}>
              {index + 1}
            </Typography>

            <TextField
              fullWidth
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={placeholderFor(index)}
              size="small"
            />

            <IconButton
              onClick={() => moveItem(index, -1)}
              aria-label="move item up"
              disabled={index === 0}
            >
              <ArrowUpwardIcon />
            </IconButton>

            <IconButton
              onClick={() => moveItem(index, 1)}
              aria-label="move item down"
              disabled={index === items.length - 1}
            >
              <ArrowDownwardIcon />
            </IconButton>

            <IconButton
              onClick={() => handleDeleteItem(index)}
              aria-label="delete item"
              disabled={items.length <= 2}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={handleAddItem} aria-label="add item">
          <AddIcon sx={{ fontSize: 52 }} />
        </IconButton>
        <Typography variant="body2" align="center">Add new item</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          sx={{ flex: 1, py: 1.5 }}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          onClick={() => onSave({ title, description, items })}
          disabled={loading}
          sx={{ flex: 1, py: 1.5 }}
        >
          {loading ? 'Saving...' : saveLabel}
        </Button>
      </Box>

      {showDelete && onDelete && (
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={onDelete}
          disabled={loading}
        >
          Delete Dataset
        </Button>
      )}
    </Box>
  );
}