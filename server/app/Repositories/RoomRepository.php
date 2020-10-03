<?php


namespace App\Repositories;

use App\Models\Room;

class RoomRepository
{

    /**
     * RoomRepository constructor.
     * @param Room $room
     */
    public function __construct(Room $room)
    {
        $this->room = $room;
    }

    /**
     * @return mixed
     */
    public function getRooms()
    {
        return $this->room->get();
    }
}
