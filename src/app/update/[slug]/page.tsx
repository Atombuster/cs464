'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box, Typography, TextField, Button, IconButton, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { Dataset } from '@/types/data';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error && typeof error === 'object') {
    if ('errors' in error) {
      return extractErrorMessage((error as Record<string, unknown>).errors);
    }

    const entries = Object.entries(error as Record<string, unknown>);
    if (entries.length > 0) {
      return entries.map(([k, v]) => `${k}: ${extractErrorMessage(v)}`).join(', ');
    }
  }

  if (Array.isArray(error)) {
    return error.map(extractErrorMessage).join(', ');
  }

  return 'An error occurred';
}

export default function UpdateDatasetPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const slug = params.slug;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<string[]>(['', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDataset, setLoadingDataset] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/data?name=${slug}`)
      .then((r: Response) => {
        if (!r.ok) {
          throw new Error('Dataset not found');
        }

        return r.json();
      })
      .then((data: Dataset) => {
        setTitle(data.title);
        setDescription(data.description || '');
        setItems(data.items.map(item => item.name));
        setError(null);
      })
      .catch(() => {
        setError('Dataset not found');
      })
      .finally(() => {
        setLoadingDataset(false);
      });
  }, [slug]);

  const handleAddItem = () => setItems(prev => [...prev, '']);

  const handleItemChange = (index: number, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleDeleteItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setError(null);

    const newSlug = slugify(title);
    const filledItems = items.filter(name => name.trim());

    if (!title.trim()) { setError('Dataset name is required'); return; }
    if (newSlug.length < 3) { setError('Dataset name must be at least 3 characters'); return; }
    if (filledItems.length < 2) { setError('At least 2 items are required'); return; }

    setLoading(true);

    try {
      const res = await fetch(`/api/data?slug=${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newSlug,
          title: title.trim(),
          description: description.trim() || undefined,
          items: filledItems.map((name, index) => ({
            name: name.trim(),
            order: index + 1,
          })),
        }),
      });

      if (res.ok) {
        router.push(`/puzzle/${newSlug}`);
      } else {
        const data = await res.json();
        setError(extractErrorMessage(data.error));
      }
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDataset = async () => {
    const confirmed = window.confirm('Delete this dataset? This cannot be undone.');

    if (!confirmed) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/data?slug=${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(extractErrorMessage(data.error || data.message));
      }
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  if (loadingDataset) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2, position: 'relative', pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <IconButton
          onClick={() => router.push('/')}
          aria-label="close"
        >
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
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ width: 24, textAlign: 'right', flexShrink: 0, color: 'text.secondary' }}>
              {index + 1}
            </Typography>

            <TextField
              fullWidth
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={index === 0 ? '1st Item' : index === 1 ? '2nd Item' : index === 2 ? '3rd Item' : `${index + 1}th Item`}
              size="small"
            />

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
          onClick={() => router.push('/')}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.5,
            borderColor: '#e89b00',
            color: '#e89b00',
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': { borderColor: '#c47e00', color: '#c47e00', borderWidth: 2, bgcolor: 'transparent' },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.5,
            borderColor: '#3700cc',
            color: '#3700cc',
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': { borderColor: '#2500aa', color: '#2500aa', borderWidth: 2, bgcolor: 'transparent' },
          }}
        >
          {loading ? 'Saving...' : 'SAVE'}
        </Button>
      </Box>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleDeleteDataset}
        disabled={loading}
      >
        Delete Dataset
      </Button>
    </Box>
  );
}