<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Repositories\ReservationRepository;

class ReservationsController extends Controller
{

    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    /**
     * @param ReservationRepository $reservationRepository
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $reservations = $this->reservationRepository->getReservations();
        if (!$reservations) {
            return response()->json([
                'message' => 'Something went wrong. Please try later',
                'alert' => config('alert.messages.error')
            ], 500);
        }
        $result = $this->getReservationsData($reservations);
        return response()->json(['reservations' => $result], 200);
    }

    /**
     * @param $id
     * @param ReservationRepository $reservationRepository
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $reservation = $this->reservationRepository->getReservationById($id);
        if ($reservation) {
            return response()->json(['reservation' => $reservation], 200);
        }
        return response()->json([
            'message' => 'Reservation with id : ' . $id . ' not found!',
            'alert' => config('alert.messages.error')
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');
        $roomId = $request->get('room_id');
        if ($this->reservationRepository->isRoomAvailable($startDate, $endDate, $roomId)) {
            if ($reservation = $this->reservationRepository->createReservation($request->all())) {
                return response()->json([
                    'reservation' => $reservation,
                    'alert' => config('alert.messages.success'),
                    'message' => 'The reservation has been successfully created!'
                ], 200);
            }
            return response()->json([
                'message' => 'Something went wrong. Please try later',
                'alert' => config('alert.messages.error')
            ], 500);
        }
        return response()->json([
            'message' => 'The room is not available. Please select another date range',
            'alert' => config('alert.messages.warning')
        ], 500);
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $userId = $request->get('user_id');
        if (!empty($userId)) {
            unset($request['user_id']);
        }
        $reservation = $this->reservationRepository->getReservationById($id);
        if (!$reservation) {
            return response()->json([
                'message' => 'Reservation not found',
                'alert' => config('alert.messages.warning')
            ]);
        }
        $data = $this->unsetUnnecessaryData($request->all());
        if ($this->reservationRepository->isRoomAvailable(
            $request->get('start_date'),
            $request->get('end_date'),
            $reservation->room_id
        )) {
            if ($reservation = $this->reservationRepository->updateReservation($reservation, $data)) {
                return response()->json([
                    'reservation' => $reservation,
                    'alert' => config('alert.messages.success'),
                    'message' => 'You have successfully updated the reservation!'
                ], 200);
            }
            return response()->json([
                'message' => 'Something went wrong. Please try later',
                'alert' => config('alert.messages.error')
            ], 500);
        }
        return response()->json([
            'message' => 'The room is not available. Please select another date range',
            'alert' => config('alert.messages.warning')
        ], 403);
    }

    /**
     * @param $reservations
     * @return array
     */
    private function getReservationsData($reservations)
    {
        $result = [];
        if ($reservations->isNotEmpty()) {
            foreach ($reservations as $reservation) {
                $result[] = [
                    'key' => $reservation->id,
                    'room' => $reservation->room->name,
                    'user' => $reservation->user->name,
                    'user_id' => $reservation->user->id,
                    'start_date' => $reservation->start_date,
                    'end_date' => $reservation->end_date,
                    'notes' => $reservation->notes,
                    'created_at' => $reservation->created_at,
                    'updated_at' => $reservation->updated_at,
                ];
            }
        }

        return $result;
    }

    /**
     * @param $data
     * @return mixed
     */
    private function unsetUnnecessaryData($data)
    {
        unset($data['date']);
        return $data;
    }
}
