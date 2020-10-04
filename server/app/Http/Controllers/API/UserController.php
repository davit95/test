<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    /**
     * UserController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:100',
        ]);
        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all(),
                'alert' => config('alert.messages.warning'),
                'message' => 'The user with given email already exists. Please provide another one'
            ], 422);
        }
        $request['password'] = bcrypt($request['password']);
        $user = $this->userRepository->createUser($request->all());
        if ($user) {
            $token = $this->userRepository->createToken($user);

            return response()->json([
                'token' => $token,
                'user' => $user,
                'message' => 'You have been successfully registered as ' . $user->name,
                'alert' => config('alert.messages.success'),
            ], 200);
        }
        return response()->json([
            'message' => 'Something went wrong. Please try later',
            'alert' => config('alert.messages.error')
        ], 500);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6|max:15',
        ]);
        $credentials = request(['email', 'password']);
        if (!\Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid Username or Password',
                'alert' => config('alert.messages.warning')
            ], 401);
        }
        $user = $request->user();
        $token = $this->userRepository->createToken($user);
        return response()->json([
            'token' => $token,
            'user' => $user,
            'token_type' => 'Bearer',
            'message' => 'You have been successfully logged in',
            'alert' => config('alert.messages.success')
        ], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        if ($request->user()->token()->revoke()) {
            return response()->json([
                'message' => 'Successfully logged out',
                'alert' => config('alert.messages.success')
            ], 200);
        }
        return response()->json([
            'message' => 'Something went wrong. Please try later',
            'alert' => config('alert.messages.error')
        ], 500);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        if ($user = $request->user()) {
            return response()->json($user);
        }
        return response()->json([
            'message' => 'Something went wrong. Please try later'
        ], 500);
    }
}
