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
	options: ISelectOption[];
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
		<Flex direction='column'>
			<ReactSelect
				name={inputName}
				value={value}
				placeholder={placeholder}
				options={options}
				onBlur={handleBlur}
				onChange={(val) => {
					console.log({ val, value });
					setFieldValue(inputName, val);
				}}
				className='select-con'
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
