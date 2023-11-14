import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { getPlayersList } from '../../api';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

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
  persistenceOptions?: {
    id: string;
    label: string;
  },
}

const SearchUser: React.FC<Props> = ({ placeholder, style, value, setValue, persistenceOptions }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [data, setData] = useState<SelectProps['options']>([]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (persistenceOptions) {
      const item = (data || []).find(element => element.value === newValue);
      searchParams.set(persistenceOptions.id, newValue.toString());
      searchParams.set(persistenceOptions.label, item?.label?.toString() || '');
      setSearchParams(searchParams);
    }
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