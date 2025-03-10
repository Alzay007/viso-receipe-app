import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Stack
      spacing={2}
      className="pagination-container"
      sx={{
        marginTop: '80px',
      }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          '.MuiPaginationItem-root': {
            backgroundColor: 'white',
            color: 'black',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
            '&:hover': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          },
        }}
      />
    </Stack>
  );
};
