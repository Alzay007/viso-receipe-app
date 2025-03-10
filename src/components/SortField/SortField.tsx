import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './SortField.module.scss';

interface Props {
  filterBy: string;
  handleStatus: (value: string) => void;
  categories: string[];
}

export const SortField: React.FC<Props> = ({ filterBy, handleStatus, categories }) => {
  return (
    <div className={styles.field}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="category-select-label">Filter By</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={filterBy}
          label="Filter By"
          onChange={(event) => handleStatus(event.target.value)}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
