// formatDate.js
import { format } from 'date-fns';

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
};

export default formatDate;
