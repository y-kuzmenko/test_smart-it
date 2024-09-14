type SearchInputProps = {
    value?: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, onChange }) => (
    <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
);

export default SearchInput;
