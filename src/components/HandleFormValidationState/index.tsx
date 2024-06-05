import { formValidationRStateAtom } from '@/state/formState';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout, Strong, Switch, Text } from '@radix-ui/themes';
import { useRecoilState } from 'recoil';

const HandleFormValidationState: React.FC = () => {
	const [formValidationRState, setFormValidationRState] = useRecoilState(
		formValidationRStateAtom
	);

	const onStateChange = (val: boolean) => {
		try {
			setFormValidationRState({
				frontendFormValidationIsEnabled: val,
			});
		} catch (error) {}
	};
	return (
		<Callout.Root mt='9'>
			<Callout.Icon>
				<InfoCircledIcon />
			</Callout.Icon>

			<Callout.Text color='green'>
				You can turn off frontend validation to check the backend validation
				logic!
			</Callout.Text>
			<Callout.Text
				color='blue'
				className='d-flex justify-between'
			>
				<Text mr='5'>
					Frontend Form Validation{' '}
					<Strong>
						{formValidationRState.frontendFormValidationIsEnabled
							? 'Enabled'
							: 'Disabled'}
					</Strong>
				</Text>
				<Switch
					checked={formValidationRState.frontendFormValidationIsEnabled}
					onCheckedChange={onStateChange}
				/>
			</Callout.Text>
			<Callout.Text color='jade'>
				<Strong>NOTE:</Strong> this is just for this project, just to showcase
				that i have handled the backend API error validation as well, in real
				world project this will be redundant
			</Callout.Text>
		</Callout.Root>
	);
};

export default HandleFormValidationState;
