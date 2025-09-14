<?php

namespace App\Policies;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TodoPolicy
{
    public function view(User $user, Todo $todo): Response
    {
        return $user->id === $todo->user_id
            ? Response::allow()
            : Response::deny('You do not own this todo.', 403);
    }

    public function update(User $user, Todo $todo): Response
    {
        return $user->id === $todo->user_id
            ? Response::allow()
            : Response::deny('You do not own this todo.', 403);
    }

    public function delete(User $user, Todo $todo): Response
    {
        return $user->id === $todo->user_id
            ? Response::allow()
            : Response::deny('You do not own this todo.', 403);
    }
}