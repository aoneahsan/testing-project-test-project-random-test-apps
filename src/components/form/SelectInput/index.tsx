import {
	ISearchArticlesFiltersFormData,
	ISelectOption,
} from '@/types/formData';
import { Flex, Text } from '@radix-ui/themes';
import { useFormikContext } from 'formik';
import ReactSelect from 'react-select';

interface ISelectInputProps {
	value?: string;
	inputName: string;
	placeholder: string;
	errorMessage?: string;
	isTouched?: boolean;
	options: ISelectOption[] | null;
}

const SelectInput: React.FC<ISelectInputProps> = ({
	value,
	inputName,
	placeholder,
	errorMessage,
	isTouched,
	options,
}) => {
	const { setFieldValue, handleBlur } =
		useFormikContext<ISearchArticlesFiltersFormData>();

	return (
		<Flex direction='column' mb='3'>
			<ReactSelect
				name={inputName}
				value={value ? { label: value, value } : null}
				placeholder={placeholder}
				options={options ?? []}
				onBlur={handleBlur}
				onChange={(val) => {
					const _val = val as unknown as ISelectOption;
					setFieldValue(inputName, _val.value, true);
				}}
				className='select-con'
				isClearable
			/>
			{isTouched && errorMessage ? (
				<Text
					color='red'
					size='1'
					ml='1'
					mt='1'
				>
					{errorMessage}
				</Text>
			) : null}
		</Flex>
	);
};

export default SelectInput;
