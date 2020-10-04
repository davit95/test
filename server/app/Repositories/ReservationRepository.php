<?php


namespace App\Repositories;


use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationRepository
{
    /**
     * RoomRepository constructor.
     * @param Room $room
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * @return mixed
     */
    public function getReservations()
    {
        return $this->reservation->with('room')->with('user')->get();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getReservationById($id)
    {
        return $this->reservation->with('room')->find($id);
    }

    /**
     * @param $reservation
     * @param $data
     * @return mixed
     */
    public function updateReservation($reservation, $data)
    {
        $reservation->update($data);
        return $reservation;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createReservation($data)
    {
        $data['user_id'] = Auth::id();
        return $this->reservation->create($data);
    }

    /**
     * @param $startDate
     * @param $endDate
     * @param $roomId
     * @return bool
     */
    public function isRoomAvailable($startDate, $endDate, $roomId)
    {
        $available = true;

        $reservations = $this->reservation->where('room_id', $roomId)->get();
        $start = strtotime($startDate);
        $end = strtotime($endDate);
        if (!empty($reservations)) {
            foreach ($reservations as $reservation) {
                if (
                    ($start >= $end) ||
                    ($start < strtotime('now')) ||
                    ($start > strtotime($reservation->start_date) && $start < strtotime($reservation->end_date)) ||
                    ($end > strtotime($reservation->start_date) && $end < strtotime($reservation->end_date)) ||
                    ($start < strtotime($reservation->start_date) && $end > strtotime($reservation->end_date)) ||
                    ($start > strtotime($reservation->start_date) && $end < strtotime($reservation->end_date))
                ) {
                    $available = false;
                }
            }
        }
        return $available;
    }
}
