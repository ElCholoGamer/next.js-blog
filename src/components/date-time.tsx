import { format } from 'date-fns';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'time'> {
	timestamp: number;
}

const DateTime: React.FC<Props> = ({ timestamp, ...props }) => {
	const d = new Date(timestamp);

	return (
		<time {...props} dateTime={d.toISOString()}>
			{format(d, "LLLL do, yyyy 'at' kk:mm")}
		</time>
	);
};

export default DateTime;
