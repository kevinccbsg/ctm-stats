import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { getPlayersList } from '../../api';
import { SearchOutlined } from '@ant-design/icons';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: (values: SelectProps['options']) => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const getPlayers = () => {
    getPlayersList(value)
      .then(results => {
        if (currentValue === value) {
          const data = results.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          callback(data);
        }
      }).catch(error => console.log(error))
  };
  if (value) {
    timeout = setTimeout(getPlayers, 300);
  } else {
    callback([]);
  }
};

interface Props {
  placeholder: string;
  style: React.CSSProperties;
  value: string | null;
  setValue: (val: string) => void;
}

const SearchUser: React.FC<Props> = ({ placeholder, style, value, setValue }) => {
  const [data, setData] = useState<SelectProps['options']>([]);

  console.log(value);
  console.log(data);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      suffixIcon={<SearchOutlined />}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.label,
      }))}
    />
  );
};

export default SearchUser;