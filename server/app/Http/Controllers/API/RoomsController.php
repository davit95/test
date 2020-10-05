<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\RoomRepository;

class RoomsController extends Controller
{
    /**
     * @param RoomRepository $roomRepository
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(RoomRepository $roomRepository)
    {
        if ($rooms = $roomRepository->getRooms()) {
            return response()->json($rooms, 200);
        }
        return generateResponse(
            config('alert.messages.error'),
            'Can not load rooms. Please try later!',
            500
        );
    }
}
