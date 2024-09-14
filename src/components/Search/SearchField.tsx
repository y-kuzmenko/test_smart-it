import SearchInput from './SearchInput';

type SearchFieldProps = {
    label: string;
    value?: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ label, value, placeholder, onChange }) => (
    <th>
        {label}
        <SearchInput value={value} placeholder={placeholder} onChange={onChange} />
    </th>
);

export default SearchField;
