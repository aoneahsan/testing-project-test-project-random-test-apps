import DatePicker from 'react-datepicker';
import { useState } from 'react';
import dayjs from 'dayjs';

const Home: React.FC = () => {
	const [date, setDate] = useState<string>(
		dayjs(new Date()).format('YYYY-MM-DD')
	);

	console.log({ formattedDate: dayjs(date).format('YYYY-MM-DD') });

	return (
		<>
			<h1>home</h1>

			<br />

			<DatePicker
				selected={new Date(date)}
				onChange={(val) => {
					if (val) {
						setDate(dayjs(val).format('YYYY-MM-DD'));
					}
				}}
				dateFormat='YYYY-MM-dd'
			/>
			<br />

			<input
				type='date'
				value={date?.toString()}
				onChange={(e) => {
					setDate(dayjs(new Date(e?.target?.value)).format('YYYY-MM-DD'));
				}}
			/>
		</>
	);
};

export default Home;
