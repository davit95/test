<?php


namespace App\Repositories;

use App\Models\User;


class UserRepository
{
    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createUser($data)
    {
        return $this->user->create($data);
    }

    /**
     * @param $user
     * @return mixed
     */
    public function createToken($user)
    {
        return $user->createToken('Personal Access Token')->accessToken;
    }
}
