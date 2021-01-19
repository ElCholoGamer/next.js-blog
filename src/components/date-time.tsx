import { format } from 'date-fns';

interface Props {
	timestamp: number;
}

const DateTime: React.FC<Props> = ({ timestamp }) => {
	const d = new Date(timestamp);

	return (
		<time dateTime={d.toISOString()}>
			{format(d, "LLLL do, yyyy 'at' kk:mm")}
		</time>
	);
};

export default DateTime;
