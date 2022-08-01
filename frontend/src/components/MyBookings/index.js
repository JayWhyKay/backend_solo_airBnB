import { useParams } from 'react-router-dom';
import UserBookings from "./UserBookings";
import './BookingLanding.css';

function BookingLanding() {
    const { id } = useParams();

    return (
        <div className='user-trip-list'>
            <h1>Trips</h1>
            <div className='user-booking-list-container'>
                <UserBookings userId={id} />
            </div>
        </div>
    );
}

export default BookingLanding;
