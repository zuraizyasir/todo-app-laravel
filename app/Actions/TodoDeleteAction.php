<?php

namespace App\Actions;

use App\Models\Todo;

class TodoDeleteAction
{
    public function execute(Todo $todo): void
    {
        $todo->delete();
    }
}